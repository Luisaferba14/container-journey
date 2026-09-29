import React, { useState } from 'react';
import { JourneyStage } from '../types/journey';
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
  RefreshCw
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
  onOpenSlotSelector?: () => void;
  onOpenPortSim?: () => void;
  onOpenDisruption?: (id: 'event-1' | 'event-2' | 'event-3') => void;
  onOpenPassport?: () => void;
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
  onOpenSlotSelector,
  onOpenPortSim,
  onOpenDisruption,
  onOpenPassport
}) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [palletsCount, setPalletsCount] = useState(20);
  const [sealCut, setSealCut] = useState(false);

  return (
    <div className="w-full h-full flex flex-col bg-[#07131F] text-[#F4F8FB] select-none overflow-hidden">
      
      {/* Scrollable Story Panel */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        
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
            <EvidenceBadge label={stage.stageNumber <= 2 ? 'fictional' : 'assumption'} />
          </div>
        </div>

        {/* The Protagonist Voice (The Box Speaks) */}
        <div className="relative pl-4 border-l-2 border-[#FF6B35] py-1">
          <p className="text-sm font-sans italic text-slate-200 leading-relaxed">
            "{stage.firstPersonVoice}"
          </p>
          <span className="block text-[11px] font-mono text-[#FF6B35]/80 mt-1">
            — KEDU 240917 4
          </span>
        </div>

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

        {/* Contextual Single Interactive Action Button for Key Stages */}
        {stage.disruptionId === 'event-1' && (
          <div className="p-4 rounded-xl bg-[#FFB020]/10 border border-[#FFB020]/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#FFB020] font-bold">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Disruption 1: 598 vs 600 Cartons Mismatch
              </span>
              <span>+12h Hold</span>
            </div>
            <p className="text-xs text-slate-300">
              A clerical error on the packing list stopped customs clearance. Inspect and fix the discrepancy.
            </p>
            <button
              type="button"
              onClick={() => onOpenDisruption && onOpenDisruption('event-1')}
              className="w-full py-2.5 rounded-lg bg-[#FFB020] hover:bg-[#E59A15] text-[#07131F] font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              Open Document Comparison Tool →
            </button>
          </div>
        )}

        {stage.disruptionId === 'event-2' && (
          <div className="p-4 rounded-xl bg-[#FFB020]/10 border border-[#FFB020]/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#FFB020] font-bold">
              <span>Disruption 2: Indian Ocean Monsoon Swell</span>
              <span>+1.5 Days</span>
            </div>
            <p className="text-xs text-slate-300">
              Vessel reduced speed to 14 knots. ETA changed across the entire network.
            </p>
            <button
              type="button"
              onClick={() => onOpenDisruption && onOpenDisruption('event-2')}
              className="w-full py-2.5 rounded-lg bg-[#FFB020] hover:bg-[#E59A15] text-[#07131F] font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              Inspect Weather Routing & Ghost Path →
            </button>
          </div>
        )}

        {stage.disruptionId === 'event-3' && (
          <div className="p-4 rounded-xl bg-[#EF5350]/10 border border-[#EF5350]/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#EF5350] font-bold">
              <span>Disruption 3: Customs Scan & Missed Rail</span>
              <span>+1.0 Day Net</span>
            </div>
            <p className="text-xs text-slate-300">
              Non-intrusive x-ray scan cleared, but caused the container to miss its scheduled train shuttle.
            </p>
            <button
              type="button"
              onClick={() => onOpenDisruption && onOpenDisruption('event-3')}
              className="w-full py-2.5 rounded-lg bg-[#EF5350] hover:bg-[#D93D3A] text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              Inspect Customs Scan & Rail Rebooking →
            </button>
          </div>
        )}

        {stage.id === 'stage-terminal-origin' && (
          <button
            type="button"
            onClick={onOpenPortSim}
            className="w-full py-2.5 rounded-xl bg-[#0B2235] hover:bg-[#1B3B59] border border-[#27D3F2]/50 text-[#27D3F2] font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            Launch CMIT 6-Station Terminal Loop Simulation →
          </button>
        )}

        {stage.id === 'stage-loading' && (
          <button
            type="button"
            onClick={onOpenSlotSelector}
            className="w-full py-2.5 rounded-xl bg-[#0B2235] hover:bg-[#1B3B59] border border-[#FF6B35]/50 text-[#FF6B35] font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            Find My Slot: Bay 34 / Row 08 / Tier 82 →
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
