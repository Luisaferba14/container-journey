import React, { useState } from 'react';
import { DISRUPTIONS } from '../data/journey';
import { EvidenceBadge } from './EvidenceBadge';
import { soundManager } from './AudioController';
import {
  AlertTriangle,
  CloudLightning,
  ShieldAlert,
  FileText,
  Clock,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  GitBranch,
  X
} from 'lucide-react';

interface DisruptionModalProps {
  disruptionId: 'event-1' | 'event-2' | 'event-3' | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenDocuments?: () => void;
}

export const DisruptionModal: React.FC<DisruptionModalProps> = ({
  disruptionId,
  isOpen,
  onClose,
  onOpenDocuments
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive'>('interactive');
  const [event1Resolved, setEvent1Resolved] = useState(false);
  const [event2GhostMode, setEvent2GhostMode] = useState(true);
  const [event3ScanStep, setEvent3ScanStep] = useState<number>(1);

  if (!isOpen || !disruptionId) return null;

  const disruption = DISRUPTIONS[disruptionId];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="w-full max-w-4xl h-[88vh] bg-[#07131F] border border-[#FFB020]/60 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FFB020]/20 border border-[#FFB020] flex items-center justify-center text-[#FFB020]">
              {disruptionId === 'event-1' && <FileText className="w-6 h-6" />}
              {disruptionId === 'event-2' && <CloudLightning className="w-6 h-6" />}
              {disruptionId === 'event-3' && <ShieldAlert className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FFB020]">
                  Disruption Case Study
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FFB020]/20 text-[#FFB020] border border-[#FFB020]/40">
                  {disruption.impactLabel}
                </span>
                <EvidenceBadge label="fictional" />
              </div>
              <h3 className="text-xl font-bold font-display text-white mt-0.5">
                {disruption.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1B3B59]/40 hover:bg-[#1B3B59] text-[#9CB0C0] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Main Anatomy Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            
            <div className="bg-[#0B2235] border border-[#1B3B59] rounded-xl p-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#EF5350] font-bold block mb-1">
                Trigger & Root Cause
              </span>
              <p className="text-xs text-[#F4F8FB] leading-relaxed">
                {disruption.trigger}
              </p>
            </div>

            <div className="bg-[#0B2235] border border-[#1B3B59] rounded-xl p-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#45D6A3] font-bold block mb-1">
                Operational Mitigation
              </span>
              <p className="text-xs text-[#F4F8FB] leading-relaxed">
                {disruption.operationalResponse}
              </p>
            </div>

            <div className="bg-[#0B2235]/60 border border-[#27D3F2]/40 rounded-xl p-4 md:col-span-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#27D3F2] font-bold block mb-1">
                Systemic Significance (Why It Matters)
              </span>
              <p className="text-xs text-[#F4F8FB] leading-relaxed">
                {disruption.whyItMatters}
              </p>
            </div>

          </div>

          {/* INTERACTIVE TREATMENT FOR EVENT 1: DATA MISMATCH */}
          {disruptionId === 'event-1' && (
            <div className="bg-[#0B2235] border border-[#1B3B59] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[#FFB020]" />
                  Interactive Data Flow & Propagation
                </h4>
                <span className="text-xs font-mono text-[#9CB0C0]">
                  5 Connected Stakeholders
                </span>
              </div>

              {/* Data propagation flow diagram */}
              <div className="grid grid-cols-5 gap-2 text-center font-mono text-[11px]">
                <div className="bg-[#07131F] p-3 rounded-lg border border-[#1B3B59]">
                  <span className="text-[#9CB0C0] block text-[9px]">Origin</span>
                  <strong className="text-white block mt-1">VietStride</strong>
                  <span className={event1Resolved ? 'text-[#45D6A3]' : 'text-[#EF5350]'}>
                    {event1Resolved ? '600 Cartons' : '598 Cartons'}
                  </span>
                </div>
                <div className="bg-[#07131F] p-3 rounded-lg border border-[#1B3B59]">
                  <span className="text-[#9CB0C0] block text-[9px]">Coordinator</span>
                  <strong className="text-[#27D3F2] block mt-1">DeltaBridge</strong>
                  <span className={event1Resolved ? 'text-[#45D6A3]' : 'text-[#EF5350]'}>
                    {event1Resolved ? 'SI Amended' : 'Hold Alert'}
                  </span>
                </div>
                <div className="bg-[#07131F] p-3 rounded-lg border border-[#1B3B59]">
                  <span className="text-[#9CB0C0] block text-[9px]">Customs</span>
                  <strong className="text-[#9E8CFF] block mt-1">VN Customs</strong>
                  <span className={event1Resolved ? 'text-[#45D6A3]' : 'text-[#EF5350]'}>
                    {event1Resolved ? 'Cleared' : 'Yellow Channel'}
                  </span>
                </div>
                <div className="bg-[#07131F] p-3 rounded-lg border border-[#1B3B59]">
                  <span className="text-[#9CB0C0] block text-[9px]">Ocean Carrier</span>
                  <strong className="text-[#27D3F2] block mt-1">Blue Meridian</strong>
                  <span className={event1Resolved ? 'text-[#45D6A3]' : 'text-[#EF5350]'}>
                    {event1Resolved ? 'BAPLIE Ready' : 'VGM Pending'}
                  </span>
                </div>
                <div className="bg-[#07131F] p-3 rounded-lg border border-[#1B3B59]">
                  <span className="text-[#9CB0C0] block text-[9px]">Terminal</span>
                  <strong className="text-[#45D6A3] block mt-1">CMIT Cai Mep</strong>
                  <span className={event1Resolved ? 'text-[#45D6A3]' : 'text-[#EF5350]'}>
                    {event1Resolved ? 'Barge Gated' : 'Gate Blocked'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick(900);
                    setEvent1Resolved(!event1Resolved);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#FF6B35] hover:bg-[#E85A24] text-[#07131F] font-mono text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {event1Resolved ? 'Reset to Mismatch State' : 'Simulate Transmitting Correction (+12h)'}
                </button>

                {onOpenDocuments && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenDocuments();
                    }}
                    className="text-xs font-mono text-[#27D3F2] hover:underline"
                  >
                    Open Document Wallet to inspect Invoice vs Packing List →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* INTERACTIVE TREATMENT FOR EVENT 2: WEATHER & GHOST PATH */}
          {disruptionId === 'event-2' && (
            <div className="bg-[#0B2235] border border-[#1B3B59] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                  <CloudLightning className="w-4 h-4 text-[#FFB020]" />
                  Planned Ghost Path vs Actual Vessel Velocity
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#9CB0C0]">Compare:</span>
                  <button
                    onClick={() => setEvent2GhostMode(!event2GhostMode)}
                    className="px-2.5 py-1 rounded bg-[#07131F] border border-[#1B3B59] text-xs font-mono text-[#27D3F2] font-semibold"
                  >
                    {event2GhostMode ? 'Showing Planned Ghost Path' : 'Showing Actual Delayed Position'}
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3 font-mono text-xs">
                <div className="bg-[#07131F] p-3 rounded-lg border border-[#1B3B59]">
                  <span className="text-[#9CB0C0] block text-[10px]">Normal Operating Speed</span>
                  <strong className="text-white text-base">18.5 Knots</strong>
                  <span className="text-[#27D3F2] block text-[10px] mt-1">Calm sea conditions</span>
                </div>
                <div className="bg-[#07131F] p-3 rounded-lg border border-[#1B3B59]">
                  <span className="text-[#9CB0C0] block text-[10px]">Reduced Heavy Weather Speed</span>
                  <strong className="text-[#FFB020] text-base">14.0 Knots</strong>
                  <span className="text-[#FFB020] block text-[10px] mt-1">Monsoon swell (-18h loss)</span>
                </div>
                <div className="bg-[#07131F] p-3 rounded-lg border border-[#1B3B59]">
                  <span className="text-[#9CB0C0] block text-[10px]">Port Sequence Cascade</span>
                  <strong className="text-white text-base">+6.0 Hours</strong>
                  <span className="text-[#9CB0C0] block text-[10px] mt-1">Valencia / Barcelona berth queues</span>
                </div>
              </div>

              <p className="text-xs text-[#9CB0C0] font-sans leading-relaxed pt-2 border-t border-[#1B3B59]">
                In maritime transport, ETA is never an invariant contract. It is a live probabilistic forecast updated across weather routing computers, bunkering schedules, and canal convoy windows.
              </p>
            </div>
          )}

          {/* INTERACTIVE TREATMENT FOR EVENT 3: SCANNER & MISSED TRAIN */}
          {disruptionId === 'event-3' && (
            <div className="bg-[#0B2235] border border-[#1B3B59] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-[#FFB020]" />
                  Cascading Consequence: Branching Delay Timeline
                </h4>
                <span className="text-xs font-mono text-[#FFB020]">
                  Inspection Time vs Connection Loss
                </span>
              </div>

              {/* Branching visual */}
              <div className="space-y-3 font-mono text-xs">
                
                {/* Branch 1: Scan execution */}
                <div className="bg-[#07131F] p-4 rounded-lg border border-[#1B3B59] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FFB020]/20 border border-[#FFB020] flex items-center justify-center text-[#FFB020] font-bold">
                      1
                    </div>
                    <div>
                      <strong className="text-white block">Non-Intrusive X-Ray Radioscopy Scan</strong>
                      <span className="text-[11px] text-[#9CB0C0]">
                        Terminal shuttle to Eurofos scanner gantry + DGDDI document review
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#FFB020]">+36 Hours</span>
                </div>

                {/* Branch 2: Connection consequence */}
                <div className="bg-[#07131F] p-4 rounded-lg border border-[#EF5350]/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EF5350]/20 border border-[#EF5350] flex items-center justify-center text-[#EF5350] font-bold">
                      2
                    </div>
                    <div>
                      <strong className="text-[#EF5350] block">Scheduled Train 1 Departed Without Box</strong>
                      <span className="text-[11px] text-[#9CB0C0]">
                        Cut-off missed by 4 hours; forced wait for scheduled Train 2 next evening
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#EF5350]">+12 Hours Wait</span>
                </div>

                {/* Net result */}
                <div className="bg-[#07131F] p-4 rounded-lg border border-[#45D6A3]/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-[#45D6A3]" />
                    <div>
                      <strong className="text-[#45D6A3] block">Consolidated Net Journey Impact</strong>
                      <span className="text-[11px] text-[#9CB0C0]">
                        Absorbed within revised terminal schedule into final 47-day total
                      </span>
                    </div>
                  </div>
                  <span className="text-base font-bold text-[#45D6A3]">+1.0 Day Net</span>
                </div>

              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playScanBeep();
                    setEvent3ScanStep(event3ScanStep === 3 ? 1 : event3ScanStep + 1);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#27D3F2]/20 hover:bg-[#27D3F2]/30 text-[#27D3F2] border border-[#27D3F2]/50 font-mono text-xs font-semibold cursor-pointer"
                >
                  Step {event3ScanStep}/3: {event3ScanStep === 1 ? 'Trigger X-Ray Scan' : event3ScanStep === 2 ? 'Documentary Release' : 'Rebook Train Slot'}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0B2235] border-t border-[#1B3B59] flex items-center justify-between">
          <span className="text-xs font-mono text-[#9CB0C0]">
            Ordinary dependencies create realistic delays without catastrophic accidents or piracy.
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-[#FF6B35] hover:bg-[#E85A24] text-[#07131F] font-mono font-bold text-xs transition-all cursor-pointer"
          >
            Acknowledge & Close Case
          </button>
        </div>

      </div>
    </div>
  );
};
