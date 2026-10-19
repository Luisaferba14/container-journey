import React, { useState } from 'react';
import { JourneyStage } from '../types/journey';
import { UserRole } from './OnboardingGameModal';
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
  ChevronDown,
  Award,
  Target,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Briefcase
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
  traineeScore: number;
  badgesCount: number;
  onOpenBriefing: () => void;
  onOpenAssessment: () => void;
  onOpenFacilitatorGuide: () => void;
  traineeName: string;
  userRole: UserRole;
  onToggleRole: () => void;
  onOpenOnboardingGuide: () => void;
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
  onOpenSources,
  traineeScore,
  badgesCount,
  onOpenBriefing,
  onOpenAssessment,
  onOpenFacilitatorGuide,
  traineeName,
  userRole,
  onToggleRole,
  onOpenOnboardingGuide
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showLensesMenu, setShowLensesMenu] = useState(false);
  const [showTrainingMenu, setShowTrainingMenu] = useState(false);

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  // Determine rank based on score
  const getRank = (score: number) => {
    if (score >= 175) return { title: 'Master Forwarder', color: 'text-[#45D6A3] border-[#45D6A3]' };
    if (score >= 140) return { title: 'Senior Ops Specialist', color: 'text-[#27D3F2] border-[#27D3F2]' };
    if (score >= 100) return { title: 'Junior Forwarder', color: 'text-[#FFB020] border-[#FFB020]' };
    return { title: 'Cadet Apprentice', color: 'text-[#EF5350] border-[#EF5350]' };
  };

  const rank = getRank(traineeScore);

  return (
    <header className="w-full bg-[#07131F] border-b border-[#1B3B59]/60 px-3 sm:px-4 py-2 flex items-center justify-between select-none z-30 relative h-13">
      
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

        <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-[#1B3B59]/60">
          <span className="px-2 py-0.5 rounded bg-[#0B2235] text-[10px] font-mono font-semibold text-[#27D3F2] border border-[#1B3B59]">
            {currentStage.stageNumber}/{totalStages}
          </span>
          <span className="text-xs font-medium text-white max-w-[180px] xl:max-w-xs truncate">
            {currentStage.title}
          </span>
        </div>
      </div>

      {/* Center: Distinction Between Trainee & Manager */}
      <div className="flex items-center gap-2">
        {userRole === 'trainee' ? (
          /* Gamified Trainee Player Console */
          <div className="flex items-center gap-2 sm:gap-3 bg-[#0B2235] px-3.5 py-1 rounded-xl border border-[#27D3F2]/40 shadow-lg font-mono">
            {/* Cadet Avatar & Username */}
            <div className="flex items-center gap-2 pr-2 border-r border-[#1B3B59]/80">
              <span className="text-sm">🎖️</span>
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-wider text-[#27D3F2] font-bold leading-none">
                  Cadet Forwarder
                </span>
                <span className="text-xs font-bold text-white tracking-wide truncate max-w-[110px] sm:max-w-[150px]">
                  {traineeName || 'Player 1'}
                </span>
              </div>
            </div>

            {/* Prominent Glowing Score */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[#07131F] border border-[#45D6A3]/50 shadow-inner">
              <span className="text-xs">🏆</span>
              <span className="text-xs sm:text-sm font-extrabold text-[#45D6A3] tracking-wider">
                {traineeScore}
              </span>
              <span className="text-[9px] text-slate-400 font-semibold">PTS</span>
            </div>

            {/* Rank / Title */}
            <span className={`text-[10px] font-bold hidden md:inline px-2 py-0.5 rounded bg-[#07131F]/50 border border-white/5 ${rank.color}`}>
              {rank.title}
            </span>

            {/* Badges Counter */}
            <div className="flex items-center gap-1 text-[11px] text-[#FFB020] font-bold" title={`${badgesCount} of 6 Achievement Badges Unlocked`}>
              <span>🏅</span>
              <span>{badgesCount}/6</span>
            </div>

            {/* Manager Switch Button */}
            <button
              type="button"
              onClick={onToggleRole}
              className="text-[9px] uppercase font-bold px-2 py-1 rounded bg-[#1B3B59]/60 hover:bg-[#1B3B59] text-[#9CB0C0] hover:text-[#27D3F2] transition-colors cursor-pointer ml-1 hidden sm:inline-block"
              title="Switch to Facilitator / Manager Mode"
            >
              Manager View →
            </button>
          </div>
        ) : (
          /* Manager Facilitator View */
          <div className="flex items-center gap-2 bg-[#45D6A3]/15 px-3 py-1 rounded-xl border border-[#45D6A3]/50 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">👔</span>
              <span className="text-[#45D6A3] font-bold">Manager Facilitator</span>
            </div>
            <span className="text-[#45D6A3]/40">|</span>
            <button
              type="button"
              onClick={onOpenFacilitatorGuide}
              className="text-[11px] text-white hover:text-[#45D6A3] underline transition-colors cursor-pointer"
            >
              Curriculum & Answer Key
            </button>
            <button
              type="button"
              onClick={onToggleRole}
              className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-[#45D6A3]/20 hover:bg-[#45D6A3]/30 text-[#45D6A3] transition-colors cursor-pointer ml-1"
              title="Switch to Trainee View"
            >
              Cadet View →
            </button>
          </div>
        )}
      </div>

      {/* Right: Actions & Academy Tools */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        
        {/* Quick Guide & Role Setup Trigger */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onOpenOnboardingGuide();
          }}
          className="px-2.5 py-1.5 rounded-lg bg-[#FF6B35]/15 hover:bg-[#FF6B35]/25 text-[#FF6B35] font-mono font-bold text-xs border border-[#FF6B35]/40 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          title="Open How to Play & Console Controls"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">How To Play</span>
        </button>

        {/* Training Hub Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setShowTrainingMenu(!showTrainingMenu);
              setShowLensesMenu(false);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-[#27D3F2]/10 hover:bg-[#27D3F2]/20 text-xs font-mono font-bold text-[#27D3F2] border border-[#27D3F2]/40 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Target className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Training Hub</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {showTrainingMenu && (
            <div
              className="absolute right-0 mt-2 w-64 bg-[#0B2235] border border-[#1B3B59] rounded-xl shadow-2xl py-1.5 z-50 text-xs font-mono animate-in fade-in zoom-in-95 duration-150"
              onMouseLeave={() => setShowTrainingMenu(false)}
            >
              <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#27D3F2] tracking-wider">
                Challenge 8 Training Modules
              </div>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowTrainingMenu(false);
                  onOpenOnboardingGuide();
                }}
                className="w-full px-3 py-2 text-left hover:bg-[#1B3B59]/50 text-white flex items-center gap-2 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#FF6B35]" />
                <div>
                  <span className="block font-semibold">How to Play & Controls</span>
                  <span className="text-[10px] text-slate-400 block">Switch roles & review operations console</span>
                </div>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowTrainingMenu(false);
                  onOpenBriefing();
                }}
                className="w-full px-3 py-2 text-left hover:bg-[#1B3B59]/50 text-white flex items-center gap-2 cursor-pointer"
              >
                <Target className="w-3.5 h-3.5 text-[#27D3F2]" />
                <div>
                  <span className="block font-semibold">5 Learning Objectives</span>
                  <span className="text-[10px] text-slate-400 block">Multimodal, SOLAS, DAP, Costs</span>
                </div>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowTrainingMenu(false);
                  onOpenAssessment();
                }}
                className="w-full px-3 py-2 text-left hover:bg-[#1B3B59]/50 text-white flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-[#FFB020]" />
                <div>
                  <span className="block font-semibold">10-Question Assessment</span>
                  <span className="text-[10px] text-slate-400 block">Validate skills & get certificate</span>
                </div>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowTrainingMenu(false);
                  onOpenFacilitatorGuide();
                }}
                className="w-full px-3 py-2 text-left hover:bg-[#1B3B59]/50 text-white flex items-center gap-2 cursor-pointer border-t border-[#1B3B59]/40 mt-1 pt-1.5"
              >
                <Users className="w-3.5 h-3.5 text-[#45D6A3]" />
                <div>
                  <span className="block font-semibold text-[#45D6A3]">Manager Facilitator Guide</span>
                  <span className="text-[10px] text-slate-400 block">Curriculum, answer key & debriefs</span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Corridor Lenses Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setShowLensesMenu(!showLensesMenu);
              setShowTrainingMenu(false);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-[#0B2235] hover:bg-[#1B3B59] text-xs font-mono text-[#9CB0C0] hover:text-white border border-[#1B3B59] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Dossiers</span>
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

        {/* Map Camera Mode Toggle: Auto-Track vs Free-Pan */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onToggleMode();
          }}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium hidden sm:flex items-center gap-1.5 transition-colors border cursor-pointer ${
            mode === 'tour'
              ? 'bg-[#27D3F2]/15 text-[#27D3F2] border-[#27D3F2]/50 hover:bg-[#27D3F2]/25'
              : 'bg-[#FF6B35]/15 text-[#FF6B35] border-[#FF6B35]/50 hover:bg-[#FF6B35]/25'
          }`}
          title={
            mode === 'tour'
              ? 'Map Camera locked on Container 917. Click to unlock Free-Pan globe'
              : 'Free-Pan globe mode active. Click to lock camera back to Container 917'
          }
        >
          {mode === 'tour' ? (
            <>
              <Eye className="w-3.5 h-3.5 text-[#27D3F2]" />
              <span className="font-semibold">🎯 Auto-Track</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span className="font-semibold">🌐 Free-Pan</span>
            </>
          )}
        </button>

      </div>
    </header>
  );
};
