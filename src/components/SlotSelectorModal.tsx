import React, { useState } from 'react';
import { EvidenceBadge } from './EvidenceBadge';
import { soundManager } from './AudioController';
import {
  Ship,
  CheckCircle2,
  AlertTriangle,
  X,
  Layers,
  Anchor,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';

interface SlotOption {
  slotCode: string; // Bay-Row-Tier
  isCorrect: boolean;
  title: string;
  evaluation: string;
  reason: string;
}

const SLOT_OPTIONS: SlotOption[] = [
  {
    slotCode: 'Bay 34 / Row 08 / Tier 82',
    isCorrect: true,
    title: 'On-Deck Middle Tier (Fos Discharge)',
    evaluation: 'OPTIMAL SLOT ASSIGNMENT',
    reason: 'Medium-weight 15.9 t container placed on deck in Fos discharge block. Readily accessible at Eurofos without over-stowage beneath Barcelona or Valencia cargo, maintaining ship metacentric height (GM).'
  },
  {
    slotCode: 'Bay 12 / Row 02 / Tier 04',
    isCorrect: false,
    title: 'Deep Below Hold (Under Valencia Stack)',
    evaluation: 'OVER-STOWAGE VIOLATION',
    reason: 'Stowing here would bury a Fos container under boxes destined for Valencia and Barcelona. Discharging in Spain would require 14 unproductive re-handles (shifting).'
  },
  {
    slotCode: 'Bay 42 / Row 14 / Tier 92',
    isCorrect: false,
    title: 'Top Outer Deck Tier (Wind & Accelerations)',
    evaluation: 'DYNAMIC ACCELERATION RISK',
    reason: 'Placing a 15.9 t container on the highest outer tier subjects lashings to extreme roll acceleration in Indian Ocean monsoon swells, risking stack racking or loss overboard.'
  },
  {
    slotCode: 'Bay 28 / Row 06 / Tier 84',
    isCorrect: false,
    title: 'Reefer Monitoring Slot adjacent to IMDG Class 3',
    evaluation: 'INEFFICIENT UTILISATION & SEGREGATION',
    reason: 'Wastes a 440V reefer electrical plug on a dry shoe container, and sits adjacent to a hazardous Class 3 flammable cargo cell requiring IMDG buffer spacing.'
  }
];

interface SlotSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSlotSelected?: (slot: string) => void;
}

