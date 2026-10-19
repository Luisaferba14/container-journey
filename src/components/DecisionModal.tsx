import React, { useState } from 'react';
import { OperationalDecision, DecisionOption } from '../data/simulation';
import { soundManager } from './AudioController';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Euro,
  Shield,
  Award,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  X
} from 'lucide-react';

interface DecisionModalProps {
  decision: OperationalDecision | null;
  isOpen: boolean;
  onClose: () => void;
  selectedOptionId?: string;
  onSelectOption: (decisionId: string, option: DecisionOption) => void;
  currentScore: number;
}

export const DecisionModal: React.FC<DecisionModalProps> = ({
  decision,
  isOpen,
  onClose,
  selectedOptionId,
  onSelectOption,
  currentScore
}) => {
  const [localChoiceId, setLocalChoiceId] = useState<string | null>(selectedOptionId || null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(!!selectedOptionId);

  if (!isOpen || !decision) return null;

  const currentOption = decision.options.find((opt) => opt.id === (localChoiceId || selectedOptionId));

  const handleChoose = (opt: DecisionOption) => {
    setLocalChoiceId(opt.id);
    setIsConfirmed(true);
    soundManager.playClick();
    onSelectOption(decision.id, opt);
  };

  const handleResetChoice = () => {
    setLocalChoiceId(null);
    setIsConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-3xl max-h-[90vh] bg-[#07131F] border border-[#27D3F2]/50 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#27D3F2]/10 border border-[#27D3F2]/40 flex items-center justify-center text-[#27D3F2]">
              <AlertTriangle className="w-5 h-5 text-[#FFB020]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#27D3F2] bg-[#27D3F2]/10 px-2 py-0.5 rounded border border-[#27D3F2]/30">
                  Decision Point {decision.decisionNumber} of 6 · Stage {decision.stageNumber}
                </span>
                <span className="text-xs font-mono text-[#9CB0C0]">
                  {decision.location}
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-white mt-0.5">
                {decision.scenarioTitle}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1B3B59]/40 hover:bg-[#1B3B59] text-[#9CB0C0] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Context & Dilemma */}
          <div className="p-4 rounded-xl bg-[#0B2235]/60 border border-[#1B3B59]/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF6B35] font-bold">
                Operational Dilemma
              </span>
              <span className="text-[10px] font-mono text-[#27D3F2]">
                {decision.learningObjectiveRef}
              </span>
            </div>
            <p className="text-sm text-slate-200 font-sans leading-relaxed">
              {decision.dilemma}
            </p>
            <p className="text-xs text-[#9CB0C0] font-sans border-t border-[#1B3B59]/50 pt-2 italic">
              💡 <span className="font-semibold text-slate-300">Regulatory Reality:</span> {decision.contextNote}
            </p>
          </div>

          {/* Options Selection */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Select Your Operational Directive:
            </h4>

            <div className="grid gap-3">
              {decision.options.map((option) => {
                const isSelected = localChoiceId === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleChoose(option)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? option.isBestPractice
                          ? 'bg-[#45D6A3]/10 border-[#45D6A3] ring-1 ring-[#45D6A3]/40'
                          : 'bg-[#EF5350]/10 border-[#EF5350] ring-1 ring-[#EF5350]/40'
                        : 'bg-[#0B2235]/40 hover:bg-[#0B2235] border-[#1B3B59] hover:border-[#27D3F2]/50 text-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className={`text-sm font-semibold block ${isSelected ? (option.isBestPractice ? 'text-[#45D6A3]' : 'text-[#EF5350]') : 'text-white'}`}>
                          {option.label}
                        </span>
                        <p className="text-xs text-slate-300 font-sans">
                          {option.actionSummary}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-1 font-mono text-xs">
                        {option.scoreDelta > 0 ? (
                          <span className="text-[#45D6A3] font-bold">+{option.scoreDelta} pts</span>
                        ) : (
                          <span className="text-[#EF5350] font-bold">{option.scoreDelta} pts</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Consequence Breakdown (Appears when confirmed) */}
          {isConfirmed && currentOption && (
            <div className={`p-5 rounded-xl border space-y-4 animate-in fade-in duration-300 ${
              currentOption.isBestPractice
                ? 'bg-[#45D6A3]/10 border-[#45D6A3]/50'
                : 'bg-[#EF5350]/10 border-[#EF5350]/50'
            }`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  {currentOption.isBestPractice ? (
                    <CheckCircle2 className="w-5 h-5 text-[#45D6A3] shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#EF5350] shrink-0" />
                  )}
                  <h5 className="font-mono text-sm font-bold text-white">
                    {currentOption.consequenceTitle}
                  </h5>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    currentOption.isBestPractice ? 'bg-[#45D6A3]/20 text-[#45D6A3]' : 'bg-[#EF5350]/20 text-[#EF5350]'
                  }`}>
                    {currentOption.isBestPractice ? 'Best Practice' : 'Operational Penalty'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                {currentOption.consequenceDescription}
              </p>

              {/* Consequence Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-xs font-mono">
                <div className="p-2 rounded-lg bg-[#07131F]/60 border border-white/10 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#27D3F2]" />
                  <div>
                    <span className="text-[10px] text-[#9CB0C0] block">Schedule Impact</span>
                    <strong className="text-white">
                      {currentOption.timeImpactHours > 0 ? `+${currentOption.timeImpactHours}h Delay` : 'Zero Delay'}
                    </strong>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-[#07131F]/60 border border-white/10 flex items-center gap-2">
                  <Euro className="w-4 h-4 text-[#FFB020]" />
                  <div>
                    <span className="text-[10px] text-[#9CB0C0] block">Cost Delta</span>
                    <strong className={currentOption.costImpactEuro > 0 ? 'text-[#EF5350]' : 'text-[#45D6A3]'}>
                      {currentOption.costImpactEuro > 0 ? `+€${currentOption.costImpactEuro}` : '€0 Demurrage'}
                    </strong>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-[#07131F]/60 border border-white/10 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#45D6A3]" />
                  <div>
                    <span className="text-[10px] text-[#9CB0C0] block">Trainee Score</span>
                    <strong className={currentOption.scoreDelta > 0 ? 'text-[#45D6A3]' : 'text-[#EF5350]'}>
                      {currentOption.scoreDelta > 0 ? `+${currentOption.scoreDelta} pts` : `${currentOption.scoreDelta} pts`}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Regulatory Citation */}
              <div className="text-[11px] font-mono text-[#9CB0C0] flex items-center gap-1.5 pt-1">
                <BookOpen className="w-3.5 h-3.5 text-[#27D3F2] shrink-0" />
                <span>Verified Source: <strong className="text-slate-300">{currentOption.regulatorySource}</strong></span>
              </div>

              {/* Badge Unlocked Notification if Best Practice */}
              {currentOption.badgeUnlocked && (
                <div className="p-3 rounded-lg bg-[#27D3F2]/10 border border-[#27D3F2]/40 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#27D3F2] flex items-center justify-center text-[#07131F] font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#27D3F2] font-bold block">
                      Badge Unlocked!
                    </span>
                    <strong className="text-xs text-white block">
                      {currentOption.badgeUnlocked.title}
                    </strong>
                    <span className="text-[11px] text-slate-300">
                      {currentOption.badgeUnlocked.description}
                    </span>
                  </div>
                </div>
              )}

              {/* Explore other branches button */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleResetChoice}
                  className="text-xs font-mono text-[#9CB0C0] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Test Another Option (Counterfactual Analysis)
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-[#27D3F2] hover:bg-[#1EAFC9] text-[#07131F] font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Apply & Continue Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
