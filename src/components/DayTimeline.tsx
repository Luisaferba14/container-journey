import React from 'react';
import { FileText, CloudLightning, ShieldAlert } from 'lucide-react';
import { soundManager } from './AudioController';

interface DayTimelineProps {
  currentDay: number;
  totalPlannedDays: number;
  totalActualDays: number;
  onSelectDay: (day: number) => void;
  onOpenDisruption: (disruptionId: 'event-1' | 'event-2' | 'event-3') => void;
}

export const DayTimeline: React.FC<DayTimelineProps> = ({
  currentDay,
  totalPlannedDays = 44,
  totalActualDays = 47,
  onSelectDay,
  onOpenDisruption
}) => {
  const minDay = -7;
  const maxDay = 48;
  const totalSpan = maxDay - minDay;

  const getPercent = (day: number) => {
    return Math.max(0, Math.min(100, ((day - minDay) / totalSpan) * 100));
  };

  const actualProgressPercent = getPercent(currentDay);

  // Key event positions
  const event1Day = 2;   // Docs hold
  const event2Day = 15;  // Monsoon storm
  const event3Day = 44;  // Customs scan & rail rebooking

  return (
    <div className="w-full bg-[#07131F]/95 border-b border-[#1B3B59]/60 px-4 py-1.5 select-none flex items-center justify-between gap-4 h-9">
      
      {/* Current Day Label */}
      <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
        <span className="font-bold text-[#FF6B35]">
          {currentDay < 0 ? `DAY ${currentDay}` : currentDay === 0 ? 'DAY 0' : `DAY ${currentDay}`}
        </span>
        <span className="text-[#9CB0C0]/60 text-[11px]">/ 47</span>
      </div>

      {/* Slim Integrated Dual Bar Scrubber */}
      <div className="flex-1 max-w-2xl relative h-2.5 bg-[#0B2235] rounded-full border border-[#1B3B59]/60 flex items-center">
        
        {/* Planned Path Fill (Cyan, Clamped at 44d) */}
        <div
          className="absolute top-0.5 left-0.5 bottom-0.5 bg-[#27D3F2]/30 rounded-full transition-all duration-200 pointer-events-none"
          style={{ width: `${getPercent(Math.min(currentDay, totalPlannedDays))}%` }}
        />

        {/* Actual Progress Fill (Amber) */}
        <div
          className="absolute top-0.5 left-0.5 bottom-0.5 bg-gradient-to-r from-[#27D3F2] to-[#FFB020] rounded-full transition-all duration-200 pointer-events-none"
          style={{ width: `${actualProgressPercent}%` }}
        />

        {/* Discrete Disruption Dots (Clickable) */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onOpenDisruption('event-1');
          }}
          title="Disruption 1: Document Mismatch (+0.5d)"
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-3 h-3 rounded-full bg-[#FFB020] border border-[#07131F] hover:scale-150 transition-transform cursor-pointer"
          style={{ left: `${getPercent(event1Day)}%` }}
        />

        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onOpenDisruption('event-2');
          }}
          title="Disruption 2: Monsoon Swell (+1.5d)"
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-3 h-3 rounded-full bg-[#FFB020] border border-[#07131F] hover:scale-150 transition-transform cursor-pointer"
          style={{ left: `${getPercent(event2Day)}%` }}
        />

        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onOpenDisruption('event-3');
          }}
          title="Disruption 3: Customs Scan (+1.0d)"
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-3 h-3 rounded-full bg-[#FFB020] border border-[#07131F] hover:scale-150 transition-transform cursor-pointer"
          style={{ left: `${getPercent(event3Day)}%` }}
        />

        {/* Current Position Pin */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-3.5 h-3.5 rounded-full bg-[#FF6B35] border-2 border-white shadow-sm pointer-events-none transition-all duration-150"
          style={{ left: `${actualProgressPercent}%` }}
        />

        {/* Drag / Scrub Range Input */}
        <input
          type="range"
          min={minDay}
          max={maxDay}
          value={currentDay}
          onChange={(e) => {
            soundManager.playClick(400);
            onSelectDay(Number(e.target.value));
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
          aria-label="Timeline scrubber"
        />
      </div>

      {/* Variance Badge */}
      <div className="hidden sm:flex items-center gap-1.5 shrink-0 font-mono text-[11px] text-[#9CB0C0]">
        <span>Variance:</span>
        <span className="text-[#FFB020] font-semibold">+3.0d</span>
      </div>

    </div>
  );
};
