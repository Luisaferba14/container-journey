import React, { useState } from 'react';
import { JourneyStage } from '../types/journey';
import { OPERATIONAL_DECISIONS, OperationalDecision, DecisionOption } from '../data/simulation';
import { EvidenceBadge } from './EvidenceBadge';
import { soundManager } from './AudioController';
import {
  MapPin,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  FileText,
  Users,
  Box,
  Layers,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  Euro,
  Award
} from 'lucide-react';

interface SceneDossierProps {
  stage: JourneyStage;
  onNextStage: () => void;
  onPrevStage: () => void;
  canNext: boolean;
  canPrev: boolean;
  onOpenDocuments: () => void;
  onOpenActors: () => void;
  onOpenCosts: () => void;
  onOpenEmissions: () => void;
  onOpenPortSim?: () => void;
  onOpenDisruption?: (id: 'event-1' | 'event-2' | 'event-3') => void;
  onOpenPassport?: () => void;
  onOpenDecision?: (decision: OperationalDecision) => void;
  onOpenAssessment?: () => void;
  userDecisions: Record<string, DecisionOption>;
  userRole?: 'trainee' | 'manager';
  traineeName?: string;
}

export const SceneDossier: React.FC<SceneDossierProps> = ({
  stage,
  onNextStage,
  onPrevStage,
  canNext,
  canPrev,
  onOpenDocuments,
  onOpenActors,
  onOpenCosts,
  onOpenEmissions,
  onOpenPortSim,
  onOpenDisruption,
  onOpenPassport,
  onOpenDecision,
  onOpenAssessment,
  userDecisions,
  userRole = 'trainee',
  traineeName
}) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [sealCut, setSealCut] = useState(false);

  // Check if current stage has an operational decision point
  const stageDecision = OPERATIONAL_DECISIONS.find((d) => d.stageId === stage.id);
  const existingDecisionChoice = stageDecision ? userDecisions[stageDecision.id] : undefined;

  return (
    <div className="w-full h-full flex flex-col bg-[#07131F] text-[#F4F8FB] select-none overflow-hidden">
      
      {/* Scrollable Story Panel */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        
        {/* Stage Meta & Title */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#9CB0C0]">
            <span className="text-[#27D3F2] font-semibold tracking-wider uppercase text-[11px]">
              Stage {stage.stageNumber} of 15 · Day {stage.dayStart === stage.dayEnd ? stage.dayStart : `${stage.dayStart}–${stage.dayEnd}`}
            </span>
            <span className="text-[#9CB0C0]/80">
              {stage.actualDate}
            </span>
          </div>

          <h1 className="text-2xl font-bold font-display text-white leading-tight">
            {stage.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#9CB0C0] pt-0.5">
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
              {stage.location}
            </span>
            <span>•</span>
            <span className="text-[#45D6A3]">{stage.currentCustodian}</span>
            <span>•</span>
            <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
              existingDecisionChoice
                ? existingDecisionChoice.isBestPractice ? 'bg-[#45D6A3]/20 text-[#45D6A3]' : 'bg-[#EF5350]/20 text-[#EF5350]'
                : 'bg-[#1B3B59]/50 text-slate-300'
            }`}>
              {existingDecisionChoice ? existingDecisionChoice.containerStatusResult : stage.status}
            </span>
          </div>
        </div>

        {/* The Protagonist Voice (The Box Speaks with dynamic reaction based on choices) */}
        <div className="relative pl-4 border-l-2 border-[#FF6B35] py-1 bg-[#0B2235]/30 rounded-r-xl pr-3">
          <p className="text-sm font-sans italic text-slate-100 leading-relaxed">
            "{existingDecisionChoice?.firstPersonReaction || stage.firstPersonVoice}"
          </p>
          <span className="block text-[11px] font-mono text-[#FF6B35]/90 mt-1.5 flex items-center gap-1.5">
            <span>— KEDU 240917 4</span>
            {existingDecisionChoice && (
              <span className="text-[10px] text-slate-400 font-sans">
                (Reflecting directive outcome)
              </span>
            )}
          </span>
        </div>

        {/* Container Passport & Stamps Shortcut */}
        <button
          type="button"
          onClick={onOpenPassport}
          className="w-full py-2 px-3.5 rounded-xl bg-[#0B2235]/70 hover:bg-[#1B3B59] border border-[#FF6B35]/30 hover:border-[#FF6B35] text-slate-200 font-mono text-xs flex items-center justify-between transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center gap-2">
            <span className="text-base group-hover:scale-110 transition-transform">📘</span>
            <span className="font-semibold text-white">Container Passport & Visas</span>
          </div>
          <span className="text-[11px] text-[#27D3F2] flex items-center gap-1 font-bold">
            9 Customs Stamps <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </button>


        {/* GAMIFIED OPERATIONAL DECISION & CIRCUMSTANCE CARD */}
        {stageDecision && (
          <div className={`p-4 rounded-xl border transition-all ${
            existingDecisionChoice
              ? existingDecisionChoice.isBestPractice
                ? 'bg-[#45D6A3]/10 border-[#45D6A3]/60 ring-1 ring-[#45D6A3]/30'
                : 'bg-[#EF5350]/10 border-[#EF5350]/60 ring-1 ring-[#EF5350]/30'
              : 'bg-gradient-to-r from-[#FFB020]/15 to-[#27D3F2]/10 border-[#FFB020]/70 ring-1 ring-[#FFB020]/40 animate-pulse'
          }`}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-4 h-4 shrink-0 ${existingDecisionChoice ? (existingDecisionChoice.isBestPractice ? 'text-[#45D6A3]' : 'text-[#EF5350]') : 'text-[#FFB020]'}`} />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Decision {stageDecision.decisionNumber}/6: {stageDecision.scenarioTitle}
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                existingDecisionChoice
                  ? existingDecisionChoice.isBestPractice ? 'bg-[#45D6A3]/20 text-[#45D6A3]' : 'bg-[#EF5350]/20 text-[#EF5350]'
                  : 'bg-[#FFB020]/20 text-[#FFB020]'
              }`}>
                {existingDecisionChoice ? (existingDecisionChoice.isBestPractice ? 'Directive Resolved' : 'Penalty Incurred') : 'Action Required'}
              </span>
            </div>

            {existingDecisionChoice ? (
              <div className="mt-3 space-y-2.5">
                <div className="p-3 rounded-lg bg-[#07131F]/80 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#27D3F2] font-semibold">Active Circumstance:</span>
                    <strong className={existingDecisionChoice.isBestPractice ? 'text-[#45D6A3]' : 'text-[#EF5350]'}>
                      {existingDecisionChoice.scoreDelta > 0 ? `+${existingDecisionChoice.scoreDelta} pts` : `${existingDecisionChoice.scoreDelta} pts`}
                    </strong>
                  </div>
                  <h4 className="text-xs font-bold text-white font-sans">
                    {existingDecisionChoice.consequenceTitle}
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {existingDecisionChoice.consequenceDescription}
                  </p>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-300">
                    <span>Delay: <strong className="text-white">{existingDecisionChoice.timeImpactHours > 0 ? `+${existingDecisionChoice.timeImpactHours}h` : '0h'}</strong></span>
                    <span>Cost: <strong className={existingDecisionChoice.costImpactEuro > 0 ? 'text-[#EF5350]' : 'text-[#45D6A3]'}>{existingDecisionChoice.costImpactEuro > 0 ? `+€${existingDecisionChoice.costImpactEuro}` : '€0'}</strong></span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenDecision && onOpenDecision(stageDecision)}
                  className="w-full py-2 rounded-lg bg-[#0B2235] hover:bg-[#1B3B59] border border-[#1B3B59] text-xs font-mono text-[#27D3F2] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Review or Alter Directive
                </button>
              </div>
            ) : (
              <div className="mt-2 space-y-2.5">
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {stageDecision.dilemma}
                </p>
                <button
                  type="button"
                  onClick={() => onOpenDecision && onOpenDecision(stageDecision)}
                  className="w-full py-2.5 rounded-lg bg-[#FFB020] hover:bg-[#E59A15] text-[#07131F] font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <span>Select Operational Directive →</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Dedicated Manager Facilitator Note (Only visible in Manager Mode) */}
        {userRole === 'manager' && stageDecision && (
          <div className="p-3.5 rounded-xl bg-[#45D6A3]/10 border border-[#45D6A3]/40 space-y-1.5 text-xs font-mono animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 text-[#45D6A3] font-bold">
              <Users className="w-3.5 h-3.5" />
              <span>👔 Manager Facilitator Coaching Insight</span>
            </div>
            <p className="text-slate-200 font-sans text-xs leading-relaxed">
              <strong className="text-white">Best Practice Directive:</strong> {stageDecision.options.find(o => o.isBestPractice)?.actionSummary}
            </p>
            <p className="text-slate-300 font-sans text-[11px] pt-1.5 border-t border-[#45D6A3]/20">
              💡 <span className="font-semibold text-[#45D6A3]">Onboarding Debrief Question:</span> Test if the trainee understands why cutting corners on <strong className="text-white">{stageDecision.options.find(o => o.isBestPractice)?.regulatorySource}</strong> causes compounding port holds and demurrage down the line.
            </p>
          </div>
        )}

        {/* Narrative Prose */}
        <div className="space-y-3 text-sm text-slate-300 leading-relaxed font-sans">
          <p>{stage.overview}</p>
        </div>

        {/* Single Clean Unlock Prerequisite Callout */}
        <div className="p-3.5 rounded-xl bg-[#0B2235]/60 border border-[#1B3B59]/70 text-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#27D3F2] font-semibold block mb-1">
            What must become true before moving again?
          </span>
          <p className="text-slate-200 font-sans leading-relaxed">
            {stage.unlockDependency}
          </p>
        </div>

        {/* Stage 8: Port Terminal Cycle (Optional deep dive) */}
        {stage.id === 'stage-terminal-origin' && (
          <button
            type="button"
            onClick={onOpenPortSim}
            className="w-full py-2.5 rounded-xl bg-[#0B2235] hover:bg-[#1B3B59] border border-[#27D3F2]/50 text-[#27D3F2] font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            Launch CMIT 6-Station Terminal Loop Simulation →
          </button>
        )}

        {stage.id === 'stage-delivery' && (
          <button
            type="button"
            onClick={() => {
              soundManager.playTwistLock();
              setSealCut(true);
            }}
            className={`w-full py-2.5 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              sealCut
                ? 'bg-[#45D6A3]/20 border border-[#45D6A3] text-[#45D6A3]'
                : 'bg-[#45D6A3] text-[#07131F] hover:bg-[#38BA8D]'
            }`}
          >
            {sealCut ? '✓ Seal VN847291 Cut · POD Endorsed' : 'Break Seal VN847291 & Endorse POD'}
          </button>
        )}

        {/* End-of-Journey / Mission Culmination: Certification Exam */}
        {(stage.id === 'stage-reveal' || stage.id === 'stage-delivery') && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0B2235] via-[#0B2235]/90 to-[#07131F] border-2 border-[#FF6B35] shadow-2xl space-y-3.5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] flex items-center justify-center text-2xl shadow-md shrink-0">
                🎓
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF6B35] bg-[#FF6B35]/15 px-2 py-0.5 rounded border border-[#FF6B35]/30">
                    Mission Accomplished · Day 48
                  </span>
                </div>
                <h3 className="text-base font-bold font-display text-white mt-0.5">
                  Final Forwarding Certification Exam
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-200 font-sans leading-relaxed">
              Congratulations, <strong className="text-white">{traineeName || 'Cadet Forwarder'}</strong>! You safely navigated Box 917 across 12,450 km. Complete the 10-Question Certification Exam to finalize your operational ranking, earn extra XP, and print your official KEDGE graduation certificate!
            </p>

            <button
              type="button"
              onClick={onOpenAssessment}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] hover:from-[#E85A24] hover:to-[#FF6B35] text-[#07131F] font-mono font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xl hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <Award className="w-4 h-4 text-[#07131F]" />
              <span>Take Final Certification Exam (10 Questions) →</span>
            </button>
          </div>
        )}


        {/* Collapsible Technical Details (Keeps main view uncluttered!) */}
        <div className="border border-[#1B3B59]/60 rounded-xl overflow-hidden bg-[#0B2235]/30">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setShowTechnicalDetails(!showTechnicalDetails);
            }}
            className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-mono text-[#9CB0C0] hover:text-white hover:bg-[#0B2235]/60 transition-colors cursor-pointer"
          >
            <span>Technical & Operational Specifications</span>
            {showTechnicalDetails ? (
              <ChevronUp className="w-4 h-4 text-[#9CB0C0]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#9CB0C0]" />
            )}
          </button>

          {showTechnicalDetails && (
            <div className="p-4 border-t border-[#1B3B59]/50 text-xs font-mono space-y-2 text-[#9CB0C0] bg-[#07131F]/60">
              <div className="flex justify-between py-1 border-b border-[#1B3B59]/40">
                <span>Transport Mode:</span>
                <strong className="text-white uppercase">{stage.mode}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1B3B59]/40">
                <span>Lead Responsibility:</span>
                <span className="text-[#27D3F2]">{stage.responsibleLead}</span>
              </div>
              <div className="py-1 border-b border-[#1B3B59]/40">
                <span className="block text-[10px] uppercase text-[#9CB0C0]/80">Infrastructure:</span>
                <span className="text-white font-sans">{stage.infrastructure}</span>
              </div>
              <div className="py-1">
                <span className="block text-[10px] uppercase text-[#9CB0C0]/80">Primary Risks:</span>
                <span className="text-[#FFB020] font-sans">{stage.risks}</span>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Persistent Bottom Navigation Bar */}
      <div className="p-4 bg-[#07131F] border-t border-[#1B3B59]/60 flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onPrevStage();
          }}
          disabled={!canPrev}
          className="px-3.5 py-2 rounded-lg bg-[#0B2235] hover:bg-[#1B3B59] text-xs font-mono font-medium text-white border border-[#1B3B59] disabled:opacity-25 disabled:pointer-events-none flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span className="text-[11px] font-mono text-[#9CB0C0]/80 hidden sm:inline">
          Stage {stage.stageNumber} / 15
        </span>

        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onNextStage();
          }}
          disabled={!canNext}
          className="px-4 py-2 rounded-lg bg-[#FF6B35] hover:bg-[#E85A24] text-xs font-mono font-bold text-[#07131F] disabled:opacity-25 disabled:pointer-events-none flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
        >
          <span>Next Stage</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
