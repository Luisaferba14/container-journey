import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/simulation';
import { soundManager } from './AudioController';
import {
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Printer,
  Sparkles,
  ShieldCheck,
  Flame,
  Zap,
  Trophy,
  X
} from 'lucide-react';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssessmentCompleted?: (score: number) => void;
  traineeName: string;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  onAssessmentCompleted,
  traineeName
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<Record<number, boolean>>({});
  const [showCertificate, setShowCertificate] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [xp, setXp] = useState(0);

  if (!isOpen) return null;

  const question: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const selectedIndex = selectedAnswers[question.id];
  const isQuestionAnswered = isSubmitted[question.id];

  // Calculate score
  const totalCorrect = Object.entries(selectedAnswers).reduce((acc, [qId, ansIdx]) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    return q && q.correctIndex === ansIdx ? acc + 1 : acc;
  }, 0);

  const isAllAnswered = Object.keys(isSubmitted).length === QUIZ_QUESTIONS.length;
  const percentageScore = Math.round((totalCorrect / QUIZ_QUESTIONS.length) * 100);

  const handleSelectOption = (index: number) => {
    if (isQuestionAnswered) return;
    const isCorrect = question.correctIndex === index;

    if (isCorrect) {
      soundManager.playSuccess();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      const earnedXp = 100 + (newStreak > 1 ? (newStreak - 1) * 50 : 0);
      setXp((prev) => prev + earnedXp);
    } else {
      soundManager.playError();
      setStreak(0);
    }

    setSelectedAnswers((prev) => ({ ...prev, [question.id]: index }));
    setIsSubmitted((prev) => ({ ...prev, [question.id]: true }));

    if (currentQuestionIndex === QUIZ_QUESTIONS.length - 1 && onAssessmentCompleted) {
      onAssessmentCompleted(totalCorrect + (isCorrect ? 1 : 0));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      soundManager.playClick();
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      soundManager.playFanfare();
      setShowCertificate(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      soundManager.playClick();
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsSubmitted({});
    setCurrentQuestionIndex(0);
    setShowCertificate(false);
    setStreak(0);
    setXp(0);
  };

  const displayName = traineeName && traineeName.trim().length > 0 ? traineeName : 'Cadet Forwarder';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4">
      <div className="w-full max-w-3xl max-h-[92vh] bg-[#07131F] border border-[#FF6B35]/50 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Header with prominent Cadet Console */}
        <div className="px-5 py-3.5 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] flex items-center justify-center text-white font-bold shadow-md">
              <Award className="w-5 h-5 text-[#07131F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-0.5 rounded border border-[#FF6B35]/30">
                  Cadet Certification Exam
                </span>
                <span className="text-xs font-mono text-[#9CB0C0]">
                  10 Standard Knowledge Trials
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-display text-white mt-0.5">
                Freight Forwarding Competency Check
              </h3>
            </div>
          </div>

          {/* Gamified Trainee Badge & Stats */}
          <div className="flex items-center gap-2">
            {/* Cadet Callout */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#07131F] border border-[#27D3F2]/40 text-xs font-mono">
              <span className="text-sm">🎖️</span>
              <span className="font-bold text-white max-w-[120px] truncate">{displayName}</span>
            </div>

            {/* Live XP Counter */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#07131F] border border-[#FFB020]/40 text-xs font-mono font-bold text-[#FFB020]">
              <Zap className="w-3.5 h-3.5 fill-[#FFB020]" />
              <span>{xp} XP</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#1B3B59]/40 hover:bg-[#1B3B59] text-[#9CB0C0] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!showCertificate ? (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
            
            {/* Gamified Progress Bar & Streak Multiplier */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">
                    Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-[#27D3F2] font-semibold bg-[#27D3F2]/10 px-2 py-0.5 rounded border border-[#27D3F2]/30 text-[10px]">
                    {question.objectiveRef}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {streak >= 2 && (
                    <span className="flex items-center gap-1 font-bold text-[#FF6B35] text-xs animate-pulse">
                      <Flame className="w-4 h-4 fill-[#FF6B35]" />
                      {streak}x Streak! (+{(streak - 1) * 50} XP)
                    </span>
                  )}
                  <span className="text-[#45D6A3] font-bold">
                    {totalCorrect} / {QUIZ_QUESTIONS.length} Correct ({percentageScore}%)
                  </span>
                </div>
              </div>

              {/* Step indicator */}
              <div className="w-full h-2 bg-[#0B2235] rounded-full overflow-hidden flex gap-1 p-0.5 border border-[#1B3B59]/50">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const answered = isSubmitted[q.id];
                  const isCorrect = answered && selectedAnswers[q.id] === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`flex-1 rounded-sm transition-all duration-300 ${
                        !answered
                          ? idx === currentQuestionIndex
                            ? 'bg-[#27D3F2] ring-1 ring-[#27D3F2]'
                            : 'bg-[#1B3B59]/40'
                          : isCorrect
                          ? 'bg-[#45D6A3]'
                          : 'bg-[#EF5350]'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Question Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#0B2235]/70 border border-[#1B3B59] shadow-inner space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#9CB0C0]">
                Scenario Assessment
              </span>
              <h4 className="text-sm sm:text-base font-medium text-white leading-relaxed font-sans">
                {question.question}
              </h4>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {question.options.map((optionText, idx) => {
                const isSelected = selectedIndex === idx;
                const isCorrect = question.correctIndex === idx;

                let btnStyle = 'bg-[#0B2235]/40 hover:bg-[#0B2235] border-[#1B3B59] hover:border-[#27D3F2]/50 text-slate-300';
                if (isQuestionAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-[#45D6A3]/20 border-[#45D6A3] text-white font-semibold ring-1 ring-[#45D6A3]';
                  } else if (isSelected) {
                    btnStyle = 'bg-[#EF5350]/20 border-[#EF5350] text-slate-200 line-through';
                  } else {
                    btnStyle = 'opacity-35 border-transparent text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isQuestionAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3 sm:p-3.5 rounded-xl border font-sans text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer ${btnStyle}`}
                  >
                    <span className={`w-6 h-6 rounded-lg border flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                      isQuestionAnswered && isCorrect
                        ? 'bg-[#45D6A3] text-[#07131F] border-[#45D6A3]'
                        : isQuestionAnswered && isSelected
                        ? 'bg-[#EF5350] text-white border-[#EF5350]'
                        : 'bg-[#07131F] border-[#1B3B59] text-slate-300'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 pt-0.5 leading-relaxed">{optionText}</span>
                    {isQuestionAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-[#45D6A3] shrink-0" />
                    )}
                    {isQuestionAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-[#EF5350] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback & Regulatory Explanation */}
            {isQuestionAnswered && (
              <div className={`p-4 rounded-xl border space-y-2 animate-in fade-in duration-200 ${
                selectedIndex === question.correctIndex
                  ? 'bg-[#45D6A3]/10 border-[#45D6A3]/50'
                  : 'bg-[#EF5350]/10 border-[#EF5350]/50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedIndex === question.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#45D6A3]" />
                        <span className="text-xs font-mono font-bold text-[#45D6A3] uppercase">
                          ✓ Correct Operational Judgment (+100 XP)
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-[#EF5350]" />
                        <span className="text-xs font-mono font-bold text-[#EF5350] uppercase">
                          ✗ Inaccurate Operational Choice (0 XP)
                        </span>
                      </>
                    )}
                  </div>
                  {selectedIndex === question.correctIndex && streak >= 2 && (
                    <span className="text-[10px] font-mono text-[#FFB020] font-bold">
                      Combo Bonus +{(streak - 1) * 50} XP!
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-200 font-sans leading-relaxed">
                  {question.explanation}
                </p>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#9CB0C0] pt-1 border-t border-white/5">
                  <BookOpen className="w-3.5 h-3.5 text-[#27D3F2]" />
                  <span>Regulatory Standard: <strong className="text-slate-300">{question.regulatorySource}</strong></span>
                </div>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[#1B3B59]/60">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={handlePrevQuestion}
                className="px-3.5 py-2 rounded-lg bg-[#0B2235] hover:bg-[#1B3B59] text-xs font-mono text-white border border-[#1B3B59] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                Previous Question
              </button>

              <div className="flex items-center gap-2">
                {isAllAnswered && !showCertificate && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playFanfare();
                      setShowCertificate(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] hover:from-[#E85A24] hover:to-[#FF6B35] text-[#07131F] font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <Trophy className="w-4 h-4 text-[#07131F]" />
                    <span>View Official Certificate & Graduation</span>
                  </button>
                )}

                {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 && (
                  <button
                    type="button"
                    disabled={!isQuestionAnswered}
                    onClick={handleNextQuestion}
                    className="px-4 py-2 rounded-lg bg-[#27D3F2] hover:bg-[#1EAFC9] text-[#07131F] font-mono font-bold text-xs flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-md"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        ) : (
          /* Gamified Certificate Presentation View */
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 text-center">
            
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-[#0B2235] via-[#07131F] to-[#040C15] border-2 border-[#FFB020] relative shadow-2xl max-w-2xl mx-auto space-y-5 text-left">
              
              {/* Ornate Gold Border Accent */}
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#FFB020]/25 rounded-xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-[#FFB020]/30 pb-4 relative z-10">
                <div>
                  <span className="font-mono text-xs font-bold text-[#FFB020] uppercase tracking-widest block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    DeltaBridge Academy · KEDGE Business School
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Marseille-Fos Multimodal Logistics Apprenticeship Board
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFB020] to-[#E69B15] border-2 border-white/40 flex items-center justify-center text-[#07131F] shadow-lg">
                  <ShieldCheck className="w-7 h-7" />
                </div>
              </div>

              <div className="text-center py-2 space-y-2 relative z-10">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#27D3F2] font-semibold block">
                  Official Multimodal Forwarding Accreditation
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                  Certificate of Competence
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-lg mx-auto pt-1 leading-relaxed">
                  This formally certifies that <strong className="text-[#FFB020] text-base font-bold underline decoration-[#FFB020]/50 decoration-2 underline-offset-4">{displayName}</strong> has successfully completed the 47-day multimodal forwarding mission for Container <span className="font-mono font-bold text-white">KEDU 240917 4</span>.
                </p>
              </div>

              {/* Score & Evaluation Badges Grid */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#07131F]/90 border border-[#1B3B59] text-xs font-mono relative z-10">
                <div>
                  <span className="text-[10px] text-slate-400 block">Assessment Score</span>
                  <strong className="text-sm sm:text-base text-[#45D6A3]">{totalCorrect} / 10 ({percentageScore}%)</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Qualification Rank</span>
                  <strong className="text-xs sm:text-sm text-white">
                    {percentageScore >= 80 ? 'Master Forwarder 🏆' : percentageScore >= 60 ? 'Certified Forwarder 🎖️' : 'Cadet Review 📋'}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Total Cadet XP</span>
                  <strong className="text-sm sm:text-base text-[#FFB020] font-extrabold">{xp} XP</strong>
                </div>
              </div>

              {/* Simulation Verification Footer */}
              <div className="text-[10px] font-mono text-slate-400 pt-2 flex items-center justify-between border-t border-[#1B3B59] relative z-10">
                <span>Verified ID: <strong className="text-[#27D3F2]">KEDGE-917-{Math.abs(percentageScore * 847291).toString(16).toUpperCase().slice(0, 8)}</strong></span>
                <span>IMO SOLAS / ICC Incoterms / EU UCC Compliant</span>
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="px-4 py-2 rounded-xl bg-[#0B2235] hover:bg-[#1B3B59] border border-[#1B3B59] text-xs font-mono text-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Exam
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-[#FFB020] hover:bg-[#E69B15] text-[#07131F] font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg transition-transform hover:scale-105"
              >
                <Printer className="w-4 h-4" />
                Print Certificate / PDF
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
