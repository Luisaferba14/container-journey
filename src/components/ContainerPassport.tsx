import React, { useState } from 'react';
import { JourneyStage } from '../types/journey';
import { EvidenceBadge } from './EvidenceBadge';
import { soundManager } from './AudioController';
import {
  X,
  Box,
  Scale,
  Shield,
  FileCheck,
  CheckCircle,
  Truck,
  RotateCcw,
  Maximize2,
  Lock,
  Unlock,
  ChevronRight,
  TrendingUp,
  Leaf
} from 'lucide-react';

interface ContainerPassportProps {
  stage: JourneyStage;
  isOpen: boolean;
  onClose: () => void;
  onOpenDocuments: () => void;
}

export const ContainerPassport: React.FC<ContainerPassportProps> = ({
  stage,
  isOpen,
  onClose,
  onOpenDocuments
}) => {
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'cargo' | 'csc' | 'status'>('specs');

  if (!isOpen) return null;

  const handleToggleDoors = () => {
    soundManager.playTwistLock();
    setDoorsOpen(!doorsOpen);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="w-full max-w-2xl bg-[#07131F] border-l border-[#1B3B59] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/20 border border-[#FF6B35] flex items-center justify-center text-[#FF6B35]">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xl font-bold tracking-wider text-white">
                  KEDU 240917 4
                </span>
                <EvidenceBadge label="fictional" citationRef="5" />
              </div>
              <p className="text-xs text-[#9CB0C0] font-mono">
                40ft High Cube General-Purpose Dry Container (ISO 45G1)
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

        {/* Tab Navigation */}
        <div className="flex border-b border-[#1B3B59] bg-[#07131F] px-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-3 px-4 font-mono text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'specs'
                ? 'border-[#FF6B35] text-[#FF6B35]'
                : 'border-transparent text-[#9CB0C0] hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            Equipment & Cutaway
          </button>
          <button
            onClick={() => setActiveTab('cargo')}
            className={`py-3 px-4 font-mono text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'cargo'
                ? 'border-[#FF6B35] text-[#FF6B35]'
                : 'border-transparent text-[#9CB0C0] hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Cargo & VGM (15.9 t)
          </button>
          <button
            onClick={() => setActiveTab('csc')}
            className={`py-3 px-4 font-mono text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'csc'
                ? 'border-[#FF6B35] text-[#FF6B35]'
                : 'border-transparent text-[#9CB0C0] hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            CSC Plate & Seal
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`py-3 px-4 font-mono text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'status'
                ? 'border-[#FF6B35] text-[#FF6B35]'
                : 'border-transparent text-[#9CB0C0] hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            Live Custody & ETA
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Interactive 2.5D Container Visual representation */}
          <div className="bg-[#0B2235] border border-[#1B3B59] rounded-xl p-6 relative overflow-hidden shadow-inner">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#9CB0C0]">
                Interactive 2.5D Cutaway View
              </span>
              <button
                type="button"
                onClick={handleToggleDoors}
                className="px-3 py-1 rounded bg-[#FF6B35]/20 hover:bg-[#FF6B35]/30 text-[#FF6B35] border border-[#FF6B35]/50 text-xs font-mono font-medium flex items-center gap-1.5 transition-all"
              >
                {doorsOpen ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                {doorsOpen ? 'Close Doors' : 'Open Doors (Inspect Cargo)'}
              </button>
            </div>

            {/* Visual SVG Container Illustration */}
            <div className="relative h-48 w-full flex items-center justify-center">
              <svg viewBox="0 0 540 180" className="w-full h-full max-h-48 drop-shadow-2xl">
                <defs>
                  <linearGradient id="containerGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FF7A45" />
                    <stop offset="50%" stopColor="#FF6B35" />
                    <stop offset="100%" stopColor="#D94814" />
                  </linearGradient>
                  <pattern id="corrugation" width="16" height="100" patternUnits="userSpaceOnUse">
                    <rect width="8" height="100" fill="#E85A24" fillOpacity="0.4" />
                    <rect x="8" width="8" height="100" fill="#B3380B" fillOpacity="0.6" />
                  </pattern>
                  <pattern id="palletsPattern" width="24" height="24" patternUnits="userSpaceOnUse">
                    <rect width="22" height="22" rx="2" fill="#F2C66D" fillOpacity="0.85" />
                    <path d="M2,11 L20,11 M11,2 L11,20" stroke="#8A6B29" strokeWidth="1.5" />
                  </pattern>
                </defs>

                {/* Container Body Side */}
                <rect x="30" y="30" width="380" height="110" rx="4" fill="url(#containerGrad)" />
                {/* Corrugated ribs */}
                <rect x="30" y="30" width="380" height="110" fill="url(#corrugation)" />

                {/* ISO Corner Castings */}
                <rect x="25" y="25" width="16" height="16" rx="2" fill="#525F6B" stroke="#07131F" strokeWidth="2" />
                <rect x="25" y="129" width="16" height="16" rx="2" fill="#525F6B" stroke="#07131F" strokeWidth="2" />
                <rect x="399" y="25" width="16" height="16" rx="2" fill="#525F6B" stroke="#07131F" strokeWidth="2" />
                <rect x="399" y="129" width="16" height="16" rx="2" fill="#525F6B" stroke="#07131F" strokeWidth="2" />

                {/* Markings on Side */}
                <text x="50" y="60" fontFamily="IBM Plex Mono" fontSize="15" fontWeight="bold" fill="#07131F" letterSpacing="2">
                  KEDU 240917 4
                </text>
                <text x="50" y="76" fontFamily="IBM Plex Mono" fontSize="10" fontWeight="600" fill="#07131F">
                  45G1 · 40' HIGH CUBE
                </text>
                <text x="50" y="105" fontFamily="IBM Plex Mono" fontSize="8" fill="#07131F">
                  MAX GROSS: 32,500 KG / 71,650 LB
                </text>
                <text x="50" y="117" fontFamily="IBM Plex Mono" fontSize="8" fill="#07131F">
                  TARE: 3,900 KG / 8,598 LB
                </text>
                <text x="50" y="129" fontFamily="IBM Plex Mono" fontSize="8" fill="#07131F">
                  NET / PAYLOAD: 28,600 KG
                </text>

                {/* CSC Safety plate miniature */}
                <rect x="340" y="55" width="48" height="32" rx="1" fill="#E1E6EB" stroke="#1B3B59" strokeWidth="1" />
                <text x="345" y="66" fontFamily="IBM Plex Mono" fontSize="5" fontWeight="bold" fill="#07131F">CSC APPROVAL</text>
                <text x="345" y="74" fontFamily="IBM Plex Mono" fontSize="4" fill="#07131F">BV-VN-8849-26</text>
                <text x="345" y="82" fontFamily="IBM Plex Mono" fontSize="4" fill="#07131F">KEDU 240917 4</text>

                {/* Right Doors Section (or Cutaway Pallets Interior) */}
                {doorsOpen ? (
                  <g className="transition-all duration-500">
                    {/* Interior Hollow */}
                    <rect x="410" y="32" width="105" height="106" rx="2" fill="#07131F" stroke="#27D3F2" strokeWidth="1.5" />
                    {/* Pallets grid visible inside */}
                    <rect x="415" y="40" width="95" height="90" fill="url(#palletsPattern)" />
                    <text x="420" y="125" fontFamily="IBM Plex Mono" fontSize="8" fontWeight="bold" fill="#27D3F2">
                      20 PALLETS
                    </text>
                    {/* Air dunnage pillows */}
                    <rect x="500" y="45" width="8" height="80" rx="3" fill="#27D3F2" fillOpacity="0.8" />
                  </g>
                ) : (
                  <g>
                    {/* Closed rear doors with vertical locking bars */}
                    <rect x="410" y="30" width="105" height="110" rx="3" fill="#E85A24" stroke="#B3380B" strokeWidth="2" />
                    {/* 4 Vertical Lock Bars */}
                    <line x1="430" y1="28" x2="430" y2="142" stroke="#525F6B" strokeWidth="4" />
                    <line x1="445" y1="28" x2="445" y2="142" stroke="#525F6B" strokeWidth="4" />
                    <line x1="475" y1="28" x2="475" y2="142" stroke="#525F6B" strokeWidth="4" />
                    <line x1="490" y1="28" x2="490" y2="142" stroke="#525F6B" strokeWidth="4" />
                    {/* High Security Seal */}
                    <circle cx="460" cy="85" r="7" fill="#45D6A3" stroke="#07131F" strokeWidth="2" />
                    <text x="460" y="88" fontFamily="IBM Plex Mono" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#07131F">
                      S
                    </text>
                    <text x="460" y="105" fontFamily="IBM Plex Mono" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#F4F8FB">
                      VN847291
                    </text>
                  </g>
                )}
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#9CB0C0] mt-2 pt-2 border-t border-[#1B3B59]/60">
              <span>Status: <strong className="text-[#FF6B35]">{stage.status}</strong></span>
              <span>Tare: <strong>3,900 kg</strong></span>
              <span>Cargo: <strong>12,000 kg</strong></span>
              <span>VGM: <strong className="text-[#27D3F2]">15,900 kg</strong></span>
            </div>
          </div>

          {/* TAB 1: EQUIPMENT SPECIFICATIONS */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4">
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center justify-between">
                  <span>ISO 6346 Identity Structure</span>
                  <EvidenceBadge label="verified" citationRef="5" />
                </h4>
                <div className="grid grid-cols-4 gap-2 text-center font-mono">
                  <div className="bg-[#07131F] p-2.5 rounded-lg border border-[#1B3B59]">
                    <span className="text-xs text-[#9CB0C0] block">Owner / Prefix</span>
                    <span className="text-sm font-bold text-[#FF6B35]">KED</span>
                    <span className="text-[10px] text-[#9CB0C0] block mt-1">Project Code</span>
                  </div>
                  <div className="bg-[#07131F] p-2.5 rounded-lg border border-[#1B3B59]">
                    <span className="text-xs text-[#9CB0C0] block">Category</span>
                    <span className="text-sm font-bold text-[#27D3F2]">U</span>
                    <span className="text-[10px] text-[#9CB0C0] block mt-1">Freight Container</span>
                  </div>
                  <div className="bg-[#07131F] p-2.5 rounded-lg border border-[#1B3B59]">
                    <span className="text-xs text-[#9CB0C0] block">Serial Number</span>
                    <span className="text-sm font-bold text-white">240917</span>
                    <span className="text-[10px] text-[#9CB0C0] block mt-1">6-digit unit</span>
                  </div>
                  <div className="bg-[#07131F] p-2.5 rounded-lg border border-[#1B3B59]">
                    <span className="text-xs text-[#9CB0C0] block">Check Digit</span>
                    <span className="text-sm font-bold text-[#45D6A3]">4</span>
                    <span className="text-[10px] text-[#9CB0C0] block mt-1">Mod-11 Algorithm</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4">
                  <span className="text-xs text-[#9CB0C0] font-mono block">External Dimensions</span>
                  <p className="text-sm font-bold text-white mt-1">
                    12.19 m × 2.44 m × 2.90 m
                  </p>
                  <span className="text-[11px] text-[#9CB0C0] block mt-0.5">
                    (40ft L × 8ft W × 9ft 6in H)
                  </span>
                  <div className="mt-3">
                    <EvidenceBadge label="verified" citationRef="3" />
                  </div>
                </div>

                <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4">
                  <span className="text-xs text-[#9CB0C0] font-mono block">Internal Volume</span>
                  <p className="text-sm font-bold text-white mt-1">
                    76.4 m³ (approx 2,700 cu ft)
                  </p>
                  <span className="text-[11px] text-[#9CB0C0] block mt-0.5">
                    Footwear cube utilisation: ~78%
                  </span>
                  <div className="mt-3">
                    <EvidenceBadge label="verified" citationRef="3" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CARGO & SOLAS VGM */}
          {activeTab === 'cargo' && (
            <div className="space-y-4">
              <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-white">Cargo Profile: Vietnamese Running Shoes</h4>
                  <EvidenceBadge label="fictional" citationRef="15" />
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm font-mono">
                  <div className="bg-[#07131F] p-3 rounded-lg border border-[#1B3B59]">
                    <span className="text-xs text-[#9CB0C0] block">Finished Goods</span>
                    <strong className="text-white text-base">12,000 Pairs</strong>
                    <span className="text-[11px] text-[#9CB0C0] block mt-1">Athletic footwear</span>
                  </div>
                  <div className="bg-[#07131F] p-3 rounded-lg border border-[#1B3B59]">
                    <span className="text-xs text-[#9CB0C0] block">Packaging</span>
                    <strong className="text-[#FF6B35] text-base">600 Cartons</strong>
                    <span className="text-[11px] text-[#9CB0C0] block mt-1">20 pairs / carton</span>
                  </div>
                  <div className="bg-[#07131F] p-3 rounded-lg border border-[#1B3B59]">
                    <span className="text-xs text-[#9CB0C0] block">Unitisation</span>
                    <strong className="text-[#F2C66D] text-base">20 Euro-Pallets</strong>
                    <span className="text-[11px] text-[#9CB0C0] block mt-1">30 cartons / pallet</span>
                  </div>
                </div>
              </div>

              {/* VGM Solas Calculation Card */}
              <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#27D3F2]" />
                    SOLAS Verified Gross Mass (VGM)
                  </h4>
                  <EvidenceBadge label="verified" citationRef="7" />
                </div>
                <p className="text-xs text-[#9CB0C0] mb-3">
                  Under IMO SOLAS Chapter VI, packed containers cannot be loaded without a certified VGM. VietStride used <strong>Method 2 (Summation)</strong>:
                </p>
                <div className="bg-[#07131F] p-3 rounded-lg border border-[#1B3B59] font-mono text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#9CB0C0]">Tare mass of 40HC container:</span>
                    <span className="text-white font-semibold">3,900 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9CB0C0]">Shoe cartons mass (600 × 18 kg):</span>
                    <span className="text-white font-semibold">10,800 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9CB0C0]">20 Wooden Pallets (20 × 25 kg):</span>
                    <span className="text-white font-semibold">500 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9CB0C0]">Securing materials, dunnage & wrap:</span>
                    <span className="text-white font-semibold">700 kg</span>
                  </div>
                  <div className="pt-2 border-t border-[#1B3B59] flex justify-between text-sm">
                    <span className="text-[#27D3F2] font-bold">TOTAL VERIFIED GROSS MASS:</span>
                    <span className="text-[#27D3F2] font-bold">15,900 KG (15.9 TONNES)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CSC & BOLT SEAL */}
          {activeTab === 'csc' && (
            <div className="space-y-4">
              <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white">CSC Safety Approval Plate</h4>
                  <EvidenceBadge label="verified" citationRef="11" />
                </div>
                <p className="text-xs text-[#9CB0C0] mb-3">
                  International Convention for Safe Containers (CSC 1972). Every freight container must display an approved stainless steel plate recording safety parameters.
                </p>
                <div className="bg-[#07131F] border border-[#1B3B59] p-3 rounded-lg font-mono text-xs grid grid-cols-2 gap-2 text-[#9CB0C0]">
                  <div>Country of Approval: <strong className="text-white">VN / BV</strong></div>
                  <div>Approval Ref: <strong className="text-white">BV-26-8891-CSC</strong></div>
                  <div>Date of Manufacture: <strong className="text-white">04/2022</strong></div>
                  <div>Identification No: <strong className="text-white">KEDU 240917 4</strong></div>
                  <div>Max Operating Gross: <strong className="text-white">32,500 kg</strong></div>
                  <div>Allowable Stacking (1.8g): <strong className="text-white">216,000 kg</strong></div>
                  <div>Transverse Racking Test: <strong className="text-white">150 kN</strong></div>
                  <div>Wall Strength: <strong className="text-white">0.4P / 0.6P</strong></div>
                </div>
              </div>

              <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white">High-Security Bolt Seal (ISO 17712)</h4>
                  <EvidenceBadge label="fictional" citationRef="5" />
                </div>
                <div className="flex items-center gap-4 bg-[#07131F] p-3 rounded-lg border border-[#1B3B59]">
                  <div className="w-12 h-12 rounded-full bg-[#45D6A3]/20 border border-[#45D6A3] flex items-center justify-center text-[#45D6A3] shrink-0 font-mono font-bold text-lg">
                    H
                  </div>
                  <div>
                    <span className="font-mono text-sm font-bold text-white block">Seal Number: VN847291</span>
                    <p className="text-xs text-[#9CB0C0] mt-0.5">
                      Applied at VietStride factory on 12 Oct 2026. Verified intact at Cai Mep CMIT, Eurofos customs control, and finally broken by receiving warehouse manager in Saint-Quentin-Fallavier on 28 Nov 2026.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LIVE STATUS & CUSTODY */}
          {activeTab === 'status' && (
            <div className="space-y-4">
              <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4">
                <span className="text-xs text-[#9CB0C0] font-mono block">Current Waypoint & Custodian</span>
                <div className="flex items-center justify-between mt-1">
                  <strong className="text-lg text-white font-mono">{stage.location}</strong>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/40">
                    {stage.status}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-[#1B3B59]">
                  <div>
                    <span className="text-[#9CB0C0] block">Physical Custodian:</span>
                    <span className="text-white font-semibold">{stage.currentCustodian}</span>
                  </div>
                  <div>
                    <span className="text-[#9CB0C0] block">Responsible Lead:</span>
                    <span className="text-[#27D3F2] font-semibold">{stage.responsibleLead}</span>
                  </div>
                </div>
              </div>

              {/* Progress & ETA */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4 font-mono">
                  <span className="text-xs text-[#9CB0C0] block">Original Plan Fos ETA</span>
                  <span className="text-sm font-bold text-[#27D3F2] mt-1 block">22 Nov 2026 (Day 40)</span>
                  <span className="text-[11px] text-[#9CB0C0] mt-2 block">DAP Delivery: 26 Nov</span>
                </div>
                <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4 font-mono">
                  <span className="text-xs text-[#9CB0C0] block">Actual Fos Arrival</span>
                  <span className="text-sm font-bold text-[#FFB020] mt-1 block">24 Nov 2026 (Day 42)</span>
                  <span className="text-[11px] text-[#FFB020] mt-2 block">DAP Delivery: 28 Nov (+3d)</span>
                </div>
              </div>

              {/* Financial & Environmental to date */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#9CB0C0] font-mono">
                    <TrendingUp className="w-3.5 h-3.5 text-[#27D3F2]" />
                    Accumulated Logistics Cost
                  </div>
                  <span className="text-lg font-mono font-bold text-white mt-1 block">
                    €{stage.costToDate.toLocaleString()} / €6,850
                  </span>
                </div>
                <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#9CB0C0] font-mono">
                    <Leaf className="w-3.5 h-3.5 text-[#45D6A3]" />
                    Estimated CO2 to Date
                  </div>
                  <span className="text-lg font-mono font-bold text-[#45D6A3] mt-1 block">
                    {stage.emissionsRangeKgCO2[0].toFixed(0)}–{stage.emissionsRangeKgCO2[1].toFixed(0)} kg CO2
                  </span>
                </div>
              </div>

              {/* Unlock dependency */}
              <div className="bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-xl p-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF6B35] font-bold block mb-1">
                  What Must Become True Before Moving Again:
                </span>
                <p className="text-xs text-[#F4F8FB] leading-relaxed">
                  {stage.unlockDependency}
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#0B2235] border-t border-[#1B3B59] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenDocuments();
            }}
            className="text-xs font-mono text-[#27D3F2] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            View Active Documents ({stage.documentIds.length})
          </button>

          <span className="text-[11px] text-[#9CB0C0] font-mono">
            Location: {stage.coordinates[0].toFixed(2)}°E, {stage.coordinates[1].toFixed(2)}°N
          </span>
        </div>

      </div>
    </div>
  );
};
