import React, { useState } from 'react';
import { ACTORS } from '../data/actors';
import { Actor, ResponsibilityType } from '../types/journey';
import { soundManager } from './AudioController';
import {
  Users,
  Shield,
  FileText,
  DollarSign,
  Package,
  X,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

interface ActorConstellationProps {
  isOpen: boolean;
  onClose: () => void;
  activeActorIds?: string[];
  onSelectActorStage?: (actorId: string) => void;
}

export const ActorConstellation: React.FC<ActorConstellationProps> = ({
  isOpen,
  onClose,
  activeActorIds = [],
  onSelectActorStage
}) => {
  const [selectedLens, setSelectedLens] = useState<ResponsibilityType | 'all'>('all');
  const [selectedActorId, setSelectedActorId] = useState<string>(activeActorIds[0] || ACTORS[0].id);

  if (!isOpen) return null;

  const filteredActors = selectedLens === 'all'
    ? ACTORS
    : ACTORS.filter((actor) => actor.responsibilities.includes(selectedLens));

  const selectedActor = ACTORS.find((a) => a.id === selectedActorId) || ACTORS[0];

  const LENSES: { type: ResponsibilityType | 'all'; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    { type: 'all', label: 'All 17 Actors', icon: Users, desc: 'Full ecosystem constellation across 47 days' },
    { type: 'physical', label: 'Physical Custody', icon: Package, desc: 'Who physically holds and moves the steel container' },
    { type: 'legal', label: 'Legal & Compliance', icon: Shield, desc: 'Who bears statutory customs, VGM and maritime liability' },
    { type: 'information', label: 'Information Flow', icon: FileText, desc: 'Who generates, transmits and reconciles trade data' },
    { type: 'cost', label: 'Cost Bearer', icon: DollarSign, desc: 'Who invoices or pays for specific multimodal legs' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="w-full max-w-5xl h-[88vh] bg-[#07131F] border border-[#1B3B59] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/15 border border-[#FF6B35]/50 flex items-center justify-center text-[#FF6B35]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white">People Behind the Box</h3>
              <p className="text-xs text-[#9CB0C0]">
                The handoff constellation: 17 organisations and human teams coordinating one container.
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

        {/* Responsibility Lens Selector Toolbar */}
        <div className="px-6 py-3 bg-[#07131F] border-b border-[#1B3B59] flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-semibold text-[#9CB0C0] flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" /> Responsibility Lens:
          </span>
          {LENSES.map((lens) => {
            const Icon = lens.icon;
            const isSelected = selectedLens === lens.type;
            return (
              <button
                key={lens.type}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedLens(lens.type);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#27D3F2]/20 text-[#27D3F2] border border-[#27D3F2]'
                    : 'bg-[#0B2235] text-[#9CB0C0] border border-[#1B3B59] hover:text-white'
                }`}
                title={lens.desc}
              >
                <Icon className="w-3.5 h-3.5" />
                {lens.label}
              </button>
            );
          })}
        </div>

        {/* Constellation Grid & Detail View */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Actors List */}
          <div className="w-80 border-r border-[#1B3B59] bg-[#07131F] overflow-y-auto divide-y divide-[#1B3B59]/40">
            {filteredActors.map((actor) => {
              const isSelected = actor.id === selectedActor.id;
              const isActive = activeActorIds.includes(actor.id);

              return (
                <button
                  key={actor.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedActorId(actor.id);
                  }}
                  className={`w-full text-left p-3.5 transition-colors flex items-start justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B3B59]/60 border-l-4 border-[#FF6B35]'
                      : 'hover:bg-[#0B2235]/60'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-white truncate">
                        {actor.name}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#FF6B35] shrink-0" title="Active in current scene" />
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-[#9CB0C0] block truncate">
                      {actor.role}
                    </span>
                    <span className="text-[10px] text-[#9CB0C0]/80 font-mono mt-0.5 block">
                      {actor.activeWindow}
                    </span>
                  </div>

                  {actor.isRealEntity ? (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#45D6A3]/20 text-[#45D6A3] border border-[#45D6A3]/30 shrink-0">
                      Real
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#F2C66D]/20 text-[#F2C66D] border border-[#F2C66D]/30 shrink-0">
                      Fictional
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Actor Profile Detail Card */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#07131F]">
            
            {/* Main Profile Header */}
            <div className="bg-[#0B2235] border border-[#1B3B59] rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center font-mono font-bold text-xl text-[#07131F] shadow-lg shrink-0"
                    style={{ backgroundColor: selectedActor.avatarColor }}
                  >
                    {selectedActor.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-xl font-bold font-display text-white">
                        {selectedActor.name}
                      </h4>
                      {selectedActor.isRealEntity ? (
                        <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#45D6A3]/20 text-[#45D6A3] border border-[#45D6A3]/40">
                          Real Enterprise
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#F2C66D]/20 text-[#F2C66D] border border-[#F2C66D]/40">
                          Fictional Construct
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#27D3F2] font-mono">
                      {selectedActor.role} · {selectedActor.organization}
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-[10px] uppercase text-[#9CB0C0] block">Active Window</span>
                  <span className="text-xs font-bold text-[#FFB020] mt-0.5 block">
                    {selectedActor.activeWindow}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs text-[#F4F8FB] leading-relaxed pt-3 border-t border-[#1B3B59]">
                {selectedActor.description}
              </p>
            </div>

            {/* Responsibility Tags breakdown */}
            <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-5">
              <h5 className="text-xs font-mono uppercase tracking-widest text-[#9CB0C0] font-bold mb-3">
                Responsibility Matrix Profile
              </h5>

              <div className="grid sm:grid-cols-2 gap-3 font-mono text-xs">
                <div
                  className={`p-3 rounded-lg border flex items-center gap-3 ${
                    selectedActor.responsibilities.includes('physical')
                      ? 'bg-[#45D6A3]/10 border-[#45D6A3] text-white'
                      : 'bg-[#07131F]/40 border-[#1B3B59]/40 text-[#9CB0C0]/50'
                  }`}
                >
                  <Package className="w-5 h-5 shrink-0 text-[#45D6A3]" />
                  <div>
                    <strong className="block">Physical Custody</strong>
                    <span className="text-[10px] text-[#9CB0C0]">
                      {selectedActor.responsibilities.includes('physical') ? 'Active custodian of steel unit' : 'No physical handling'}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg border flex items-center gap-3 ${
                    selectedActor.responsibilities.includes('legal')
                      ? 'bg-[#9E8CFF]/10 border-[#9E8CFF] text-white'
                      : 'bg-[#07131F]/40 border-[#1B3B59]/40 text-[#9CB0C0]/50'
                  }`}
                >
                  <Shield className="w-5 h-5 shrink-0 text-[#9E8CFF]" />
                  <div>
                    <strong className="block">Legal / Compliance</strong>
                    <span className="text-[10px] text-[#9CB0C0]">
                      {selectedActor.responsibilities.includes('legal') ? 'Signs statutory declarations & B/L' : 'No statutory liability'}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg border flex items-center gap-3 ${
                    selectedActor.responsibilities.includes('information')
                      ? 'bg-[#27D3F2]/10 border-[#27D3F2] text-white'
                      : 'bg-[#07131F]/40 border-[#1B3B59]/40 text-[#9CB0C0]/50'
                  }`}
                >
                  <FileText className="w-5 h-5 shrink-0 text-[#27D3F2]" />
                  <div>
                    <strong className="block">Information Flow</strong>
                    <span className="text-[10px] text-[#9CB0C0]">
                      {selectedActor.responsibilities.includes('information') ? 'Generates & reconciles digital records' : 'No data generation role'}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg border flex items-center gap-3 ${
                    selectedActor.responsibilities.includes('cost')
                      ? 'bg-[#FFB020]/10 border-[#FFB020] text-white'
                      : 'bg-[#07131F]/40 border-[#1B3B59]/40 text-[#9CB0C0]/50'
                  }`}
                >
                  <DollarSign className="w-5 h-5 shrink-0 text-[#FFB020]" />
                  <div>
                    <strong className="block">Cost Responsibility</strong>
                    <span className="text-[10px] text-[#9CB0C0]">
                      {selectedActor.responsibilities.includes('cost') ? 'Invoices freight or bears logistics cost' : 'Operational agent only'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Pedagogical Takeaway */}
            <div className="bg-[#0B2235]/40 border border-[#27D3F2]/30 rounded-xl p-4">
              <span className="text-xs font-mono font-bold text-[#27D3F2] block mb-1">
                Why This Separation Matters
              </span>
              <p className="text-xs text-[#9CB0C0] leading-relaxed">
                Logistics is frequently misunderstood as a single company moving goods from A to B. In reality, physical custody, statutory legal compliance, information accuracy, and financial risk are continually decoupled and handed off between specialized partners at every interchange.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
