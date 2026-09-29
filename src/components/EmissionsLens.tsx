import React, { useState } from 'react';
import { MODE_EMISSION_RATES, SUSTAINABILITY_POLICY_NOTES, ROAD_REPLACEMENT_EMISSIONS } from '../data/sustainability';
import { EvidenceBadge } from './EvidenceBadge';
import { soundManager } from './AudioController';
import {
  Leaf,
  Plane,
  Train,
  Ship,
  Truck,
  Anchor,
  X,
  RefreshCw,
  Info,
  Sliders,
  CheckCircle2
} from 'lucide-react';

interface EmissionsLensProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmissionsLens: React.FC<EmissionsLensProps> = ({ isOpen, onClose }) => {
  const [useRoadInsteadOfRail, setUseRoadInsteadOfRail] = useState(false);

  if (!isOpen) return null;

  // Base emissions for 12 tonnes cargo
  // Rail: [64.8, 126.0] kg
  // Road replacement: [223.2, 396.0] kg
  const railEmissions: [number, number] = [64.8, 126.0];
  const roadReplacementEmissions = ROAD_REPLACEMENT_EMISSIONS;

  const baseTotal: [number, number] = [508.9, 1549.3];
  const modifiedTotal: [number, number] = [
    baseTotal[0] - railEmissions[0] + roadReplacementEmissions[0],
    baseTotal[1] - railEmissions[1] + roadReplacementEmissions[1]
  ];