export const SlotSelectorModal: React.FC<SlotSelectorModalProps> = ({
  isOpen,
  onClose,
  onSlotSelected
}) => {
  const [selectedSlot, setSelectedSlot] = useState<SlotOption | null>(null);

  if (!isOpen) return null;

  const handleSelect = (option: SlotOption) => {
    if (option.isCorrect) {
      soundManager.playTwistLock();
      if (onSlotSelected) onSlotSelected(option.slotCode);
    } else {
      soundManager.playClick(350);
    }
    setSelectedSlot(option);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="w-full max-w-4xl h-[88vh] bg-[#07131F] border border-[#1B3B59] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/20 border border-[#FF6B35] flex items-center justify-center text-[#FF6B35]">
              <Ship className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-display text-white">Find My Slot on MV Portalis</h3>
                <EvidenceBadge label="fictional" citationRef="7" />
              </div>
              <p className="text-xs text-[#9CB0C0]">
                16,000 TEU cellular containership · Bay-Row-Tier coordinate stowage system.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1B3B59]/40 hover:bg-[#1B3B59] text-[#9CB0C0] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Stowage Rules Banner */}
        <div className="px-6 py-3 bg-[#07131F] border-b border-[#1B3B59] grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-[#0B2235] p-2.5 rounded border border-[#1B3B59]">
            <span className="text-[#27D3F2] font-bold block">1. Stability & Metacentre</span>
            <span className="text-[10px] text-[#9CB0C0]">Heavy boxes low; light boxes high.</span>
          </div>
          <div className="bg-[#0B2235] p-2.5 rounded border border-[#1B3B59]">
            <span className="text-[#45D6A3] font-bold block">2. Discharge Rotation</span>
            <span className="text-[10px] text-[#9CB0C0]">Valencia → Barcelona → Fos order.</span>
          </div>
          <div className="bg-[#0B2235] p-2.5 rounded border border-[#1B3B59]">
            <span className="text-[#FFB020] font-bold block">3. Hazardous Segregation</span>
            <span className="text-[10px] text-[#9CB0C0]">IMDG code separation buffers.</span>
          </div>
          <div className="bg-[#0B2235] p-2.5 rounded border border-[#1B3B59]">
            <span className="text-[#9E8CFF] font-bold block">4. Reefer Plugs</span>
            <span className="text-[10px] text-[#9CB0C0]">Reserve 440V plugs for refrigerated cargo.</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <div className="text-xs font-mono text-[#9CB0C0]">
            Select where container <strong>KEDU 240917 4</strong> (15.9 t gross, Fos-sur-Mer discharge) should be planned:
          </div>

          {/* 4 Slot Choices Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {SLOT_OPTIONS.map((opt) => {
              const isSelected = selectedSlot?.slotCode === opt.slotCode;
              return (
                <button
                  key={opt.slotCode}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className={`text-left p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? opt.isCorrect
                        ? 'bg-[#45D6A3]/10 border-[#45D6A3] shadow-lg'
                        : 'bg-[#EF5350]/10 border-[#EF5350] shadow-lg'
                      : 'bg-[#0B2235] border-[#1B3B59] hover:bg-[#0B2235]/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold text-white">
                      {opt.slotCode}
                    </span>
                    {isSelected && (
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          opt.isCorrect ? 'bg-[#45D6A3]/20 text-[#45D6A3]' : 'bg-[#EF5350]/20 text-[#EF5350]'
                        }`}
                      >
                        {opt.isCorrect ? 'VALID STOW' : 'INVALID'}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-semibold text-[#27D3F2] mb-1 font-mono">
                    {opt.title}
                  </h4>
                  <p className="text-xs text-[#9CB0C0] leading-relaxed">
                    {opt.reason}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Interactive Ship Cross-Section Visualization */}
          <div className="bg-[#0B2235] border border-[#1B3B59] rounded-xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#9CB0C0]">
                Vessel Cross-Section: Bay 34 Stowage Matrix
              </span>
              <span className="text-xs font-mono text-[#FF6B35] font-bold">
                Assigned: Bay 34 / Row 08 / Tier 82
              </span>
            </div>

            {/* Container Stacking Grid SVG */}
            <div className="h-44 w-full flex items-center justify-center">
              <svg viewBox="0 0 500 160" className="w-full h-full max-h-44">
                {/* Ship Hull Silhouette */}
                <path d="M40,60 L70,140 L430,140 L460,60 Z" fill="#07131F" stroke="#1B3B59" strokeWidth="2" />
                <line x1="20" y1="60" x2="480" y2="60" stroke="#27D3F2" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="25" y="55" fill="#27D3F2" fontSize="9" fontFamily="IBM Plex Mono">DECK LEVEL</text>
                <text x="25" y="130" fill="#9CB0C0" fontSize="9" fontFamily="IBM Plex Mono">HOLD</text>

                {/* Hold Stacks (Below Deck) */}
                <rect x="90" y="70" width="40" height="20" rx="1" fill="#1B3B59" />
                <rect x="90" y="93" width="40" height="20" rx="1" fill="#1B3B59" />
                <rect x="90" y="116" width="40" height="20" rx="1" fill="#1B3B59" />

                <rect x="135" y="70" width="40" height="20" rx="1" fill="#1B3B59" />
                <rect x="135" y="93" width="40" height="20" rx="1" fill="#1B3B59" />
                <rect x="135" y="116" width="40" height="20" rx="1" fill="#1B3B59" />

                <rect x="180" y="70" width="40" height="20" rx="1" fill="#1B3B59" />
                <rect x="180" y="93" width="40" height="20" rx="1" fill="#1B3B59" />
                <rect x="180" y="116" width="40" height="20" rx="1" fill="#1B3B59" />

                <rect x="225" y="70" width="40" height="20" rx="1" fill="#1B3B59" />
                <rect x="225" y="93" width="40" height="20" rx="1" fill="#1B3B59" />
                <rect x="225" y="116" width="40" height="20" rx="1" fill="#1B3B59" />

                <rect x="270" y="70" width="40" height="20" rx="1" fill="#1B3B59" />
                <rect x="270" y="93" width="40" height="20" rx="1" fill="#1B3B59" />
                <rect x="270" y="116" width="40" height="20" rx="1" fill="#1B3B59" />

                {/* On-Deck Stacks */}
                {/* Other Containers */}
                <rect x="135" y="35" width="40" height="20" rx="1" fill="#525F6B" />
                <rect x="135" y="12" width="40" height="20" rx="1" fill="#525F6B" />

                <rect x="180" y="35" width="40" height="20" rx="1" fill="#525F6B" />
                <rect x="180" y="12" width="40" height="20" rx="1" fill="#525F6B" />

                {/* THE HERO CONTAINER: Bay 34 / Row 08 / Tier 82 */}
                <g className="animate-pulse">
                  <rect x="225" y="35" width="40" height="20" rx="2" fill="#FF6B35" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="245" y="48" fill="#07131F" fontSize="7" fontWeight="bold" fontFamily="IBM Plex Mono" textAnchor="middle">
                    917
                  </text>
                </g>

                <rect x="225" y="12" width="40" height="20" rx="1" fill="#525F6B" />

                <rect x="270" y="35" width="40" height="20" rx="1" fill="#525F6B" />
                <rect x="270" y="12" width="40" height="20" rx="1" fill="#525F6B" />

                <rect x="315" y="35" width="40" height="20" rx="1" fill="#525F6B" />
                <rect x="315" y="12" width="40" height="20" rx="1" fill="#525F6B" />
              </svg>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0B2235] border-t border-[#1B3B59] flex items-center justify-between">
          <span className="text-xs font-mono text-[#9CB0C0]">
            BAPLIE standard message transmits this bay plan to all destination terminals.
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-[#FF6B35] hover:bg-[#E85A24] text-[#07131F] font-mono font-bold text-xs transition-all shadow-lg cursor-pointer"
          >
            Confirm Stow & Close
          </button>
        </div>

      </div>
    </div>
  );
};
