import React, { useState } from 'react';
import { MENTOR_FAQS, MentorFAQ } from '../data/simulation';
import { soundManager } from './AudioController';
import {
  MessageSquare,
  Bot,
  Sparkles,
  Send,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  Search,
  X
} from 'lucide-react';

interface ForwarderMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  sender: 'user' | 'mentor';
  text: string;
  source?: string;
  time: string;
}

export const ForwarderMentorModal: React.FC<ForwarderMentorModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'mentor',
      text: "Bonjour! I'm Jean-Pierre, Senior Operations Lead at DeltaBridge Marseille. I've handled containers through Fos, Cai Mep, and Suez for 24 years. Confused about Incoterms DAP, SOLAS VGM, demurrage, or stowage codes? Ask me anything from our verified operational procedures!",
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleAsk = (query: string) => {
    if (!query.trim()) return;

    soundManager.playClick();
    const userMsg: ChatMessage = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Find best match in verified knowledge base
    const lowerQuery = query.toLowerCase();
    const matchedFaq = MENTOR_FAQS.find((faq) => {
      const qTerms = faq.question.toLowerCase().split(' ');
      return qTerms.some((term) => term.length > 3 && lowerQuery.includes(term));
    });

    setTimeout(() => {
      setIsTyping(false);
      soundManager.playClick();

      let replyText = '';
      let replySource = 'DeltaBridge Standard Operating Procedures & Public Maritime Sources';

      if (matchedFaq) {
        replyText = matchedFaq.answer;
        replySource = matchedFaq.source;
      } else if (lowerQuery.includes('vgm') || lowerQuery.includes('weight') || lowerQuery.includes('mass')) {
        replyText = 'Under SOLAS Chapter VI Reg 2, the shipper must provide the Verified Gross Mass (VGM) using either Method 1 (certified weighbridge) or Method 2 (calculated package weights + container tare). Without a signed VGM, the container cannot be loaded onto the vessel.';
        replySource = 'IMO MSC.1/Circ.1475';
      } else if (lowerQuery.includes('dap') || lowerQuery.includes('incoterm') || lowerQuery.includes('duty') || lowerQuery.includes('customs')) {
        replyText = 'Under Incoterms 2020 DAP (Delivered at Place), VietStride pays freight to the destination warehouse in Saint-Quentin-Fallavier, but the buyer (RhôneSport) must handle import customs clearance and pay import duties and VAT in France.';
        replySource = 'ICC Incoterms 2020 DAP Rules';
      } else if (lowerQuery.includes('demurrage') || lowerQuery.includes('detention') || lowerQuery.includes('cost')) {
        replyText = 'At Eurofos (Marseille), terminal demurrage is charged for loaded containers stored inside the port beyond free time (typically €115/day). Container detention is charged if the empty container is held outside the port beyond agreed return days.';
        replySource = 'Port of Marseille Fos Terminal Operator Tariffs';
      } else if (lowerQuery.includes('rail') || lowerQuery.includes('truck') || lowerQuery.includes('co2') || lowerQuery.includes('emission')) {
        replyText = 'Rail shuttle from Fos to Lyon-Vénissieux emits about 105 kg CO2e total with last-mile electric drayage, compared to 480 kg CO2e for direct road trucking—a 78% decarbonization advantage.';
        replySource = 'European Environment Agency (EEA) & ADEME';
      } else {
        replyText = "In our DeltaBridge operations, remember the golden rule: 'What must become true before it can move again?' Check your documents, verify the gross mass with certified scales, ensure pre-clearance on Delta-IE, and prioritize electrified rail for the Rhône corridor.";
        replySource = 'DeltaBridge Onboarding Code of Practice';
      }

      const mentorMsg: ChatMessage = {
        sender: 'mentor',
        text: replyText,
        source: replySource,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, mentorMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-3xl h-[85vh] bg-[#07131F] border border-[#27D3F2]/50 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#27D3F2]/20 border border-[#27D3F2] flex items-center justify-center text-[#27D3F2]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#27D3F2] bg-[#27D3F2]/10 px-2 py-0.5 rounded border border-[#27D3F2]/30">
                  AI Freight Mentor · Verified Content Only
                </span>
                <span className="text-xs font-mono text-[#45D6A3] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#45D6A3] animate-pulse" />
                  Jean-Pierre (Online)
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-white mt-0.5">
                Senior Forwarder AI Tutor
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1B3B59]/40 hover:bg-[#1B3B59] text-[#9CB0C0] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick FAQ Pills */}
        <div className="px-6 py-2.5 bg-[#07131F] border-b border-[#1B3B59]/50 flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
          <span className="text-[#9CB0C0] shrink-0">Ask Jean-Pierre:</span>
          {MENTOR_FAQS.slice(0, 4).map((faq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleAsk(faq.question)}
              className="px-2.5 py-1 rounded-full bg-[#0B2235] hover:bg-[#1B3B59] border border-[#1B3B59] text-slate-300 hover:text-white shrink-0 truncate max-w-xs transition-colors cursor-pointer"
            >
              {faq.question.split('?')[0]}?
            </button>
          ))}
        </div>

        {/* Chat Conversation History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-xs sm:text-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-xl p-4 rounded-2xl space-y-1.5 shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-[#27D3F2] text-[#07131F] rounded-br-none font-medium'
                    : 'bg-[#0B2235] text-slate-100 border border-[#1B3B59] rounded-bl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-3 text-[10px] font-mono opacity-70">
                  <span>{msg.sender === 'user' ? 'You (Junior Forwarder)' : 'Jean-Pierre (Senior Ops Lead)'}</span>
                  <span>{msg.time}</span>
                </div>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                {msg.source && (
                  <div className="pt-2 border-t border-white/10 text-[10px] font-mono flex items-center gap-1.5 text-[#27D3F2]">
                    <BookOpen className="w-3 h-3 shrink-0" />
                    <span>Verified Source: <strong className="text-white">{msg.source}</strong></span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-mono text-[#9CB0C0] pl-2">
              <span className="w-2 h-2 rounded-full bg-[#27D3F2] animate-bounce" />
              <span>Jean-Pierre is consulting the maritime regulations...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(inputText);
          }}
          className="p-4 bg-[#0B2235] border-t border-[#1B3B59] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about Incoterms DAP, SOLAS VGM, Eurofos demurrage, customs clearance..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#07131F] border border-[#1B3B59] text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#27D3F2] font-sans"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-4 py-2.5 rounded-xl bg-[#27D3F2] hover:bg-[#1EAFC9] text-[#07131F] font-mono font-bold text-xs flex items-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
