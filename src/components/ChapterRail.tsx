import React from 'react';
import { JourneyStage } from '../types/journey';
import { soundManager } from './AudioController';
import {
  Compass,
  Box,
  FileText,
  Package,
  Truck,
  AlertTriangle,
  Anchor,
  Ship,
  Globe,
  ShieldAlert,
  Train,
  CheckCircle2,
  Layers
} from 'lucide-react';

interface ChapterRailProps {
  stages: JourneyStage[];
  currentStageIndex: number;
  onSelectStage: (index: number) => void;
}

const STAGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'stage-intro': Compass,
  'stage-passport': Box,
  'stage-booking': FileText,
  'stage-stuffing': Package,
  'stage-first-mile': Truck,
  'stage-customs-exp': AlertTriangle,
  'stage-barge': Anchor,
  'stage-terminal-origin': Layers,
  'stage-loading': Ship,
  'stage-ocean': Globe,
  'stage-eu-prearrival': FileText,
  'stage-arrival-customs': ShieldAlert,
  'stage-rail': Train,
  'stage-delivery': CheckCircle2,
  'stage-reveal': Compass
};

export const ChapterRail: React.FC<ChapterRailProps> = ({
  stages,
  currentStageIndex,
  onSelectStage
}) => {
  return (
    <nav className="hidden md:flex flex-col items-center py-4 bg-[#07131F]/90 backdrop-blur-md border-r border-[#1B3B59] w-14 shrink-0 z-20 overflow-y-auto select-none">
      <div className="flex flex-col items-center gap-2.5">
        {stages.map((stage, idx) => {
          const isCurrent = idx === currentStageIndex;
          const isPassed = idx < currentStageIndex;
          const Icon = STAGE_ICONS[stage.id] || Box;

          return (
            <button
              key={stage.id}
              onClick={() => {
                soundManager.playClick();
                onSelectStage(idx);
              }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs transition-all relative group cursor-pointer ${
                isCurrent
                  ? 'bg-[#FF6B35] text-[#07131F] font-bold shadow-lg shadow-[#FF6B35]/30 scale-110'
                  : isPassed
                  ? 'bg-[#0B2235] text-[#45D6A3] border border-[#45D6A3]/30 hover:border-[#45D6A3]'
                  : 'bg-[#0B2235]/60 text-[#9CB0C0] border border-[#1B3B59] hover:text-white hover:border-[#27D3F2]'
              }`}
              title={`${stage.stageNumber}. ${stage.title}`}
            >
              <Icon className="w-4 h-4" />

              {/* Tooltip on Hover */}
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#0B2235] border border-[#1B3B59] rounded-lg shadow-2xl text-xs font-mono whitespace-nowrap text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                <span className="text-[10px] text-[#27D3F2] block uppercase">
                  Stage {stage.stageNumber} · Day {stage.dayStart}
                </span>
                <strong>{stage.title}</strong>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
