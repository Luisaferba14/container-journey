import React, { useState } from 'react';
import { EvidenceBadge } from './EvidenceBadge';
import { soundManager } from './AudioController';
import {
  Anchor,
  Scan,
  Compass,
  Layers,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  X,
  Lock,
  Unlock
} from 'lucide-react';

interface PortStation {
  step: number;
  title: string;
  shortDesc: string; // 15–25 words lay explanation
  deepDive: string;
  responsibleActor: string;
  actorRole: string;
  systemName: string;
  verifiedFact: string;
  citationRef: string;
}

const PORT_STATIONS: PortStation[] = [
  {
    step: 1,
    title: 'Berth Planning & Vessel Arrival',
    shortDesc: 'Vessel ETA messages and tidal forecasts are transformed into an hourly berth allocation window before the ship even enters the river channel.',
    deepDive: 'The terminal planning team reconciles vessel draft (up to 15.8m at CMIT) against hydrographic tides. Berth 1 is reserved with three Super Post-Panamax cranes pre-positioned at the expected bay locations to minimize dock turnaround time.',
    responsibleActor: 'CMIT Marine Ops / Port Authority',
    actorRole: 'Berth Planner & Harbour Master',
    systemName: 'TOS Marine Allocation Engine',
    verifiedFact: 'CMIT quay length is 600m with 16.5m draft, capable of docking 20,000 TEU vessels.',
    citationRef: '1'
  },
  {
    step: 2,
    title: 'Gate & OCR Optical Recognition',
    shortDesc: 'High-speed OCR cameras scan the container number, ISO code, and bolt seal while the truck passes the automated gate without stopping.',
    deepDive: 'Optical Character Recognition systems photograph all four sides and the roof of KEDU 240917 4 in less than 3 seconds. The system verifies that the number matches the shipping pre-advice, checks against stolen seal databases, and flags structural damage.',
    responsibleActor: 'CMIT Gate Operations',
    actorRole: 'Automated Gate Supervisor',
    systemName: 'Automated Gate OCR & Kiosk',
    verifiedFact: 'CMIT operates 9 gate lanes with optical recognition and integrated weighbridges.',
    citationRef: '1'
  },
  {
    step: 3,
    title: 'STS Quay Crane Lift & Spreader Lock',
    shortDesc: 'The gantry crane lowers its hydraulic spreader onto the container, locks four twist-locks into the corner castings, and lifts 15.9 tonnes into the air.',
    deepDive: 'Operating 40 metres above the quay, the crane driver uses cameras and laser guides to seat the twist-lock pins. Once the spreader status turns green (locks fully turned 90 degrees), the crane hoists the unit at up to 90 m/min hoist speed.',
    responsibleActor: 'Quay Crane Driver & Stevedores',
    actorRole: 'Ship-to-Shore Operator',
    systemName: 'ZPMC Post-Panamax Gantry Crane',
    verifiedFact: 'CMIT operates 6 gantry cranes with outreach over 22 container rows.',
    citationRef: '7'
  },
  {
    step: 4,
    title: 'TOS Yard Block Assignment',
    shortDesc: 'The terminal operating system assigns a precise 3D yard slot (Block, Row, Tier) to optimize dwell and avoid digging up boxes later.',
    deepDive: 'KEDU 240917 4 is assigned to Block B4, Bay 12, Row 03, Tier 02. The algorithm clusters containers by outbound vessel call, destination port (Fos), and gross weight class (heavy/medium/light) so cranes don’t perform unnecessary unproductive shuffling.',
    responsibleActor: 'CMIT Terminal Planner',
    actorRole: 'Yard Strategy Superintendent',
    systemName: 'Navis N4 Terminal Operating System',
    verifiedFact: 'CMIT yard covers 30 hectares with approximately 50,000 TEU storage capacity.',
    citationRef: '1'
  },
  {
    step: 5,
    title: 'Regulatory & Commercial Hold Screening',
    shortDesc: 'Dual digital firewalls screen the box: customs holds verify regulatory clearance, while carrier holds ensure ocean freight invoices are satisfied.',
    deepDive: 'Two distinct locks govern every container. A Customs Hold prevents physical exit until the declaration is validated (VNACCS in Vietnam, Delta-G in France). A Carrier Line Hold blocks terminal release until ocean freight, demurrage, and Bill of Lading conditions are met.',
    responsibleActor: 'Customs Authorities & Carrier Agent',
    actorRole: 'Risk Officer & Port Agent',
    systemName: 'Port Community System (APCS / CI5)',
    verifiedFact: 'Discharge is not release: physical custody at the terminal cannot transition until both holds are clear.',
    citationRef: '9'
  },
  {
    step: 6,
    title: 'Vessel Load / Intermodal Rail Gate',
    shortDesc: 'Only when both documentary holds turn green does the yard crane retrieve the container and load it onto the ship or connecting freight train.',
    deepDive: 'The BAPLIE electronic bay plan confirms that the container is slotted on MV Portalis (Bay 34 / Row 08 / Tier 82). Semi-automatic twist-locks are inserted by dock lashers into bottom corner castings before the final lift into the ship cell guides.',
    responsibleActor: 'Chief Officer & Lashing Crew',
    actorRole: 'Vessel Master Representative',
    systemName: 'EDI BAPLIE 2.2 Stowage Plan',
    verifiedFact: 'SOLAS mandates that no container without an authenticated VGM may be loaded aboard.',
    citationRef: '7'
  }
];

