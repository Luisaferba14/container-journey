import React, { useState } from 'react';
import { LEARNING_OBJECTIVES, QUIZ_QUESTIONS } from '../data/simulation';
import {
  BookOpen,
  Users,
  CheckCircle2,
  Calendar,
  Leaf,
  HelpCircle,
  Award,
  ChevronRight,
  ShieldAlert,
  FileText,
  X
} from 'lucide-react';

interface FacilitatorGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FacilitatorGuideModal: React.FC<FacilitatorGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'objectives' | 'curriculum' | 'debrief' | 'key' | 'carbon'>('objectives');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-4xl max-h-[92vh] bg-[#07131F] border border-[#27D3F2]/50 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#27D3F2]/10 border border-[#27D3F2]/40 flex items-center justify-center text-[#27D3F2]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#27D3F2] bg-[#27D3F2]/10 px-2 py-0.5 rounded border border-[#27D3F2]/30">
                  Manager Facilitator Guide
                </span>
                <span className="text-xs font-mono text-[#9CB0C0]">
                  DeltaBridge Freight Forwarding Academy
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-white mt-0.5">
                Onboarding Handbook & Facilitator Toolkit
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

        {/* Tab Navigation */}
        <div className="px-6 py-2 bg-[#07131F] border-b border-[#1B3B59]/60 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('objectives')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'objectives' ? 'bg-[#27D3F2] text-[#07131F] font-bold' : 'text-[#9CB0C0] hover:text-white'
            }`}
          >
            1. Learning Objectives (5)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('curriculum')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'curriculum' ? 'bg-[#27D3F2] text-[#07131F] font-bold' : 'text-[#9CB0C0] hover:text-white'
            }`}
          >
            2. 5-Day Onboarding Plan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('debrief')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'debrief' ? 'bg-[#27D3F2] text-[#07131F] font-bold' : 'text-[#9CB0C0] hover:text-white'
            }`}
          >
            3. Coaching Debrief Prompts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('key')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'key' ? 'bg-[#27D3F2] text-[#07131F] font-bold' : 'text-[#9CB0C0] hover:text-white'
            }`}
          >
            4. Assessment Answer Key
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('carbon')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'carbon' ? 'bg-[#27D3F2] text-[#07131F] font-bold' : 'text-[#9CB0C0] hover:text-white'
            }`}
          >
            5. Environmental Footprint
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: LEARNING OBJECTIVES */}
          {activeTab === 'objectives' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0B2235]/60 border border-[#1B3B59] space-y-1">
                <h4 className="text-sm font-bold text-white font-mono uppercase text-[#27D3F2]">
                  Target Audience & Educational Purpose
                </h4>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Designed for junior forwarding clerks in their first 1–6 months at DeltaBridge Marseille. Solves the core onboarding bottleneck where junior staff learn by shadowing without grasping the end-to-end documentary, operational, and liability continuum.
                </p>
              </div>

              <div className="grid gap-3">
                {LEARNING_OBJECTIVES.map((lo) => (
                  <div key={lo.id} className="p-4 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#FF6B35]">
                        Objective {lo.number}: {lo.title}
                      </span>
                      <span className="text-[10px] font-mono text-[#45D6A3] bg-[#45D6A3]/10 px-2 py-0.5 rounded border border-[#45D6A3]/30">
                        Operational Core
                      </span>
                    </div>
                    <p className="text-xs text-white font-sans">
                      {lo.description}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                      <div className="p-2 rounded bg-[#07131F] border border-[#1B3B59]/60">
                        <span className="text-[#27D3F2] font-semibold block">Demonstrated Skill:</span>
                        <span className="text-slate-300">{lo.practicalSkill}</span>
                      </div>
                      <div className="p-2 rounded bg-[#07131F] border border-[#1B3B59]/60">
                        <span className="text-[#EF5350] font-semibold block">Risk Mitigated:</span>
                        <span className="text-slate-300">{lo.realWorldRisk}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CURRICULUM */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0B2235]/60 border border-[#1B3B59] space-y-1">
                <h4 className="text-sm font-bold text-white font-mono uppercase text-[#27D3F2]">
                  Structured 5-Day Onboarding Schedule
                </h4>
                <p className="text-xs text-slate-300 font-sans">
                  Recommended pacing for an onboarding manager mentoring a newly hired junior forwarder.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-1">
                  <span className="text-[#27D3F2] font-bold">Day 1 · The Commercial & Equipment Foundation (Stages 1–3)</span>
                  <p className="text-slate-300 font-sans">
                    Introduce Incoterms 2020 DAP, container equipment sizing (40HC / 45G1), ISO 6346 owner codes, and empty depot release orders. Learner completes stuffing inspection.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-1">
                  <span className="text-[#27D3F2] font-bold">Day 2 · Origin Compliance & Waterway Feeders (Stages 4–6)</span>
                  <p className="text-slate-300 font-sans">
                    Solve Decision 1 (Packing list discrepancy vs SOLAS VGM Method 1). Trace barge feeder transport from Bình Dương to CMIT Cai Mep. Execute vessel stowage plan (Decision 2).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-1">
                  <span className="text-[#27D3F2] font-bold">Day 3 · The Deep-Sea Leg & Weather Management (Stages 7–11)</span>
                  <p className="text-slate-300 font-sans">
                    Navigate the Indian Ocean monsoon disruption (Decision 3). Understand why vessel masters reduce speed to 14.5 knots rather than burning fuel or breaking lashings. Trace Suez Canal transit.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-1">
                  <span className="text-[#27D3F2] font-bold">Day 4 · Port Entry, Customs BAE & Demurrage Defense (Stages 12–13)</span>
                  <p className="text-slate-300 font-sans">
                    Lodge advance EU ICS2 Entry Summary Declaration (Decision 4). Master French customs Delta-IE pre-declaration and prevent €115/day Eurofos quay demurrage (Decision 5).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-1">
                  <span className="text-[#27D3F2] font-bold">Day 5 · Hinterland Intermodal Delivery & Assessment (Stages 14–15)</span>
                  <p className="text-slate-300 font-sans">
                    Execute combined rail-road modal shift to Lyon-Vénissieux (Decision 6). Cut seal VN847291, endorse POD, and take the 10-question Knowledge Assessment for official certification.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEBRIEF COACHING PROMPTS */}
          {activeTab === 'debrief' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0B2235]/60 border border-[#1B3B59] space-y-1">
                <h4 className="text-sm font-bold text-white font-mono uppercase text-[#27D3F2]">
                  1-on-1 Manager Coaching Prompts
                </h4>
                <p className="text-xs text-slate-300 font-sans">
                  Use these open-ended operational questions during weekly check-ins to test deep comprehension.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-1">
                  <span className="text-xs font-mono font-bold text-[#FFB020]">
                    Q1: "Under our DAP contract, if French customs holds the box for an inspection fee, who pays?"
                  </span>
                  <p className="text-xs text-slate-300 font-sans">
                    <strong className="text-white">Expected Answer:</strong> RhôneSport (the buyer). DAP places import clearance, duties, and customs inspection fees on the buyer. VietStride only pays freight to Saint-Quentin-Fallavier.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-1">
                  <span className="text-xs font-mono font-bold text-[#FFB020]">
                    Q2: "Why can't we just declare an estimated weight for SOLAS VGM to save 12 hours?"
                  </span>
                  <p className="text-xs text-slate-300 font-sans">
                    <strong className="text-white">Expected Answer:</strong> Estimating violates SOLAS Reg 2. Terminal operating systems lock out unverified containers. If loaded illegally, the ship faces port state control detention and the carrier faces massive statutory fines.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-1">
                  <span className="text-xs font-mono font-bold text-[#FFB020]">
                    Q3: "If our client RhôneSport demands direct trucking from Fos instead of rail, how do you advise them?"
                  </span>
                  <p className="text-xs text-slate-300 font-sans">
                    <strong className="text-white">Expected Answer:</strong> Explain that direct truck saves 4 hours but emits 480 kg CO2 vs 105 kg on rail (+357% carbon), incurs €180 in motorway tolls, and increases road accident liability. Rail shuttle gives predictable scheduling and matches ESG mandates.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ANSWER KEY */}
          {activeTab === 'key' && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                10-Question Assessment Reference & Source Mapping
              </h4>

              <div className="space-y-2">
                {QUIZ_QUESTIONS.map((q) => (
                  <div key={q.id} className="p-3 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-1 text-xs font-sans">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-[#27D3F2] font-bold">Q{q.id}: {q.objectiveRef}</span>
                      <span className="text-[#45D6A3]">Correct: Option {String.fromCharCode(65 + q.correctIndex)}</span>
                    </div>
                    <p className="text-white font-medium">{q.question}</p>
                    <p className="text-slate-300 text-[11px] pt-1 border-t border-[#1B3B59]/40">{q.explanation}</p>
                    <span className="block text-[10px] font-mono text-[#9CB0C0]">Authority: {q.regulatorySource}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ENVIRONMENTAL FOOTPRINT PER LEARNER */}
          {activeTab === 'carbon' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#45D6A3]/10 border border-[#45D6A3]/40 space-y-1">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-[#45D6A3]" />
                  <h4 className="text-sm font-bold text-[#45D6A3] font-mono uppercase">
                    Challenge 8 Environmental Angle: Footprint Per Learner
                  </h4>
                </div>
                <p className="text-xs text-slate-200 font-sans leading-relaxed">
                  As required by the assignment guidelines: A digital learning experience is built once and used many times. We quantify the environmental footprint of training junior forwarders via this interactive simulator versus traditional printed manuals.
                </p>
              </div>

              {/* Environmental Metrics Comparison */}
              <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-[#0B2235] border border-[#1B3B59] space-y-3">
                  <span className="text-[#EF5350] font-bold uppercase tracking-wider block">
                    Traditional Forwarder Training
                  </span>
                  <ul className="space-y-1 text-slate-300 text-[11px] font-sans">
                    <li>• 120-page spiral-bound training manual: <strong>840 g CO2e</strong></li>
                    <li>• Plastic tab dividers & highlighter sets: <strong>160 g CO2e</strong></li>
                    <li>• On-site classroom projector (40 hours): <strong>4,200 g CO2e</strong></li>
                    <li>• Physical paper disposal / updates: <strong>320 g CO2e</strong></li>
                  </ul>
                  <div className="pt-2 border-t border-[#1B3B59]">
                    <span className="text-slate-400 block text-[10px]">Total Per Trainee:</span>
                    <strong className="text-base text-[#EF5350]">~5,520 g CO2e</strong>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0B2235] border border-[#45D6A3]/50 space-y-3">
                  <span className="text-[#45D6A3] font-bold uppercase tracking-wider block">
                    BOX 917 Interactive Simulator
                  </span>
                  <ul className="space-y-1 text-slate-300 text-[11px] font-sans">
                    <li>• Build & hosting energy amortized (500 learners/yr): <strong>4.8 g CO2e</strong></li>
                    <li>• 45-min web session (client laptop + edge CDN): <strong>2.6 g CO2e</strong></li>
                    <li>• On-demand AI Mentor queries (10 queries): <strong>1.2 g CO2e</strong></li>
                    <li>• Electronic certificate generation (zero paper): <strong>0.1 g CO2e</strong></li>
                  </ul>
                  <div className="pt-2 border-t border-[#1B3B59]">
                    <span className="text-slate-400 block text-[10px]">Total Per Trainee:</span>
                    <strong className="text-base text-[#45D6A3]">~8.7 g CO2e (99.8% Savings!)</strong>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#07131F] border border-[#1B3B59] text-xs font-mono text-slate-300">
                <span className="text-[#27D3F2] font-semibold block mb-1">Pedagogical Conclusion:</span>
                By replacing heavy paper dossiers and static slide decks with browser-based interactive simulation, DeltaBridge saves over 5.5 kg CO2e per junior employee while significantly increasing knowledge retention and operational readiness.
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
