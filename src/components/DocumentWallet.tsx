import React, { useState } from 'react';
import { DOCUMENTS } from '../data/documents';
import { ShippingDocument } from '../types/journey';
import { EvidenceBadge } from './EvidenceBadge';
import { soundManager } from './AudioController';
import {
  X,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Search,
  ExternalLink,
  RefreshCw
} from 'lucide-react';

interface DocumentWalletProps {
  isOpen: boolean;
  onClose: () => void;
  activeDocIds?: string[];
  initialSelectedDocId?: string;
  onMismatchResolved?: () => void;
}

export const DocumentWallet: React.FC<DocumentWalletProps> = ({
  isOpen,
  onClose,
  activeDocIds = [],
  initialSelectedDocId,
  onMismatchResolved
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(
    initialSelectedDocId || activeDocIds[0] || DOCUMENTS[0].id
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isComparingMismatch, setIsComparingMismatch] = useState(false);
  const [mismatchFixed, setMismatchFixed] = useState(false);

  if (!isOpen) return null;

  const selectedDoc = DOCUMENTS.find((d) => d.id === selectedDocId) || DOCUMENTS[0];

  const filteredDocs = DOCUMENTS.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.shortCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFixMismatch = () => {
    soundManager.playClick(900);
    setMismatchFixed(true);
    if (onMismatchResolved) {
      onMismatchResolved();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="w-full max-w-5xl h-[88vh] bg-[#07131F] border border-[#1B3B59] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#27D3F2]/10 border border-[#27D3F2]/40 flex items-center justify-center text-[#27D3F2]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-display text-white">Document Wallet</h3>
                <span className="text-xs font-mono text-[#9CB0C0]">
                  ({DOCUMENTS.length} Legal & Commercial Instruments)
                </span>
              </div>
              <p className="text-xs text-[#9CB0C0]">
                The invisible paper & electronic trail that unlocks physical container movement.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                setIsComparingMismatch(!isComparingMismatch);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors border ${
                isComparingMismatch
                  ? 'bg-[#FFB020]/20 text-[#FFB020] border-[#FFB020]'
                  : 'bg-[#1B3B59]/40 text-[#9CB0C0] border-[#1B3B59] hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#FFB020]" />
              {isComparingMismatch ? 'Back to Wallet' : 'Compare Documents (Disruption 1)'}
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#1B3B59]/40 hover:bg-[#1B3B59] text-[#9CB0C0] hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mismatch Inspection View Mode */}
        {isComparingMismatch ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#07131F]">
            <div className="bg-[#FFB020]/10 border border-[#FFB020]/40 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFB020] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Interactive Audit: Spot the Carton Mismatch
                </span>
                <EvidenceBadge label="fictional" />
              </div>
              <p className="text-sm text-[#F4F8FB] leading-relaxed">
                At Day 2 (Bình Dương ICD), the container is physically sealed, but the export declaration is blocked. 
                Vietnam Customs and the freight forwarder detect an inconsistency between the <strong>Commercial Invoice</strong> and the <strong>Packing List</strong>.
              </p>
            </div>

            {/* Side-by-side comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Document 1: Commercial Invoice */}
              <div className="bg-[#0B2235] border border-[#1B3B59] rounded-xl p-5 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-[#1B3B59] mb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#9CB0C0]">Document A</span>
                    <h4 className="text-base font-bold text-white font-mono">Commercial Invoice</h4>
                    <span className="text-xs text-[#27D3F2] font-mono">INV-2026-8894</span>
                  </div>
                  <EvidenceBadge label="fictional" />
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-[#1B3B59]/50">
                    <span className="text-[#9CB0C0]">Seller:</span>
                    <span className="text-white">VietStride Manufacturing Co.</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1B3B59]/50">
                    <span className="text-[#9CB0C0]">Buyer:</span>
                    <span className="text-white">RhôneSport France SAS</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1B3B59]/50">
                    <span className="text-[#9CB0C0]">Item:</span>
                    <span className="text-white">12,000 Pairs Running Shoes</span>
                  </div>
                  <div className="flex justify-between py-1.5 px-2 rounded bg-[#45D6A3]/10 border border-[#45D6A3]/30">
                    <span className="text-[#45D6A3] font-semibold">Total Quantity:</span>
                    <span className="text-[#45D6A3] font-bold">600 CARTONS</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1B3B59]/50">
                    <span className="text-[#9CB0C0]">Total Amount:</span>
                    <span className="text-white font-semibold">€288,000.00 EUR</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#9CB0C0]">Terms:</span>
                    <span className="text-white">DAP Saint-Quentin-Fallavier</span>
                  </div>
                </div>
              </div>

              {/* Document 2: Packing List */}
              <div className="bg-[#0B2235] border border-[#1B3B59] rounded-xl p-5 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-[#1B3B59] mb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#9CB0C0]">Document B</span>
                    <h4 className="text-base font-bold text-white font-mono">Packing List</h4>
                    <span className="text-xs text-[#27D3F2] font-mono">PKL-240917</span>
                  </div>
                  <EvidenceBadge label="fictional" />
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-[#1B3B59]/50">
                    <span className="text-[#9CB0C0]">Packing Team:</span>
                    <span className="text-white">VietStride Warehouse Bay 3</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1B3B59]/50">
                    <span className="text-[#9CB0C0]">Pallet Count:</span>
                    <span className="text-white">20 Euro-Pallets</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1B3B59]/50">
                    <span className="text-[#9CB0C0]">Gross Mass:</span>
                    <span className="text-white">12,000 kg</span>
                  </div>

                  {/* Highlighted mismatch field */}
                  <div
                    className={`flex justify-between py-1.5 px-2 rounded border transition-all ${
                      mismatchFixed
                        ? 'bg-[#45D6A3]/10 border-[#45D6A3] text-[#45D6A3]'
                        : 'bg-[#EF5350]/20 border-[#EF5350] text-[#EF5350] animate-pulse'
                    }`}
                  >
                    <span className="font-semibold">
                      {mismatchFixed ? 'Corrected Quantity:' : 'Declared Quantity (MISMATCH):'}
                    </span>
                    <span className="font-bold">
                      {mismatchFixed ? '600 CARTONS (VERIFIED)' : '598 CARTONS ❌'}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-[#1B3B59]/50">
                    <span className="text-[#9CB0C0]">Cartons per Pallet:</span>
                    <span className="text-white">30 Cartons / Pallet</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#9CB0C0]">Discrepancy:</span>
                    <span className={mismatchFixed ? 'text-[#45D6A3]' : 'text-[#EF5350] font-bold'}>
                      {mismatchFixed ? 'Resolved: 0 Cartons' : '-2 Cartons (Clerical Typo)'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Resolution Action */}
            <div className="bg-[#0B2235] border border-[#1B3B59] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h5 className="text-sm font-semibold text-white mb-1">
                  {mismatchFixed
                    ? 'Disruption Resolved: Clearance Granted'
                    : 'Action Required: Re-count Loading Photos & Transmit Amendment'}
                </h5>
                <p className="text-xs text-[#9CB0C0]">
                  {mismatchFixed
                    ? 'Electronic packing list updated across VNACCS, carrier system, and DeltaBridge TMS. Export released after 12 hours.'
                    : 'The exporter re-verifies loading tally photos (20 pallets × 30 cartons = 600 cartons). Click to transmit corrected packing list.'}
                </p>
              </div>

              {!mismatchFixed ? (
                <button
                  type="button"
                  onClick={handleFixMismatch}
                  className="px-5 py-2.5 rounded-lg bg-[#FF6B35] hover:bg-[#E85A24] text-[#07131F] font-mono font-bold text-xs flex items-center gap-2 transition-all shadow-lg shrink-0 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  Resolve Mismatch & Transmit (+12h)
                </button>
              ) : (
                <div className="px-4 py-2 rounded-lg bg-[#45D6A3]/20 border border-[#45D6A3] text-[#45D6A3] font-mono text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Corrected (Barge load unlocked)
                </div>
              )}
            </div>

          </div>
        ) : (
          /* Standard Document Wallet List + Detail View */
          <div className="flex-1 flex overflow-hidden">
            
            {/* Left Document Sidebar */}
            <div className="w-80 border-r border-[#1B3B59] bg-[#07131F] flex flex-col">
              <div className="p-3 border-b border-[#1B3B59]">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9CB0C0]" />
                  <input
                    type="text"
                    placeholder="Filter 13 documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-[#0B2235] border border-[#1B3B59] rounded-lg text-xs font-mono text-white placeholder-[#9CB0C0]/60 focus:outline-none focus:border-[#27D3F2]"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-[#1B3B59]/40">
                {filteredDocs.map((doc) => {
                  const isSelected = doc.id === selectedDoc.id;
                  const isActiveHere = activeDocIds.includes(doc.id);

                  return (
                    <button
                      key={doc.id}
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedDocId(doc.id);
                      }}
                      className={`w-full text-left p-3.5 transition-colors flex items-start justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#1B3B59]/60 border-l-4 border-[#27D3F2]'
                          : 'hover:bg-[#0B2235]/60'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="font-mono text-xs font-bold text-white truncate">
                            {doc.name}
                          </span>
                          {isActiveHere && (
                            <span className="w-2 h-2 rounded-full bg-[#45D6A3] shrink-0" title="Active in current scene" />
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-[#9CB0C0] block truncate">
                          {doc.shortCode}
                        </span>
                      </div>
                      <EvidenceBadge label={doc.evidenceLabel} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Detailed 4-Field Document View */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#07131F]">
              
              {/* Document Banner */}
              <div className="bg-[#0B2235] border border-[#1B3B59] rounded-xl p-5 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-[#27D3F2] font-semibold uppercase">
                      {selectedDoc.shortCode}
                    </span>
                    <EvidenceBadge label={selectedDoc.evidenceLabel} />
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">
                    {selectedDoc.name}
                  </h3>
                </div>

                {selectedDoc.mismatchHighlight && (
                  <button
                    onClick={() => setIsComparingMismatch(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#FFB020]/20 hover:bg-[#FFB020]/30 text-[#FFB020] border border-[#FFB020]/50 font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Inspect Disruption 1 Mismatch
                  </button>
                )}
              </div>

              {/* The 4 Fixed Educational Fields Required by Blueprint */}
              <div className="grid md:grid-cols-2 gap-4">
                
                {/* Field 1: Created by */}
                <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#27D3F2] font-bold block mb-1">
                    1. Created By
                  </span>
                  <p className="text-sm font-medium text-white">
                    {selectedDoc.createdBy}
                  </p>
                </div>

                {/* Field 2: Used by */}
                <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#27D3F2] font-bold block mb-1">
                    2. Used By
                  </span>
                  <p className="text-sm font-medium text-white">
                    {selectedDoc.usedBy}
                  </p>
                </div>

                {/* Field 3: Contains */}
                <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4 md:col-span-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#27D3F2] font-bold block mb-1">
                    3. Essential Contents
                  </span>
                  <p className="text-xs text-[#F4F8FB] leading-relaxed">
                    {selectedDoc.contains}
                  </p>
                </div>

                {/* Field 4: Why it matters */}
                <div className="bg-[#0B2235]/60 border border-[#FF6B35]/40 rounded-xl p-4 md:col-span-2 shadow-inner">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF6B35] font-bold block mb-1">
                    4. Why It Matters in This Story
                  </span>
                  <p className="text-xs text-[#F4F8FB] leading-relaxed">
                    {selectedDoc.whyItMatters}
                  </p>
                </div>

              </div>

              {/* Sample Recorded Fields Table */}
              <div className="bg-[#0B2235]/40 border border-[#1B3B59] rounded-xl p-4">
                <span className="text-xs font-mono font-semibold text-[#9CB0C0] uppercase block mb-3">
                  Illustrative Recorded Data Payload
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {Object.entries(selectedDoc.sampleFields).map(([key, val]) => (
                    <div key={key} className="bg-[#07131F] p-2.5 rounded border border-[#1B3B59]/60">
                      <span className="text-[#9CB0C0] block text-[10px] uppercase">{key}</span>
                      <strong className="text-white">{val}</strong>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
