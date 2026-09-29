import React, { useState } from 'react';
import { JourneyStage } from '../types/journey';
import { soundManager } from './AudioController';
import {
  Volume2,
  VolumeX,
  BookOpen,
  Box,
  FileText,
  Users,
  DollarSign,
  Leaf,
  Anchor,
  Play,
  Eye,
  ChevronDown
} from 'lucide-react';

interface TopHUDProps {
  currentStage: JourneyStage;
  currentDay: number;
  totalStages: number;
  mode: 'tour' | 'explore';
  onToggleMode: () => void;
  onOpenPassport: () => void;
  onOpenDocuments: () => void;
  onOpenActors: () => void;
  onOpenCosts: () => void;
  onOpenEmissions: () => void;
  onOpenPort: () => void;
  onOpenSources: () => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({
  currentStage,
  currentDay,
  totalStages,
  mode,
  onToggleMode,
  onOpenPassport,
  onOpenDocuments,
  onOpenActors,
  onOpenCosts,
  onOpenEmissions,
  onOpenPort,
  onOpenSources
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showLensesMenu, setShowLensesMenu] = useState(false);

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="w-full bg-[#07131F] border-b border-[#1B3B59]/60 px-4 py-2 flex items-center justify-between select-none z-30 relative h-13">
      
      {/* Left: Wordmark & Stage Navigation Indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#FF6B35] flex items-center justify-center font-mono font-bold text-xs text-[#07131F] shadow-md">
            917
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-sm tracking-tight text-white">
                BOX 917
              </span>
              <span className="text-[10px] font-mono text-[#9CB0C0]">
                · KEDU 240917 4
              </span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[#1B3B59]/60">
          <span className="px-2 py-0.5 rounded bg-[#0B2235] text-[10px] font-mono font-semibold text-[#27D3F2] border border-[#1B3B59]">
            {currentStage.stageNumber}/{totalStages}
          </span>
          <span className="text-xs font-medium text-white max-w-[220px] md:max-w-xs truncate">
            {currentStage.title}
          </span>
        </div>
      </div>

      {/* Center: Clean Progress Pill */}
      <div className="hidden md:flex items-center gap-3 bg-[#0B2235]/60 px-3 py-1 rounded-full border border-[#1B3B59]/50 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#27D3F2]" />
          <span className="text-[#27D3F2]">Plan: 44d</span>
        </div>
        <span className="text-[#9CB0C0]/40">|</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FFB020]" />
          <span className="text-[#FFB020]">Actual: 47d (+3d)</span>
        </div>
      </div>

      {/* Right: Actions (Clean Dropdown, Passport, Sound, Sources) */}
      <div className="flex items-center gap-2">
        
        {/* Lenses / Deep Dive Dropdown Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowLensesMenu(!showLensesMenu)}
            className="px-2.5 py-1.5 rounded-lg bg-[#0B2235] hover:bg-[#1B3B59] text-xs font-mono text-[#9CB0C0] hover:text-white border border-[#1B3B59] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Dossiers & Lenses</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#9CB0C0]" />
          </button>

          {showLensesMenu && (
            <div
              className="absolute right-0 mt-2 w-52 bg-[#0B2235] border border-[#1B3B59] rounded-xl shadow-2xl py-1.5 z-50 text-xs font-mono animate-in fade-in zoom-in-95 duration-150"
              onMouseLeave={() => setShowLensesMenu(false)}
            >
              <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#9CB0C0]/60 tracking-wider">
                Corridor Dimensions
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowLensesMenu(false);
                  onOpenDocuments();
                }}
                className="w-full px-3 py-2 text-left hover:bg-[#1B3B59]/50 text-white flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#27D3F2]" />
                <span>Documents Wallet (13)</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowLensesMenu(false);
                  onOpenActors();
                }}
                className="w-full px-3 py-2 text-left hover:bg-[#1B3B59]/50 text-white flex items-center gap-2 cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>People & Custody (17)</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowLensesMenu(false);
                  onOpenCosts();
                }}
                className="w-full px-3 py-2 text-left hover:bg-[#1B3B59]/50 text-white flex items-center gap-2 cursor-pointer"
              >
                <DollarSign className="w-3.5 h-3.5 text-[#45D6A3]" />
                <span>Economics (€6,850)</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowLensesMenu(false);
                  onOpenEmissions();
                }}
                className="w-full px-3 py-2 text-left hover:bg-[#1B3B59]/50 text-white flex items-center gap-2 cursor-pointer"
              >
                <Leaf className="w-3.5 h-3.5 text-[#45D6A3]" />
                <span>Carbon & Modal Shift</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowLensesMenu(false);
                  onOpenPort();
                }}
                className="w-full px-3 py-2 text-left hover:bg-[#1B3B59]/50 text-white flex items-center gap-2 cursor-pointer"
              >
                <Anchor className="w-3.5 h-3.5 text-[#27D3F2]" />
                <span>Port Terminal Simulation</span>
              </button>
            </div>
          )}
        </div>

        {/* Passport Trigger */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onOpenPassport();
          }}
          className="px-2.5 py-1.5 rounded-lg bg-[#FF6B35] hover:bg-[#E85A24] text-[#07131F] font-mono font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Container Passport (KEDU 240917 4)"
        >
          <Box className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Passport</span>
        </button>

        {/* Audio Toggle */}
        <button
          type="button"
          onClick={handleToggleSound}
          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
            isMuted
              ? 'bg-[#0B2235] text-[#9CB0C0] border-[#1B3B59] hover:text-white'
              : 'bg-[#45D6A3]/20 text-[#45D6A3] border-[#45D6A3]/50'
          }`}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Sources Button */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onOpenSources();
          }}
          className="p-1.5 rounded-lg bg-[#0B2235] hover:bg-[#1B3B59] text-[#9CB0C0] hover:text-white border border-[#1B3B59] transition-colors cursor-pointer"
          title="Evidence Ledger & Academic Sources"
        >
          <BookOpen className="w-3.5 h-3.5" />
        </button>

        {/* Tour / Explore Toggle */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onToggleMode();
          }}
          className={`px-2 py-1.5 rounded-lg text-xs font-mono font-medium hidden sm:flex items-center gap-1 transition-colors border ${
            mode === 'tour'
              ? 'bg-[#27D3F2]/10 text-[#27D3F2] border-[#27D3F2]/40'
              : 'bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/40'
          }`}
          title={mode === 'tour' ? 'Switch to Explore Mode' : 'Switch to Guided Tour'}
        >
          {mode === 'tour' ? <Play className="w-3 h-3 fill-current" /> : <Eye className="w-3 h-3" />}
          <span>{mode === 'tour' ? 'Tour' : 'Free'}</span>
        </button>

      </div>
    </header>
  );
};
