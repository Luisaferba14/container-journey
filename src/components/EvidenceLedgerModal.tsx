import React, { useState } from 'react';
import { EVIDENCE_SOURCES } from '../data/sources';
import { EvidenceLabel, EvidenceSource } from '../types/journey';
import { EvidenceBadge } from './EvidenceBadge';
import { soundManager } from './AudioController';
import {
  BookOpen,
  Search,
  ExternalLink,
  Filter,
  X,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Calculator
} from 'lucide-react';

interface EvidenceLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EvidenceLedgerModal: React.FC<EvidenceLedgerModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedFilter, setSelectedFilter] = useState<EvidenceLabel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredSources = EVIDENCE_SOURCES.filter((src) => {
    const matchesFilter = selectedFilter === 'all' || src.label === selectedFilter;
    const matchesQuery =
      src.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.sourceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.publisher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const FILTERS: { type: EvidenceLabel | 'all'; label: string }[] = [
    { type: 'all', label: 'All Evidence (15 Citations)' },
    { type: 'verified', label: 'Verified Facts' },
    { type: 'fictional', label: 'Fictional Constructs' },
    { type: 'assumption', label: 'Operational Assumptions' },
    { type: 'calculation', label: 'Illustrative Calculations' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="w-full max-w-5xl h-[88vh] bg-[#07131F] border border-[#1B3B59] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#45D6A3]/10 border border-[#45D6A3]/40 flex items-center justify-center text-[#45D6A3]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white">
                Sources & Evidence Ledger
              </h3>
              <p className="text-xs text-[#9CB0C0]">
                Methodological transparency: Every claim labelled to distinguish empirical logistics from narrative structure.
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

        {/* Filter and Search Bar */}
        <div className="px-6 py-3 bg-[#07131F] border-b border-[#1B3B59] flex flex-col md:flex-row items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f.type}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedFilter(f.type);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  selectedFilter === f.type
                    ? 'bg-[#27D3F2]/20 text-[#27D3F2] border border-[#27D3F2]'
                    : 'bg-[#0B2235] text-[#9CB0C0] border border-[#1B3B59] hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9CB0C0]" />
            <input
              type="text"
              placeholder="Search claims & sources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#0B2235] border border-[#1B3B59] rounded-lg text-xs font-mono text-white placeholder-[#9CB0C0]/60 focus:outline-none focus:border-[#27D3F2]"
            />
          </div>

        </div>

        {/* Sources Table / List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#1B3B59]/50 space-y-4">
          {filteredSources.map((item) => (
            <div key={item.id} className="pt-4 first:pt-0 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-[#1B3B59]/60 font-mono text-xs font-bold text-white flex items-center justify-center shrink-0">
                    {item.refIndex}
                  </span>
                  <EvidenceBadge label={item.label} />
                </div>

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#27D3F2] hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>Official Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <h4 className="text-sm font-semibold text-white leading-snug">
                {item.claim}
              </h4>

              <div className="bg-[#0B2235] p-3 rounded-lg border border-[#1B3B59] text-xs font-mono grid sm:grid-cols-2 gap-2 text-[#9CB0C0]">
                <div>
                  <span className="text-[10px] uppercase text-[#9CB0C0]/70 block">Publication</span>
                  <strong className="text-white">{item.sourceTitle}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#9CB0C0]/70 block">Authority / Publisher</span>
                  <span className="text-white">{item.publisher}</span>
                </div>
              </div>

              <p className="text-xs text-[#9CB0C0] font-sans italic">
                Educational Note: {item.educationalNote}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Disclaimer */}
        <div className="px-6 py-3 bg-[#0B2235] border-t border-[#1B3B59] text-[11px] text-[#9CB0C0] leading-relaxed">
          <strong>Academic Caveat:</strong> This is a fictional shipment built from real logistics processes and published infrastructure, schedule and regulatory sources. Dates, companies, cargo values, costs and event outcomes are illustrative unless marked Verified.
        </div>

      </div>
    </div>
  );
};
