import React, { useState } from 'react';
import { LEARNING_OBJECTIVES } from '../data/simulation';
import { soundManager } from './AudioController';
import {
  Compass,
  Target,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Box,
  MapPin,
  Clock,
  Euro,
  X
} from 'lucide-react';

interface MissionBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  traineeName: string;
  setTraineeName: (name: string) => void;
}

export const MissionBriefingModal: React.FC<MissionBriefingModalProps> = ({
  isOpen,
  onClose,
  traineeName,
  setTraineeName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="w-full max-w-3xl max-h-[92vh] bg-[#07131F] border border-[#27D3F2]/60 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#27D3F2]/20 border border-[#27D3F2] flex items-center justify-center text-[#27D3F2]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#27D3F2] bg-[#27D3F2]/10 px-2 py-0.5 rounded border border-[#27D3F2]/30">
                  Trainee Onboarding Dossier
                </span>
                <span className="text-xs font-mono text-[#9CB0C0]">
                  DeltaBridge Logistics Marseille
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-white mt-0.5">
                Mission Briefing & 5 Stated Learning Objectives
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Welcome & Persona Introduction */}
          <div className="p-4 rounded-xl bg-[#0B2235]/60 border border-[#1B3B59] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF6B35] font-bold">
                Your Operational Mission
              </span>
              <span className="text-xs font-mono text-[#27D3F2]">
                Container: KEDU 240917 4
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
              Welcome to the DeltaBridge Logistics team in Marseille. You are shadowing our sea-freight desk and have been assigned full operational stewardship over shipment <strong className="text-white">KEDU 240917 4</strong>: 12,000 pairs of high-performance running shoes (€288,000 cargo value) moving under <strong className="text-[#27D3F2]">Incoterms 2020 DAP</strong> from Bình Dương, Vietnam to RhôneSport's national distribution centre near Lyon.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-[#1B3B59]/60">
              <label className="text-xs font-mono text-slate-400 shrink-0">
                Trainee Forwarder Name:
              </label>
              <input
                type="text"
                value={traineeName}
                onChange={(e) => setTraineeName(e.target.value)}
                placeholder="Enter your name for the official certificate"
                className="w-full sm:w-72 px-3 py-1.5 rounded-lg bg-[#07131F] border border-[#1B3B59] text-white text-xs font-sans focus:outline-none focus:border-[#27D3F2]"
              />
            </div>
          </div>

          {/* Stated 5 Learning Objectives */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#27D3F2]" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                5 Stated Learning Objectives (Challenge 8 Specification):
              </h4>
            </div>

            <div className="grid gap-2.5">
              {LEARNING_OBJECTIVES.map((lo) => (
                <div key={lo.id} className="p-3.5 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[#27D3F2]/10 border border-[#27D3F2]/30 flex items-center justify-center font-mono text-xs font-bold text-[#27D3F2] shrink-0">
                    {lo.number}
                  </span>
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-white block">
                      {lo.title}
                    </span>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {lo.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gamification Rules & Dashboard Breakdown */}
          <div className="p-4 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-3 font-mono text-xs">
            <span className="text-[11px] uppercase tracking-wider text-[#45D6A3] font-bold block">
              How You Are Evaluated (Gamification Rules):
            </span>

            <div className="grid sm:grid-cols-3 gap-2 text-[11px]">
              <div className="p-2.5 rounded-lg bg-[#07131F] border border-[#1B3B59] space-y-1">
                <span className="text-[#27D3F2] font-semibold block">Trainee Score (0–100+)</span>
                <p className="text-slate-400 font-sans">Starts at 100. Best practice choices grant +25 pts; compliance mistakes or delays deduct points.</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#07131F] border border-[#1B3B59] space-y-1">
                <span className="text-[#FFB020] font-semibold block">6 Decision Points</span>
                <p className="text-slate-400 font-sans">Face real dilemmas: packing list mismatches, vessel stowage, storm routing, port demurrage, and rail shifts.</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#07131F] border border-[#1B3B59] space-y-1">
                <span className="text-[#45D6A3] font-semibold block">Final Assessment</span>
                <p className="text-slate-400 font-sans">Complete the 10-question evaluation at delivery to earn your DeltaBridge Forwarder Certificate.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="p-4 bg-[#0B2235] border-t border-[#1B3B59] flex items-center justify-end">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#27D3F2] hover:bg-[#1EAFC9] text-[#07131F] font-mono font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Acknowledge Mission & Enter Simulation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
