-- ============================================================
-- Common Home — Initial Schema
-- Run this in the Supabase SQL editor to set up the database.
-- ============================================================

-- ── Enum Types ───────────────────────────────────────────────
CREATE TYPE project_status     AS ENUM ('PLANNING', 'GATHERING', 'LEGAL', 'COMPLETED');
CREATE TYPE leaseholder_status AS ENUM ('signed', 'pending', 'opposed');
CREATE TYPE contact_status     AS ENUM ('available', 'missing');
CREATE TYPE building_role      AS ENUM ('admin', 'member');
CREATE TYPE risk_level         AS ENUM ('Low', 'Medium', 'High');
CREATE TYPE activity_type      AS ENUM ('success', 'info');

-- ── users ────────────────────────────────────────────────────
CREATE TABLE users (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT        NOT NULL UNIQUE,
  display_name  TEXT        NOT NULL,
  password_hash TEXT        NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── buildings ────────────────────────────────────────────────
CREATE TABLE buildings (
  id                 UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  name               TEXT           NOT NULL,
  total_units        INTEGER        NOT NULL CHECK (total_units > 0),
  freeholder_name    TEXT,
  managing_agent     TEXT,
  annual_fees_pence  INTEGER        CHECK (annual_fees_pence >= 0),
  project_status     project_status NOT NULL DEFAULT 'PLANNING',
  created_at         TIMESTAMPTZ    NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ    NOT NULL DEFAULT now()
);

-- ── leaseholders ─────────────────────────────────────────────
CREATE TABLE leaseholders (
  id             UUID               PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id    UUID               NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  user_id        UUID               REFERENCES users(id) ON DELETE SET NULL,
  unit_label     TEXT               NOT NULL,
  display_name   TEXT               NOT NULL,
  is_resident    BOOLEAN            NOT NULL DEFAULT false,
  status         leaseholder_status NOT NULL DEFAULT 'pending',
  contact_status contact_status     NOT NULL DEFAULT 'missing',
  role           building_role,
  created_at     TIMESTAMPTZ        NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ        NOT NULL DEFAULT now(),
  CONSTRAINT uq_building_unit UNIQUE (building_id, unit_label)
);

CREATE INDEX idx_leaseholders_building_id ON leaseholders(building_id);
CREATE INDEX idx_leaseholders_user_id     ON leaseholders(user_id);

-- ── roadmap_steps ────────────────────────────────────────────
CREATE TABLE roadmap_steps (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id    UUID        NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  display_order  SMALLINT    NOT NULL CHECK (display_order BETWEEN 1 AND 99),
  title          TEXT        NOT NULL,
  description    TEXT        NOT NULL,
  estimated_time TEXT        NOT NULL,
  is_completed   BOOLEAN     NOT NULL DEFAULT false,
  risk_level     risk_level  NOT NULL,
  completed_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_building_step_order UNIQUE (building_id, display_order)
);

CREATE INDEX idx_roadmap_steps_building_id ON roadmap_steps(building_id, display_order);

-- ── activity_log ─────────────────────────────────────────────
-- No updated_at — log entries are immutable.
CREATE TABLE activity_log (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id     UUID          NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  actor_user_id   UUID          REFERENCES users(id) ON DELETE SET NULL,
  activity_type   activity_type NOT NULL,
  description     TEXT          NOT NULL,
  related_entity  TEXT,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_activity_log_building_created ON activity_log(building_id, created_at DESC);
CREATE INDEX idx_activity_log_actor            ON activity_log(actor_user_id);

-- ============================================================
-- Seed Data — Victoria Garden Courts
-- ============================================================

-- Building
INSERT INTO buildings (id, name, total_units, freeholder_name, managing_agent, annual_fees_pence, project_status)
VALUES (
  'b1000000-0000-0000-0000-000000000001',
  'Victoria Garden Courts',
  12,
  'Earls Court Freeholds Ltd',
  'Prestige Property Mgmt',
  4200000,
  'GATHERING'
);

-- Leaseholders
INSERT INTO leaseholders (building_id, unit_label, display_name, status, is_resident, contact_status, role) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'Flat 1',  'Alex Thompson',  'signed',  true,  'available', 'admin'),
  ('b1000000-0000-0000-0000-000000000001', 'Flat 2',  'Sarah Jenkins',  'signed',  true,  'available', 'member'),
  ('b1000000-0000-0000-0000-000000000001', 'Flat 3',  'Michael Chen',   'pending', false, 'available', null),
  ('b1000000-0000-0000-0000-000000000001', 'Flat 4',  'Unknown Owner',  'pending', true,  'missing',   null),
  ('b1000000-0000-0000-0000-000000000001', 'Flat 5',  'Alice Wong',     'pending', true,  'available', null),
  ('b1000000-0000-0000-0000-000000000001', 'Flat 6',  'Bob Smith',      'opposed', false, 'missing',   null);

-- Roadmap Steps
INSERT INTO roadmap_steps (building_id, display_order, title, description, estimated_time, is_completed, risk_level) VALUES
  ('b1000000-0000-0000-0000-000000000001', 1, 'Establish the Facts',
   'Identify your freeholder, managing agent, and confirm service charge costs. Get copies of your lease.',
   '1 week', true, 'Low'),
  ('b1000000-0000-0000-0000-000000000001', 2, 'Build the Team',
   'Find contact details for all leaseholders. Identify non-resident investors and off-site owners.',
   '2-3 weeks', false, 'Medium'),
  ('b1000000-0000-0000-0000-000000000001', 3, 'Make the Case',
   'Communicate the benefits of Right to Manage and Commonhold to hesitant leaseholders.',
   '1 month', false, 'Low'),
  ('b1000000-0000-0000-0000-000000000001', 4, 'Get Commitment',
   'Secure signatures from at least 50% of qualifying leaseholders to proceed.',
   '2-3 months', false, 'High'),
  ('b1000000-0000-0000-0000-000000000001', 5, 'Legal Process',
   'Serve the formal notices, form your RTM or Commonhold company, and complete the transfer.',
   '3-6 months', false, 'Medium');

-- Seed activity log
INSERT INTO activity_log (building_id, activity_type, description, related_entity) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'success', 'Flat 4 signed the petition', 'Flat 4'),
  ('b1000000-0000-0000-0000-000000000001', 'info',    'You added Flat 5 contact',   'Flat 5');
