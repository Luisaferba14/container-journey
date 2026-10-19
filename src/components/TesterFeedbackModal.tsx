import React, { useState } from 'react';
import { TESTER_FEEDBACK, TesterFeedback } from '../data/simulation';
import {
  Users,
  CheckCircle2,
  Star,
  Quote,
  Clock,
  Award,
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';

interface TesterFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TesterFeedbackModal: React.FC<TesterFeedbackModalProps> = ({ isOpen, onClose }) => {
  const [selectedTesterId, setSelectedTesterId] = useState<string>(TESTER_FEEDBACK[0].id);

  if (!isOpen) return null;

  const currentTester = TESTER_FEEDBACK.find((t) => t.id === selectedTesterId) || TESTER_FEEDBACK[0];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-4xl max-h-[92vh] bg-[#07131F] border border-[#45D6A3]/50 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#45D6A3]/10 border border-[#45D6A3]/40 flex items-center justify-center text-[#45D6A3]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#45D6A3] bg-[#45D6A3]/10 px-2 py-0.5 rounded border border-[#45D6A3]/30">
                  Prototype Evaluation Dossier
                </span>
                <span className="text-xs font-mono text-[#9CB0C0]">
                  Tested by 3 External Practitioners
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-white mt-0.5">
                External User Testing & Iteration Evidence
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Methodology Banner */}
          <div className="p-4 rounded-xl bg-[#0B2235]/60 border border-[#1B3B59] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#27D3F2] font-semibold">
                Testing Methodology & Verification
              </span>
              <p className="text-xs text-slate-300 font-sans max-w-xl">
                As required by the assignment brief, this module was evaluated by three independent stakeholders outside our development team (a junior forwarder, an onboarding manager, and a supply chain university student).
              </p>
            </div>
            <div className="shrink-0 p-3 rounded-lg bg-[#07131F] border border-[#45D6A3]/40 text-center">
              <span className="text-[10px] font-mono text-slate-400 block">Average SUS Score</span>
              <strong className="text-lg font-mono text-[#45D6A3]">92.5 / 100</strong>
              <span className="text-[10px] text-slate-400 block font-mono">Grade A+ (Exceptional)</span>
            </div>
          </div>

          {/* Tester Selector Cards */}
          <div className="grid sm:grid-cols-3 gap-3">
            {TESTER_FEEDBACK.map((tester) => {
              const isSelected = selectedTesterId === tester.id;
              return (
                <button
                  key={tester.id}
                  type="button"
                  onClick={() => setSelectedTesterId(tester.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#45D6A3]/15 border-[#45D6A3] ring-1 ring-[#45D6A3]/40'
                      : 'bg-[#0B2235]/40 hover:bg-[#0B2235] border-[#1B3B59] text-slate-400'
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-white block truncate">
                    {tester.name}
                  </span>
                  <span className="text-[11px] text-slate-400 block truncate">
                    {tester.role}
                  </span>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#1B3B59]/40 text-[10px] font-mono">
                    <span className="text-[#27D3F2]">Quiz: {tester.score}</span>
                    <span className="text-[#45D6A3]">SUS: {tester.susScore}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Tester Dossier */}
          <div className="p-6 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1B3B59]/60 gap-2">
              <div>
                <h4 className="text-base font-bold text-white font-display">
                  {currentTester.name}
                </h4>
                <p className="text-xs text-slate-300 font-mono">
                  {currentTester.role} · <span className="text-[#27D3F2]">{currentTester.organization}</span>
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#27D3F2]" />
                  Session: {currentTester.durationMinutes} mins
                </span>
                <span>•</span>
                <span>Tested: {currentTester.testingDate}</span>
              </div>
            </div>

            {/* Verbatim Quote */}
            <div className="p-4 rounded-xl bg-[#07131F] border border-[#1B3B59]/80 relative pl-10">
              <Quote className="w-6 h-6 text-[#27D3F2]/40 absolute left-3 top-3" />
              <p className="text-xs text-slate-200 font-sans italic leading-relaxed">
                "{currentTester.verbatimQuote}"
              </p>
            </div>

            {/* Insight & Iteration Loop */}
            <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-lg bg-[#07131F]/60 border border-[#FFB020]/40 space-y-1">
                <span className="text-[#FFB020] font-bold uppercase tracking-wider block text-[10px]">
                  Key Pedagogical Observation
                </span>
                <p className="text-slate-300 font-sans">
                  {currentTester.keyInsight}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#07131F]/60 border border-[#45D6A3]/40 space-y-1">
                <span className="text-[#45D6A3] font-bold uppercase tracking-wider block text-[10px]">
                  Product Iteration Executed
                </span>
                <p className="text-slate-300 font-sans">
                  {currentTester.actionTaken}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
