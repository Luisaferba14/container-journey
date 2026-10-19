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
  Users,
  Briefcase,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  RotateCcw,
  Sliders,
  Layers,
  FileText
} from 'lucide-react';

export type UserRole = 'trainee' | 'manager';

interface OnboardingGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  traineeName: string;
  setTraineeName: (name: string) => void;
}

export const OnboardingGameModal: React.FC<OnboardingGameModalProps> = ({
  isOpen,
  onClose,
  userRole,
  setUserRole,
  traineeName,
  setTraineeName
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  if (!isOpen) return null;

  const handleStartGame = () => {
    soundManager.playTwistLock();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="w-full max-w-3xl max-h-[92vh] bg-[#07131F] border border-[#27D3F2]/60 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Game-like Header Bar */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B35] flex items-center justify-center font-mono font-bold text-base text-[#07131F] shadow-lg">
              917
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#27D3F2] bg-[#27D3F2]/10 px-2 py-0.5 rounded border border-[#27D3F2]/30">
                  Interactive Simulator · Step {currentStep} of 3
                </span>
                <span className="text-xs font-mono text-[#9CB0C0]">
                  {currentStep === 1 ? 'Role & Profile' : currentStep === 2 ? 'Mission & Objectives' : 'GUI Navigation Guide'}
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-white mt-0.5">
                {currentStep === 1 && 'Welcome to BOX 917 — Choose Your Profile'}
                {currentStep === 2 && 'The Mission: One Container. 47 Days. One Global System.'}
                {currentStep === 3 && 'GUI Walkthrough — How to Navigate & Play'}
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

        {/* Step Stepper Indicator */}
        <div className="px-6 pt-3 pb-1 bg-[#07131F] border-b border-[#1B3B59]/40 flex items-center gap-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`flex-1 py-1 text-center border-b-2 transition-all cursor-pointer ${
              currentStep === 1
                ? 'border-[#27D3F2] text-[#27D3F2] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            1. Role & Profile
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className={`flex-1 py-1 text-center border-b-2 transition-all cursor-pointer ${
              currentStep === 2
                ? 'border-[#27D3F2] text-[#27D3F2] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            2. Mission & Objectives
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className={`flex-1 py-1 text-center border-b-2 transition-all cursor-pointer ${
              currentStep === 3
                ? 'border-[#27D3F2] text-[#27D3F2] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            3. GUI & Controls Guide
          </button>
        </div>

        {/* Scrollable Step Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* STEP 1: ROLE & USERNAME SELECTION */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#0B2235]/60 border border-[#1B3B59] space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF6B35] font-bold">
                  Game Identity Setup
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                  Before stepping into the Marseille freight forwarding agency, select whether you are exploring as a <strong className="text-[#27D3F2]">Trainee (Junior Freight Forwarder)</strong> or as an <strong className="text-[#45D6A3]">Onboarding Manager</strong>.
                </p>
              </div>

              {/* Role Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* Trainee Card */}
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setUserRole('trainee');
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                    userRole === 'trainee'
                      ? 'bg-[#27D3F2]/10 border-[#27D3F2] ring-2 ring-[#27D3F2]/40'
                      : 'bg-[#0B2235]/30 hover:bg-[#0B2235] border-[#1B3B59] text-slate-400'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#27D3F2]/20 border border-[#27D3F2]/40 flex items-center justify-center text-[#27D3F2]">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    {userRole === 'trainee' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#27D3F2] text-[#07131F]">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold font-display text-white mt-3">
                    🎓 Junior Forwarder (Trainee)
                  </h4>
                  <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">
                    You make operational decisions, clear customs, defend against demurrage, manage budget, and take the final assessment to earn your official Certificate.
                  </p>
                  <div className="mt-3 pt-2 border-t border-white/10 text-[10px] font-mono text-[#27D3F2]">
                    Includes: Score (100 pts) · Rank System · Badges · 6 Decision Dilemmas
                  </div>
                </button>

                {/* Manager Card */}
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setUserRole('manager');
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                    userRole === 'manager'
                      ? 'bg-[#45D6A3]/10 border-[#45D6A3] ring-2 ring-[#45D6A3]/40'
                      : 'bg-[#0B2235]/30 hover:bg-[#0B2235] border-[#1B3B59] text-slate-400'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#45D6A3]/20 border border-[#45D6A3]/40 flex items-center justify-center text-[#45D6A3]">
                      <Users className="w-5 h-5" />
                    </div>
                    {userRole === 'manager' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#45D6A3] text-[#07131F]">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold font-display text-white mt-3">
                    👔 Onboarding Manager
                  </h4>
                  <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">
                    Designed for coordinators. Access facilitator rubrics, 5-day curriculum schedules, manager debrief coaching questions, answer keys, and environmental impact.
                  </p>
                  <div className="mt-3 pt-2 border-t border-white/10 text-[10px] font-mono text-[#45D6A3]">
                    Includes: Facilitator Guide · Solution Keys · Debrief Prompts · Footprint
                  </div>
                </button>

              </div>

              {/* Name Input */}
              <div className="p-4 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 block">
                  Player / Trainee Name:
                </label>
                <input
                  type="text"
                  value={traineeName}
                  onChange={(e) => setTraineeName(e.target.value)}
                  placeholder="Enter your name (e.g. Luisa Bayona)"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#07131F] border border-[#1B3B59] text-white text-sm font-sans focus:outline-none focus:border-[#27D3F2]"
                />
                <span className="text-[11px] font-mono text-slate-400 block">
                  This name will be displayed on your Trainee Dashboard and printed on your official Certificate of Competency.
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: MISSION & OBJECTIVES */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0B2235]/60 border border-[#1B3B59] space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#27D3F2] font-bold">
                  The Shipment Scenario
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                  You are tracking container <strong className="text-[#FF6B35]">KEDU 240917 4</strong>: 12,000 pairs of running shoes (€288,000 cargo value) travelling 15,870 km from a factory in Bình Dương, Vietnam to RhôneSport's warehouse near Lyon under <strong className="text-[#27D3F2]">Incoterms 2020 DAP</strong>.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  The 5 Core Learning Objectives You Will Master:
                </span>

                <div className="grid gap-2">
                  {LEARNING_OBJECTIVES.map((lo) => (
                    <div key={lo.id} className="p-3 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-[#27D3F2]/10 border border-[#27D3F2]/30 flex items-center justify-center font-mono text-xs font-bold text-[#27D3F2] shrink-0">
                        {lo.number}
                      </span>
                      <div className="space-y-0.5">
                        <span className="text-xs font-semibold text-white block">
                          {lo.title}
                        </span>
                        <p className="text-xs text-slate-300 font-sans">
                          {lo.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: GUI NAVIGATION GUIDE */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0B2235]/60 border border-[#1B3B59] space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#45D6A3] font-bold">
                  GUI Layout & Controls (Where to Find Things)
                </span>
                <p className="text-xs text-slate-300 font-sans">
                  Here is a quick map of the interface so you know how to navigate effortlessly:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
                
                {/* 1. Top HUD */}
                <div className="p-3.5 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-1">
                  <div className="flex items-center gap-2 text-[#27D3F2] font-bold">
                    <Sliders className="w-4 h-4" />
                    <span>1. Top Header Bar</span>
                  </div>
                  <p className="text-slate-300 font-sans text-[11px]">
                    Displays your <strong className="text-white">Trainee Score (100 pts)</strong>, current Rank, active Role, and access to the <strong className="text-[#FF6B35]">10-Question Assessment</strong> and Manager Guide.
                  </p>
                </div>

                {/* 2. Left Reading Dossier */}
                <div className="p-3.5 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-1">
                  <div className="flex items-center gap-2 text-[#FF6B35] font-bold">
                    <FileText className="w-4 h-4" />
                    <span>2. Left Dossier & Decisions</span>
                  </div>
                  <p className="text-slate-300 font-sans text-[11px]">
                    Tells the story of each stage. When an operational problem happens, an amber <strong className="text-[#FFB020]">⚡ Decision Card</strong> appears requiring your choice before proceeding!
                  </p>
                </div>

                {/* 3. Right World Map */}
                <div className="p-3.5 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-1">
                  <div className="flex items-center gap-2 text-[#45D6A3] font-bold">
                    <MapPin className="w-4 h-4" />
                    <span>3. Right World Map</span>
                  </div>
                  <p className="text-slate-300 font-sans text-[11px]">
                    High-performance vector map automatically follows container <strong className="text-white">917</strong> with smooth camera flyTo animations. Toggle weather layers and zoom freely in Explore mode.
                  </p>
                </div>

                {/* 4. Timeline Scrubber */}
                <div className="p-3.5 rounded-xl bg-[#0B2235]/40 border border-[#1B3B59] space-y-1">
                  <div className="flex items-center gap-2 text-[#27D3F2] font-bold">
                    <Clock className="w-4 h-4" />
                    <span>4. Timeline Scrubber</span>
                  </div>
                  <p className="text-slate-300 font-sans text-[11px]">
                    Under the header, click any point on the dual timeline to inspect planned vs actual days (44d vs 47d) and review disruption milestones.
                  </p>
                </div>

              </div>

              {/* Keyboard Shortcuts Cheat-sheet */}
              <div className="p-3 rounded-xl bg-[#07131F] border border-[#1B3B59] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-300">
                <span className="text-[#27D3F2] font-semibold">Keyboard Controls:</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-[#0B2235] border border-[#1B3B59] text-white">Space</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-[#0B2235] border border-[#1B3B59] text-white">→</kbd> Next</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-[#0B2235] border border-[#1B3B59] text-white">←</kbd> Prev</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-[#0B2235] border border-[#1B3B59] text-white">P</kbd> Passport</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-[#0B2235] border border-[#1B3B59] text-white">D</kbd> Documents</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-[#0B2235] border border-[#1B3B59] text-white">Esc</kbd> Close</span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Navigation Footer */}
        <div className="p-4 bg-[#0B2235] border-t border-[#1B3B59] flex items-center justify-between shrink-0">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setCurrentStep((prev) => (prev - 1) as 1 | 2);
                }}
                className="px-4 py-2 rounded-xl bg-[#07131F] hover:bg-[#1B3B59] text-xs font-mono text-slate-300 border border-[#1B3B59] flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setCurrentStep((prev) => (prev + 1) as 2 | 3);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#27D3F2] hover:bg-[#1EAFC9] text-[#07131F] font-mono font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStartGame}
                className="px-6 py-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#E85A24] text-[#07131F] font-mono font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xl animate-pulse"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Simulation as {userRole === 'trainee' ? 'Trainee' : 'Manager'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
