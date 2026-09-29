import React, { useState } from 'react';
import { EvidenceLabel } from '../types/journey';
import { Info, CheckCircle2, Sparkles, HelpCircle, Calculator } from 'lucide-react';

interface EvidenceBadgeProps {
  label: EvidenceLabel;
  claim?: string;
  sourceText?: string;
  citationRef?: string;
  inline?: boolean;
  className?: string;
}

const BADGE_CONFIG: Record<
  EvidenceLabel,
  {
    title: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
  }
> = {
  verified: {
    title: 'Verified fact',
    bgColor: 'bg-[#45D6A3]/10',
    textColor: 'text-[#45D6A3]',
    borderColor: 'border-[#45D6A3]/30 hover:border-[#45D6A3]',
    icon: CheckCircle2,
    description: 'Supported by an authoritative published source (terminal specs, carrier schedule, IMO/EU regulations).'
  },
  fictional: {
    title: 'Fictional',
    bgColor: 'bg-[#F2C66D]/10',
    textColor: 'text-[#F2C66D]',
    borderColor: 'border-[#F2C66D]/30 hover:border-[#F2C66D]',
    icon: Sparkles,
    description: 'Created specifically for narrative structure (e.g. VietStride, Blue Meridian, MV Portalis, RhôneSport).'
  },
  assumption: {
    title: 'Assumption',
    bgColor: 'bg-[#9E8CFF]/10',
    textColor: 'text-[#9E8CFF]',
    borderColor: 'border-[#9E8CFF]/30 hover:border-[#9E8CFF]',
    icon: HelpCircle,
    description: 'Plausible operational parameter selected to complete the pedagogical scenario (e.g. 12,000 kg cargo, 3,900 kg tare).'
  },
  calculation: {
    title: 'Illustrative calculation',
    bgColor: 'bg-[#27D3F2]/10',
    textColor: 'text-[#27D3F2]',
    borderColor: 'border-[#27D3F2]/30 hover:border-[#27D3F2]',
    icon: Calculator,
    description: 'Educational estimate based on standard industry factors, not a binding commercial quotation or audited footprint.'
  }
};

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({
  label,
  claim,
  sourceText,
  citationRef,
  inline = false,
  className = ''
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const config = BADGE_CONFIG[label] || BADGE_CONFIG.assumption;
  const IconComponent = config.icon;

  return (
    <span className={`relative inline-flex items-center ${inline ? 'my-0.5 align-middle' : ''} ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowTooltip(!showTooltip);
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-mono font-medium border transition-all cursor-pointer ${config.bgColor} ${config.textColor} ${config.borderColor}`}
        title={`Click for evidence details: ${config.title}`}
      >
        <IconComponent className="w-3 h-3 shrink-0" />
        <span className="tracking-wide uppercase font-semibold text-[10px]">{config.title}</span>
        {citationRef && <span className="opacity-80 text-[10px]">[{citationRef}]</span>}
      </button>

      {showTooltip && (
        <div 
          className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-[#0B2235] border border-[#1B3B59] rounded-lg shadow-2xl text-left text-xs text-[#F4F8FB] pointer-events-auto backdrop-blur-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-[#1B3B59]">
            <span className={`font-mono font-bold uppercase text-[11px] ${config.textColor} flex items-center gap-1`}>
              <IconComponent className="w-3.5 h-3.5" />
              {config.title}
            </span>
            {citationRef && (
              <span className="font-mono text-[10px] text-[#9CB0C0]">Ref #{citationRef}</span>
            )}
          </div>
          <p className="text-[11px] leading-relaxed text-[#9CB0C0] mb-2">{config.description}</p>
          {claim && (
            <div className="bg-[#07131F] p-2 rounded border border-[#1B3B59]/60 text-[11px] text-[#F4F8FB] font-sans">
              <span className="font-semibold text-white">Application: </span>
              {claim}
            </div>
          )}
          {sourceText && (
            <div className="mt-1.5 text-[10px] text-[#27D3F2] italic">
              Source: {sourceText}
            </div>
          )}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0B2235]" />
        </div>
      )}
    </span>
  );
};
