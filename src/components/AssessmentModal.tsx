import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/simulation';
import { soundManager } from './AudioController';
import {
  CheckCircle2,
  XCircle,
  Award,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Printer,
  Sparkles,
  ShieldCheck,
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
    soundManager.playClick();
    setSelectedAnswers((prev) => ({ ...prev, [question.id]: index }));
    setIsSubmitted((prev) => ({ ...prev, [question.id]: true }));

    if (currentQuestionIndex === QUIZ_QUESTIONS.length - 1 && onAssessmentCompleted) {
      onAssessmentCompleted(totalCorrect + (question.correctIndex === index ? 1 : 0));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      soundManager.playClick();
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
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
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="w-full max-w-3xl max-h-[92vh] bg-[#07131F] border border-[#FF6B35]/50 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2235] border-b border-[#1B3B59] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/20 border border-[#FF6B35]/50 flex items-center justify-center text-[#FF6B35]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-0.5 rounded border border-[#FF6B35]/30">
                  Onboarding Assessment · 10 Questions
                </span>
                <span className="text-xs font-mono text-[#9CB0C0]">
                  Measuring 5 Core Competencies
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-white mt-0.5">
                Freight Forwarding Knowledge Validation
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#07131F] border border-[#1B3B59] text-[#27D3F2]">
              Score: {totalCorrect} / {QUIZ_QUESTIONS.length} ({percentageScore}%)
            </span>
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
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Progress Stepper */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#9CB0C0]">
                <span>Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                <span className="text-[#27D3F2] font-semibold">{question.objectiveRef}</span>
              </div>
              <div className="w-full h-1.5 bg-[#0B2235] rounded-full overflow-hidden flex">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const answered = isSubmitted[q.id];
                  const isCorrect = answered && selectedAnswers[q.id] === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`flex-1 border-r border-[#07131F] ${
                        !answered
                          ? idx === currentQuestionIndex
                            ? 'bg-[#27D3F2]'
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

            {/* Question Text */}
            <div className="p-4 rounded-xl bg-[#0B2235]/60 border border-[#1B3B59]/80">
              <h4 className="text-base font-medium text-white leading-relaxed font-sans">
                {question.question}
              </h4>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {question.options.map((optionText, idx) => {
                const isSelected = selectedIndex === idx;
                const isCorrect = question.correctIndex === idx;

                let btnStyle = 'bg-[#0B2235]/40 hover:bg-[#0B2235] border-[#1B3B59] text-slate-300';
                if (isQuestionAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-[#45D6A3]/20 border-[#45D6A3] text-white font-semibold ring-1 ring-[#45D6A3]';
                  } else if (isSelected) {
                    btnStyle = 'bg-[#EF5350]/20 border-[#EF5350] text-slate-200 line-through';
                  } else {
                    btnStyle = 'opacity-40 border-transparent text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isQuestionAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border font-sans text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#07131F] border border-[#1B3B59] flex items-center justify-center font-mono text-xs font-bold shrink-0 text-slate-300">
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
                  ? 'bg-[#45D6A3]/10 border-[#45D6A3]/40'
                  : 'bg-[#EF5350]/10 border-[#EF5350]/40'
              }`}>
                <div className="flex items-center gap-2">
                  {selectedIndex === question.correctIndex ? (
                    <span className="text-xs font-mono font-bold text-[#45D6A3] uppercase">
                      ✓ Correct Operational Judgment
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-bold text-[#EF5350] uppercase">
                      ✗ Inaccurate Operational Choice
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-200 font-sans leading-relaxed">
                  {question.explanation}
                </p>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#9CB0C0] pt-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#27D3F2]" />
                  <span>Verified Standard: <strong className="text-slate-300">{question.regulatorySource}</strong></span>
                </div>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[#1B3B59]/50">
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
                    onClick={() => setShowCertificate(true)}
                    className="px-4 py-2 rounded-lg bg-[#FF6B35] hover:bg-[#E85A24] text-[#07131F] font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Official Certificate</span>
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
          /* Certificate Presentation View */
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-center">
            
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0B2235] to-[#07131F] border-2 border-[#FF6B35]/70 relative shadow-2xl max-w-2xl mx-auto space-y-4">
              
              <div className="flex items-center justify-between border-b border-[#1B3B59] pb-4">
                <div className="text-left">
                  <span className="font-mono text-xs font-bold text-[#FF6B35] uppercase tracking-widest block">
                    DeltaBridge Logistics Academy
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Marseille-Fos Freight Forwarding Apprenticeship Programme
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FF6B35]/20 border border-[#FF6B35] flex items-center justify-center text-[#FF6B35]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              <div className="py-2 space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#27D3F2]">
                  Certificate of Competency
                </span>
                <h2 className="text-2xl font-bold font-display text-white">
                  Certified Multimodal Freight Operator
                </h2>
                <p className="text-xs text-slate-300 font-sans max-w-md mx-auto pt-1">
                  This certifies that <strong className="text-[#FF6B35] font-semibold">{traineeName || 'Junior Operations Specialist'}</strong> has completed the end-to-end 47-day multimodal forwarding simulation for container <span className="font-mono font-bold text-white">KEDU 240917 4</span>.
                </p>
              </div>

              {/* Score & Evaluation */}
              <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-[#07131F] border border-[#1B3B59] text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">Assessment Score</span>
                  <strong className="text-base text-[#45D6A3]">{totalCorrect} / 10 ({percentageScore}%)</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Qualification</span>
                  <strong className="text-base text-white">
                    {percentageScore >= 80 ? 'Distinction' : percentageScore >= 60 ? 'Certified' : 'Review Required'}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Verification ID</span>
                  <strong className="text-xs text-[#27D3F2]">DB-917-{Math.abs(percentageScore * 847291).toString(16).toUpperCase().slice(0, 8)}</strong>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-400 pt-2 flex items-center justify-between border-t border-[#1B3B59]">
                <span>Issued in Marseille, France</span>
                <span>IMO SOLAS / ICC Incoterms / EU UCC Compliant</span>
              </div>

            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="px-4 py-2 rounded-xl bg-[#0B2235] hover:bg-[#1B3B59] border border-[#1B3B59] text-xs font-mono text-slate-300 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Assessment
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#27D3F2] hover:bg-[#1EAFC9] text-[#07131F] font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
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
