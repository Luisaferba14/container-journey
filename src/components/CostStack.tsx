import React, { useState } from 'react';
import { COST_ITEMS, TOTAL_LOGISTICS_COST, DELAY_COST_FACTORS } from '../data/costs';
import { EvidenceBadge } from './EvidenceBadge';
import { soundManager } from './AudioController';
import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  Clock,
  Layers,
  HelpCircle,
  X,
  FileCheck2,
  Info
} from 'lucide-react';

interface CostStackProps {
  isOpen: boolean;
  onClose: () => void;
  currentCostToDate?: number;
}

export const CostStack: React.FC<CostStackProps> = ({
  isOpen,
  onClose,
  currentCostToDate = TOTAL_LOGISTICS_COST
}) => {
  const [activeTab, setActiveTab] = useState<'stack' | 'delays'>('stack');
  const [selectedCostId, setSelectedCostId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="w-full max-w-4xl h-[88vh] bg-[#07131F] border border-[#1B3B59] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#45D6A3]/10 border border-[#45D6A3]/40 flex items-center justify-center text-[#45D6A3]">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-display text-white">Economics & Cost Stack</h3>
                <EvidenceBadge label="calculation" citationRef="12" />
              </div>
              <p className="text-xs text-[#9CB0C0]">
                Illustrative €6,850 door-to-door corridor logistics scenario (excluding duties & taxes).
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

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#1B3B59] bg-[#07131F] px-6">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('stack');
            }}
            className={`py-3 px-4 font-mono text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'stack'
                ? 'border-[#45D6A3] text-[#45D6A3]'
                : 'border-transparent text-[#9CB0C0] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Vertical Cost Stack (€6,850 Total)
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('delays');
            }}
            className={`py-3 px-4 font-mono text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'delays'
                ? 'border-[#FFB020] text-[#FFB020]'
                : 'border-transparent text-[#9CB0C0] hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            What Delay Costs (Demurrage & Exposure)
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {activeTab === 'stack' ? (
            <div className="grid md:grid-cols-12 gap-6">
              
              {/* Left: Animated Vertical Cost Stack */}
              <div className="md:col-span-5 bg-[#0B2235] border border-[#1B3B59] rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono uppercase text-[#9CB0C0] tracking-widest">
                      Total Logistics Breakdown
                    </span>
                    <span className="text-xl font-mono font-bold text-[#45D6A3]">
                      €{TOTAL_LOGISTICS_COST.toLocaleString()}
                    </span>
                  </div>

                  {/* Vertical bar stack */}
                  <div className="w-full h-80 rounded-xl overflow-hidden flex flex-col-reverse border border-[#1B3B59] shadow-inner bg-[#07131F]">
                    {COST_ITEMS.map((item) => {
                      const isHovered = selectedCostId === item.id;
                      const colors: Record<string, string> = {
                        'cost-ocean': 'bg-[#27D3F2]',
                        'cost-dest-terminal': 'bg-[#45D6A3]',
                        'cost-rail': 'bg-[#9E8CFF]',
                        'cost-origin-terminal': 'bg-[#F2C66D]',
                        'cost-final-truck': 'bg-[#FF9E6D]',
                        'cost-origin-inland': 'bg-[#FF6B35]',
                        'cost-insurance': 'bg-[#70D7FF]',
                        'cost-customs-rep': 'bg-[#C4B5FD]',
                        'cost-unloading': 'bg-[#FCA5A5]'
                      };

                      return (
                        <div
                          key={item.id}
                          onMouseEnter={() => setSelectedCostId(item.id)}
                          onMouseLeave={() => setSelectedCostId(null)}
                          onClick={() => setSelectedCostId(item.id)}
                          style={{ height: `${item.percentage}%` }}
                          className={`w-full transition-all cursor-pointer relative group ${colors[item.id] || 'bg-cyan-500'} ${
                            isHovered ? 'brightness-125 saturate-150' : 'opacity-90 hover:opacity-100'
                          }`}
                        >
                          <div className="absolute inset-0 flex items-center justify-between px-3 text-[10px] font-mono font-bold text-[#07131F] opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>{item.category.split(' ')[0]}</span>
                            <span>€{item.amount} ({item.percentage}%)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1B3B59]/60 text-center font-mono text-xs text-[#9CB0C0]">
                  Click or hover any segment to inspect details.
                </div>
              </div>

              {/* Right: Detailed Cost Cards & Legal Exclusions */}
              <div className="md:col-span-7 space-y-3">
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {COST_ITEMS.map((item) => {
                    const isSelected = selectedCostId === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedCostId(item.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1B3B59]/80 border-[#27D3F2] shadow-lg'
                            : 'bg-[#0B2235]/60 border-[#1B3B59] hover:bg-[#0B2235]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs font-bold text-white">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-[#45D6A3]">
                              €{item.amount}
                            </span>
                            <span className="text-[11px] font-mono text-[#9CB0C0]">
                              ({item.percentage}%)
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-[#9CB0C0] leading-relaxed">
                          {item.description}
                        </p>
                        <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-[#9CB0C0]/80">
                          <span>Bearer: {item.costBearer}</span>
                          <EvidenceBadge label="calculation" inline />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Statutory Exclusion Notice */}
                <div className="bg-[#0B2235] border border-[#27D3F2]/40 rounded-xl p-4 font-mono text-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#27D3F2] font-bold">
                    <Info className="w-4 h-4 shrink-0" />
                    Statutory Boundary Caveat (Customs Duty & Import VAT)
                  </div>
                  <p className="text-[#9CB0C0] text-[11px] leading-relaxed font-sans">
                    <strong>Customs Duty:</strong> Requires validated 10-digit HS code, exact shoe construction (leather vs textile vs rubber sole), EVFTA origin proof validity, and import date. Never assume tariff without laboratory product validation.
                  </p>
                  <p className="text-[#9CB0C0] text-[11px] leading-relaxed font-sans">
                    <strong>Import VAT (TVA):</strong> In France, French VAT-registered importers account for import VAT on monthly returns (Autoliquidation - Art. 293 A CGI) using data from customs operations, making it neutral to cash-flow at the quay. It is deliberately excluded from the logistics transport total.
                  </p>
                </div>
              </div>

            </div>
          ) : (
            /* TAB 2: WHAT DELAY COSTS */
            <div className="space-y-4">
              <div className="bg-[#FFB020]/10 border border-[#FFB020]/40 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#FFB020]" />
                    Exposure vs Invoice: How Supply Chain Delays Cost Money
                  </h4>
                  <EvidenceBadge label="calculation" />
                </div>
                <p className="text-xs text-[#F4F8FB] leading-relaxed">
                  In this 47-day journey, physical transport freight rates were largely fixed under contract. However, delays generate massive exposure to ancillary penalties and working capital drag.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {DELAY_COST_FACTORS.map((factor, idx) => (
                  <div key={idx} className="bg-[#0B2235] border border-[#1B3B59] rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-mono text-xs font-bold text-white">{factor.title}</h5>
                      <span className="text-[10px] font-mono text-[#FFB020] bg-[#FFB020]/10 px-2 py-0.5 rounded border border-[#FFB020]/30">
                        {factor.triggerCondition}
                      </span>
                    </div>
                    <div className="text-xs font-mono font-bold text-[#27D3F2]">
                      Rate Exposure: {factor.rate}
                    </div>
                    <p className="text-xs text-[#9CB0C0] leading-relaxed">
                      {factor.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4 font-mono text-xs">
                <span className="text-white font-semibold block mb-1">
                  Working Capital Reality on €288,000 of Running Shoes:
                </span>
                <p className="text-[#9CB0C0] text-[11px] leading-relaxed font-sans">
                  Three days of delay (+3d) does not double the carrier invoice. But 12,000 pairs of shoes arriving late can cause missed promotional launch dates, stockouts at regional stores, and additional safety stock requirements across European fulfillment hubs.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#0B2235] border-t border-[#1B3B59] flex items-center justify-between text-xs font-mono text-[#9CB0C0]">
          <span>Current Leg Cost to Date: <strong className="text-white">€{currentCostToDate.toLocaleString()}</strong></span>
          <span className="italic">Drewry Asia–Med benchmark referenced for classroom context.</span>
        </div>

      </div>
    </div>
  );
};
