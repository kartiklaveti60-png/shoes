import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowRight } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  suggestedActions?: string[];
}

export const AIStylistDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Greetings. I am your personal SOLE AI Fashion Architect. Ask me anything about sneaker sizing, outfit color matching, or resell projections.",
      suggestedActions: ["Style me for Friday night", "Which sneaker holds highest resell?", "How does Air Jordan 1 fit?"]
    }
  ]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: queryText };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/v1/ai/stylist-chat', { message: queryText });
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: res.data.message || "I recommend pairing minimalist black cargo trousers with our nitrogen-infused runner for optimal modern proportions.",
        suggestedActions: res.data.suggestedActions
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "For a sleek street look, pair high-contrast sneakers with relaxed black techwear pants and an oversized hoodie."
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black text-white px-4 py-3 rounded-full font-bold text-xs shadow-xl flex items-center gap-2 hover:bg-[#FF5A1F] transition-all transform hover:scale-105"
      >
        <Sparkles className="w-4 h-4 text-[#FF5A1F] animate-spin-slow" />
        AI STYLIST
      </button>

      {/* Drawer Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-white border border-black/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px] text-black animate-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="bg-gray-50 p-4 border-b border-black/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-black" />
              <div>
                <h4 className="font-display font-bold text-sm text-black">SOLE AI ARCHITECT</h4>
                <p className="text-[10px] text-green-600 font-semibold">● ACTIVE ASSISTANT</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 text-xs ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                
                <div className={`max-w-[80%] rounded-2xl p-3 ${
                  msg.sender === 'user' 
                    ? 'bg-black text-white font-medium' 
                    : 'bg-gray-50 text-gray-900 border border-gray-200'
                }`}>
                  <p>{msg.text}</p>
                  
                  {/* Suggested Chips */}
                  {msg.suggestedActions && (
                    <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-gray-200">
                      {msg.suggestedActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(action)}
                          className="bg-white hover:bg-black text-[10px] text-gray-700 hover:text-white px-2 py-1 rounded-full border border-gray-300 transition-colors flex items-center gap-1"
                        >
                          {action} <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-[11px] text-gray-500 italic flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-[#FF5A1F]" />
                Architect is reflecting...
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-black/10 bg-gray-50 flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask AI Stylist..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-black placeholder-gray-500 focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              className="bg-black text-white p-2 rounded-xl hover:bg-[#FF5A1F] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