interface PortMicroExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  terminalName?: string;
}

export const PortMicroExperience: React.FC<PortMicroExperienceProps> = ({
  isOpen,
  onClose,
  terminalName = 'Cai Mep International Terminal (CMIT)'
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null);

  if (!isOpen) return null;

  const currentStation = PORT_STATIONS[activeStep - 1];

  const handleNextStep = () => {
    soundManager.playTwistLock();
    if (activeStep < PORT_STATIONS.length) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(1); // loop back
    }
  };

  const handleStepClick = (step: number) => {
    soundManager.playClick();
    setActiveStep(step);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="w-full max-w-4xl h-[88vh] bg-[#07131F] border border-[#1B3B59] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#27D3F2]/10 border border-[#27D3F2]/40 flex items-center justify-center text-[#27D3F2]">
              <Anchor className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-display text-white">
                  Port Micro-Experience: The 6-Station Loop
                </h3>
                <EvidenceBadge label="verified" citationRef="1" />
              </div>
              <p className="text-xs text-[#9CB0C0]">
                {terminalName} · The container terminal is an orchestrated buffer, not a single monolithic actor.
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

        {/* 6-Step Stepper Header */}
        <div className="px-6 py-3 bg-[#07131F] border-b border-[#1B3B59] flex items-center justify-between overflow-x-auto gap-2">
          {PORT_STATIONS.map((station) => {
            const isCurrent = station.step === activeStep;
            const isCompleted = station.step < activeStep;

            return (
              <button
                key={station.step}
                onClick={() => handleStepClick(station.step)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 ${
                  isCurrent
                    ? 'bg-[#FF6B35] text-[#07131F] font-bold shadow-md'
                    : isCompleted
                    ? 'bg-[#45D6A3]/10 text-[#45D6A3] border border-[#45D6A3]/30'
                    : 'bg-[#0B2235] text-[#9CB0C0] hover:text-white border border-[#1B3B59]'
                }`}
              >
                <span>{station.step}.</span>
                <span className="truncate max-w-[110px]">{station.title.split(' ')[0]}</span>
                {isCompleted && <CheckCircle2 className="w-3 h-3" />}
              </button>
            );
          })}
        </div>

        {/* Active Station Display */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Main Station Banner */}
          <div className="bg-[#0B2235] border border-[#1B3B59] rounded-xl p-6 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#27D3F2] font-semibold">
                  Station {currentStation.step} of 6
                </span>
                <h4 className="text-xl font-bold font-display text-white mt-0.5">
                  {currentStation.title}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#07131F] border border-[#1B3B59] text-xs font-mono text-[#9CB0C0]">
                  System: {currentStation.systemName}
                </span>
              </div>
            </div>

            {/* 15-25 Word Lay Explanation */}
            <div className="bg-[#07131F] border-l-4 border-[#FF6B35] p-4 rounded-r-lg mb-4">
              <span className="text-[10px] font-mono uppercase text-[#9CB0C0] block mb-1">
                Operational Overview (Plain Language)
              </span>
              <p className="text-sm text-[#F4F8FB] font-medium leading-relaxed">
                {currentStation.shortDesc}
              </p>
            </div>

            {/* Responsible Actor Badge */}
            <div className="flex items-center gap-3 p-3 bg-[#0B2235]/60 border border-[#1B3B59] rounded-lg">
              <div className="w-8 h-8 rounded-full bg-[#45D6A3]/20 border border-[#45D6A3] flex items-center justify-center text-[#45D6A3] font-mono text-xs font-bold">
                {currentStation.step}
              </div>
              <div className="text-xs font-mono">
                <span className="text-[#9CB0C0] block text-[10px]">Responsible Operational Lead:</span>
                <strong className="text-white">{currentStation.responsibleActor}</strong>
                <span className="text-[#27D3F2] ml-2">({currentStation.actorRole})</span>
              </div>
            </div>

            {/* "Go Deeper" Accordion */}
            <div className="mt-4 border border-[#1B3B59] rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setExpandedAccordion(expandedAccordion === currentStation.step ? null : currentStation.step);
                }}
                className="w-full px-4 py-2.5 bg-[#07131F] hover:bg-[#07131F]/80 text-left flex items-center justify-between text-xs font-mono font-semibold text-[#27D3F2] cursor-pointer"
              >
                <span>Go Deeper: Technical Logistics & Regulations</span>
                {expandedAccordion === currentStation.step ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {expandedAccordion === currentStation.step && (
                <div className="p-4 bg-[#07131F]/60 border-t border-[#1B3B59] text-xs text-[#9CB0C0] leading-relaxed font-sans space-y-3">
                  <p>{currentStation.deepDive}</p>
                  <div className="pt-2 border-t border-[#1B3B59]/60 flex items-center justify-between">
                    <span className="font-mono text-[#45D6A3]">
                      Verified Benchmark: {currentStation.verifiedFact}
                    </span>
                    <EvidenceBadge label="verified" citationRef={currentStation.citationRef} />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Dual Hold Visualizer (Specifically for Station 5) */}
          {currentStation.step === 5 && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#0B2235] border border-[#9E8CFF]/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2 text-[#9E8CFF] font-mono text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  Customs Regulatory Hold (VNACCS / Delta-G)
                </div>
                <p className="text-xs text-[#9CB0C0] leading-relaxed">
                  Controls legality of entry/exit into sovereign customs territory. Triggered by declaration errors, inspection referrals, or missing tariff documentation.
                </p>
              </div>

              <div className="bg-[#0B2235] border border-[#27D3F2]/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2 text-[#27D3F2] font-mono text-xs font-bold">
                  <Lock className="w-4 h-4" />
                  Carrier Commercial Hold (Line Delivery Order)
                </div>
                <p className="text-xs text-[#9CB0C0] leading-relaxed">
                  Controls commercial ownership and payments. Ocean shipping lines hold containers until freight charges, terminal dues, and original Bills of Lading are surrendered.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#0B2235] border-t border-[#1B3B59] flex items-center justify-between">
          <button
            onClick={() => setActiveStep(1)}
            className="text-xs font-mono text-[#9CB0C0] hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Station 1
          </button>

          <button
            type="button"
            onClick={handleNextStep}
            className="px-5 py-2.5 rounded-lg bg-[#FF6B35] hover:bg-[#E85A24] text-[#07131F] font-mono font-bold text-xs flex items-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            {activeStep === 6 ? 'Loop Complete (Restart)' : `Advance to Station ${activeStep + 1}`}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