  const currentTotal = useRoadInsteadOfRail ? modifiedTotal : baseTotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="w-full max-w-5xl h-[88vh] bg-[#07131F] border border-[#1B3B59] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#45D6A3]/15 border border-[#45D6A3]/40 flex items-center justify-center text-[#45D6A3]">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-display text-white">Sustainability Lens: The Carbon Scale</h3>
                <EvidenceBadge label="calculation" citationRef="13" />
              </div>
              <p className="text-xs text-[#9CB0C0]">
                Indicative operational CO2 intensity ranges—not directly interchangeable with a corporate shipment audit.
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Interactive Modal Shift Scenario Control */}
          <div className="bg-[#0B2235] border border-[#27D3F2]/40 rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#27D3F2] flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                Interactive Modal Shift Experiment: Fos-to-Lyon Inland Leg (300 km)
              </span>
              <p className="text-xs text-[#F4F8FB]">
                Compare the chosen <strong>electric freight train</strong> vs an all-road container truck scenario.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setUseRoadInsteadOfRail(false);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  !useRoadInsteadOfRail
                    ? 'bg-[#45D6A3] text-[#07131F] shadow-lg'
                    : 'bg-[#07131F] text-[#9CB0C0] border border-[#1B3B59]'
                }`}
              >
                <Train className="w-3.5 h-3.5" />
                Intermodal Rail (Chosen)
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setUseRoadInsteadOfRail(true);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  useRoadInsteadOfRail
                    ? 'bg-[#FFB020] text-[#07131F] shadow-lg'
                    : 'bg-[#07131F] text-[#9CB0C0] border border-[#1B3B59]'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                Road Trucking (Shift)
              </button>
            </div>
          </div>

          {/* Total Corridor Carbon Summary */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4 font-mono">
              <span className="text-xs text-[#9CB0C0] block">Door-to-Door Footprint</span>
              <div className="text-2xl font-bold text-white mt-1">
                {(currentTotal[0] / 1000).toFixed(2)} – {(currentTotal[1] / 1000).toFixed(2)} <span className="text-sm font-normal text-[#9CB0C0]">tCO2e</span>
              </div>
              <span className="text-[11px] text-[#45D6A3] mt-1 block">
                {currentTotal[0].toFixed(0)} to {currentTotal[1].toFixed(0)} kg CO2 for 12,000 kg cargo
              </span>
            </div>

            <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4 font-mono">
              <span className="text-xs text-[#9CB0C0] block">Inland Leg Choice (Fos–Lyon)</span>
              <div className="text-xl font-bold text-white mt-1">
                {useRoadInsteadOfRail ? (
                  <span className="text-[#FFB020]">+158 to +270 kg CO2</span>
                ) : (
                  <span className="text-[#45D6A3]">65 – 126 kg CO2</span>
                )}
              </div>
              <span className="text-[11px] text-[#9CB0C0] mt-1 block">
                {useRoadInsteadOfRail ? 'Road trucking emits 3.3× more than rail' : 'Electric freight on SNCF grid'}
              </span>
            </div>

            <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-4 font-mono">
              <span className="text-xs text-[#9CB0C0] block">Air Freight Comparison</span>
              <div className="text-xl font-bold text-[#EF5350] mt-1">
                &gt;119.7 tonnes CO2
              </div>
              <span className="text-[11px] text-[#EF5350] mt-1 block">
                ~100× more carbon intensive than ocean
              </span>
            </div>
          </div>

          {/* Mode Intensity Comparison (Logarithmic Scale visualization) */}
          <div className="bg-[#0B2235] border border-[#1B3B59] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-mono text-sm font-bold text-white">
                EEA TERM Freight Carbon Intensity Comparison (g CO2 / tonne-km)
              </h4>
              <EvidenceBadge label="verified" citationRef="11" />
            </div>

            <div className="space-y-4 pt-2">
              {/* Sea */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-white flex items-center gap-1.5">
                    <Ship className="w-3.5 h-3.5 text-[#27D3F2]" />
                    Container Ship (16,000 TEU ocean trunk)
                  </span>
                  <span className="text-[#27D3F2] font-bold">2 – 7 g CO2 / tkm</span>
                </div>
                <div className="w-full bg-[#07131F] h-3.5 rounded-full overflow-hidden border border-[#1B3B59]">
                  <div className="bg-[#27D3F2] h-full rounded-full" style={{ width: '4%' }} />
                </div>
              </div>

              {/* Inland Waterway */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-white flex items-center gap-1.5">
                    <Anchor className="w-3.5 h-3.5 text-[#45D6A3]" />
                    Inland Waterway Barge (Bình Dương–CMIT, 90 km)
                  </span>
                  <span className="text-[#45D6A3] font-bold">30 – 49 g CO2 / tkm</span>
                </div>
                <div className="w-full bg-[#07131F] h-3.5 rounded-full overflow-hidden border border-[#1B3B59]">
                  <div className="bg-[#45D6A3] h-full rounded-full" style={{ width: '12%' }} />
                </div>
              </div>

              {/* Electric Rail */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-white flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-[#9E8CFF]" />
                    Electric Freight Rail (Fos–Lyon, 300 km)
                  </span>
                  <span className="text-[#9E8CFF] font-bold">18 – 35 g CO2 / tkm</span>
                </div>
                <div className="w-full bg-[#07131F] h-3.5 rounded-full overflow-hidden border border-[#1B3B59]">
                  <div className="bg-[#9E8CFF] h-full rounded-full" style={{ width: '9%' }} />
                </div>
              </div>

              {/* Road Trucking */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-white flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#FFB020]" />
                    Heavy Goods Vehicle / Road Haul
                  </span>
                  <span className="text-[#FFB020] font-bold">62 – 110 g CO2 / tkm</span>
                </div>
                <div className="w-full bg-[#07131F] h-3.5 rounded-full overflow-hidden border border-[#1B3B59]">
                  <div className="bg-[#FFB020] h-full rounded-full" style={{ width: '24%' }} />
                </div>
              </div>

              {/* Air Cargo Counterfactual */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-white flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-[#EF5350]" />
                    Dedicated Long-Haul Air Cargo (Counterfactual)
                  </span>
                  <span className="text-[#EF5350] font-bold">665 – 1,200+ g CO2 / tkm</span>
                </div>
                <div className="w-full bg-[#07131F] h-3.5 rounded-full overflow-hidden border border-[#1B3B59]">
                  <div className="bg-gradient-to-r from-[#EF5350] to-red-600 h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#9CB0C0] font-mono italic pt-2">
              Note: The scale above is visually capped; air freight is actually 95× to 330× more carbon intensive than deep-sea container shipping.
            </p>
          </div>

          {/* Decarbonisation Framework: IMO 2030 / 2050 Strategy */}
          <div className="bg-[#0B2235]/60 border border-[#1B3B59] rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#45D6A3]" />
                IMO 2023 Strategy on Reduction of GHG Emissions from Ships
              </h4>
              <EvidenceBadge label="verified" citationRef="14" />
            </div>

            <div className="grid md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="bg-[#07131F] p-3 rounded-lg border border-[#1B3B59]">
                <strong className="text-[#27D3F2] block mb-1">2030 Milestone:</strong>
                <p className="text-[#9CB0C0] text-[11px] font-sans">
                  {SUSTAINABILITY_POLICY_NOTES.imoTarget2030} Also mandates uptake of zero or near-zero GHG emission technologies to represent at least 5% (striving for 10%) of energy used by international shipping.
                </p>
              </div>

              <div className="bg-[#07131F] p-3 rounded-lg border border-[#1B3B59]">
                <strong className="text-[#45D6A3] block mb-1">2050 Ambition:</strong>
                <p className="text-[#9CB0C0] text-[11px] font-sans">
                  {SUSTAINABILITY_POLICY_NOTES.imoTarget2050}
                </p>
              </div>
            </div>

            <p className="text-[11px] text-[#9CB0C0] leading-relaxed pt-2 border-t border-[#1B3B59]/60">
              {SUSTAINABILITY_POLICY_NOTES.methodologyCaveat}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#0B2235] border-t border-[#1B3B59] flex items-center justify-between text-xs font-mono text-[#9CB0C0]">
          <span>Cargo: 12,000 kg (12 t) · Distance: 15,870 km</span>
          <span>Source: European Environment Agency TERM Report</span>
        </div>

      </div>
    </div>
  );
};
