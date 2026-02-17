
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your Common Home Advisor. I can help explain the conversion process, demystify legal risks, and help you draft communications for your neighbors. What would you like to know today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, userMessage].map(m => ({
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: `You are an expert advisor for UK leaseholders looking to convert to commonhold, representing the platform "Common Home". 
          Your goals:
          1. Explain the process in simple, jargon-free English.
          2. Mitigate fears about financial and legal risks.
          3. Provide practical advice for coordinating with neighbors, especially off-site owners.
          4. Emphasize the long-term benefits of commonhold (no ground rent, control over service charges, property value increases).
          Be empathetic, professional, and reassuring. Keep responses concise and structured with bullet points where helpful.
          Use the brand voice of Common Home: modern, clear, and encouraging.`,
          temperature: 0.7,
        },
      });

      const aiText = response.text || "I'm sorry, I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to my legal database right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-280px)] flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-[#4c6fa1]/5 overflow-hidden transition-all duration-300">
      {/* Advisor Header */}
      <div className="p-7 bg-[#333333] text-white flex items-center justify-between border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-gradient opacity-10"></div>
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 p-2 flex items-center justify-center shadow-inner">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M50 12 L18 44 V85 H82 V44 L50 12Z" fill="white" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight">Common Home AI</h3>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-[#d94e6d] animate-pulse"></span>
               <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em]">Always Learning</p>
            </div>
          </div>
        </div>
        <div className="hidden sm:block text-[11px] font-black text-white/40 tracking-widest uppercase relative z-10 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
          Solicitor-Verified Knowledge
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/20">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`max-w-[80%] p-6 rounded-3xl text-sm leading-relaxed font-medium shadow-sm transition-all hover:shadow-md ${
              m.role === 'user' 
                ? 'bg-brand-gradient text-white rounded-tr-none shadow-xl shadow-[#4c6fa1]/20' 
                : 'bg-white text-[#333333] rounded-tl-none border border-slate-100'
            }`}>
              {m.content.split('\n').map((line, idx) => (
                <p key={idx} className={line.trim() === '' ? 'h-4' : 'mb-3 last:mb-0'}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm rounded-tl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-[#75b0d3] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#4c6fa1] rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-[#d94e6d] rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-8 bg-white border-t border-slate-50">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about commonhold legal risks, costs, or how to talk to neighbors..."
            className="flex-1 p-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:outline-none focus:border-[#75b0d3]/30 focus:bg-white text-base transition-all font-medium placeholder:text-slate-400 shadow-inner"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="px-10 py-5 bg-[#4c6fa1] text-white font-black rounded-[1.5rem] hover:bg-[#3e5c8a] transition-all disabled:opacity-50 active:scale-95 flex items-center gap-3 shadow-lg hover:shadow-xl"
          >
            <span>Ask</span>
          </button>
        </div>
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {[
            "Valuation costs?",
            "How to find absent owners?",
            "Commonhold vs Leasehold",
            "Letter for neighbors"
          ].map((suggestion, i) => (
            <button
              key={i}
              onClick={() => setInput(suggestion)}
              className="whitespace-nowrap px-5 py-2.5 bg-white text-slate-500 text-[11px] font-black rounded-full border border-slate-200 hover:border-[#d94e6d] hover:text-[#d94e6d] hover:bg-[#d94e6d]/5 transition-all duration-300 uppercase tracking-widest shadow-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
