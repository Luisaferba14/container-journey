import React, { useState, useEffect } from 'react';
import { JOURNEY_STAGES } from '../data/journey';
import { JourneyStage, Waypoint } from '../types/journey';
import { TopHUD } from './TopHUD';
import { DayTimeline } from './DayTimeline';
import { SceneDossier } from './SceneDossier';
import { WorldMap } from './WorldMap';
import { ContainerPassport } from './ContainerPassport';
import { DocumentWallet } from './DocumentWallet';
import { ActorConstellation } from './ActorConstellation';
import { CostStack } from './CostStack';
import { EmissionsLens } from './EmissionsLens';
import { PortMicroExperience } from './PortMicroExperience';
import { SlotSelectorModal } from './SlotSelectorModal';
import { DisruptionModal } from './DisruptionModal';
import { EvidenceLedgerModal } from './EvidenceLedgerModal';
import { soundManager } from './AudioController';
import { RotateCcw } from 'lucide-react';

export const JourneyShell: React.FC = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [currentDay, setCurrentDay] = useState(JOURNEY_STAGES[0].dayStart);
  const [mode, setMode] = useState<'tour' | 'explore'>('tour');

  // Modals state
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);
  const [isActorsOpen, setIsActorsOpen] = useState(false);
  const [isCostsOpen, setIsCostsOpen] = useState(false);
  const [isEmissionsOpen, setIsEmissionsOpen] = useState(false);
  const [isPortSimOpen, setIsPortSimOpen] = useState(false);
  const [isSlotSelectorOpen, setIsSlotSelectorOpen] = useState(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [activeDisruptionId, setActiveDisruptionId] = useState<'event-1' | 'event-2' | 'event-3' | null>(null);

  const currentStage: JourneyStage = JOURNEY_STAGES[currentStageIndex];

  // Sync day when stage changes
  useEffect(() => {
    setCurrentDay(currentStage.dayStart);
  }, [currentStageIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNextStage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevStage();
      } else if (e.key.toLowerCase() === 'p') {
        setIsPassportOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'd') {
        setIsDocumentsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsPassportOpen(false);
        setIsDocumentsOpen(false);
        setIsActorsOpen(false);
        setIsCostsOpen(false);
        setIsEmissionsOpen(false);
        setIsPortSimOpen(false);
        setIsSlotSelectorOpen(false);
        setIsSourcesOpen(false);
        setActiveDisruptionId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStageIndex]);

  const handleNextStage = () => {
    if (currentStageIndex < JOURNEY_STAGES.length - 1) {
      soundManager.playClick();
      setCurrentStageIndex((prev) => prev + 1);
    }
  };

  const handlePrevStage = () => {
    if (currentStageIndex > 0) {
      soundManager.playClick();
      setCurrentStageIndex((prev) => prev - 1);
    }
  };

  const handleSelectDay = (day: number) => {
    setCurrentDay(day);
    const matchingIndex = JOURNEY_STAGES.findIndex(
      (s) => day >= s.dayStart && day <= s.dayEnd
    );
    if (matchingIndex !== -1 && matchingIndex !== currentStageIndex) {
      setCurrentStageIndex(matchingIndex);
    }
  };

  const handleToggleMode = () => {
    setMode((prev) => (prev === 'tour' ? 'explore' : 'tour'));
  };

  return (
    <div className="relative w-screen h-screen bg-[#07131F] text-[#F4F8FB] flex flex-col overflow-hidden font-sans">
      
      {/* 1. Sleek Top Header */}
      <TopHUD
        currentStage={currentStage}
        currentDay={currentDay}
        totalStages={JOURNEY_STAGES.length}
        mode={mode}
        onToggleMode={handleToggleMode}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenDocuments={() => setIsDocumentsOpen(true)}
        onOpenActors={() => setIsActorsOpen(true)}
        onOpenCosts={() => setIsCostsOpen(true)}
        onOpenEmissions={() => setIsEmissionsOpen(true)}
        onOpenPort={() => setIsPortSimOpen(true)}
        onOpenSources={() => setIsSourcesOpen(true)}
      />

      {/* 2. Slim Progress Timeline */}
      <DayTimeline
        currentDay={currentDay}
        totalPlannedDays={44}
        totalActualDays={47}
        onSelectDay={handleSelectDay}
        onOpenDisruption={(id) => setActiveDisruptionId(id)}
      />

      {/* 3. Docked 2-Column Clean Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Column: Dedicated Reading & Narrative Pane */}
        <div className="w-full md:w-[46%] lg:w-[40%] xl:w-[38%] max-w-[580px] h-full flex flex-col border-r border-[#1B3B59]/60 bg-[#07131F] shrink-0 z-10 shadow-2xl">
          <SceneDossier
            stage={currentStage}
            onNextStage={handleNextStage}
            onPrevStage={handlePrevStage}
            canNext={currentStageIndex < JOURNEY_STAGES.length - 1}
            canPrev={currentStageIndex > 0}
            onOpenDocuments={() => setIsDocumentsOpen(true)}
            onOpenActors={() => setIsActorsOpen(true)}
            onOpenCosts={() => setIsCostsOpen(true)}
            onOpenEmissions={() => setIsEmissionsOpen(true)}
            onOpenSlotSelector={() => setIsSlotSelectorOpen(true)}
            onOpenPortSim={() => setIsPortSimOpen(true)}
            onOpenDisruption={(id) => setActiveDisruptionId(id)}
            onOpenPassport={() => setIsPassportOpen(true)}
          />
        </div>

        {/* Right Column: Full Unobstructed World Map */}
        <main className="flex-1 relative h-full w-full overflow-hidden bg-[#07131F]">
          <WorldMap
            currentStage={currentStage}
            currentDay={currentDay}
            onOpenDisruption={(id) => setActiveDisruptionId(id)}
          />

          {mode === 'explore' && (
            <div className="absolute bottom-6 right-6 z-20">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setMode('tour');
                }}
                className="px-4 py-2.5 rounded-xl bg-[#27D3F2] hover:bg-[#1EAFC9] text-[#07131F] font-mono font-bold text-xs shadow-2xl flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Resume Guided Tour
              </button>
            </div>
          )}
        </main>
      </div>

      {/* 4. Minimalist Academic Disclaimer Footer */}
      <footer className="w-full bg-[#07131F] border-t border-[#1B3B59]/60 px-4 py-1.5 text-[10px] text-[#9CB0C0] font-mono flex flex-col sm:flex-row items-center justify-between gap-1 z-20 h-7 shrink-0">
        <div className="text-slate-400">
          BOX 917 · <span className="text-[#FF6B35] font-semibold">KEDU 240917 4</span> · 47 Days Multimodal Journey
        </div>
        <p className="text-slate-400 text-center sm:text-right truncate max-w-2xl">
          Fictional shipment built from real logistics processes & published sources. Dates, costs & events are illustrative.
        </p>
      </footer>

      {/* Modals & Overlays */}
      <ContainerPassport
        stage={currentStage}
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        onOpenDocuments={() => {
          setIsPassportOpen(false);
          setIsDocumentsOpen(true);
        }}
      />

      <DocumentWallet
        isOpen={isDocumentsOpen}
        onClose={() => setIsDocumentsOpen(false)}
        activeDocIds={currentStage.documentIds}
      />

      <ActorConstellation
        isOpen={isActorsOpen}
        onClose={() => setIsActorsOpen(false)}
        activeActorIds={currentStage.actorIds}
      />

      <CostStack
        isOpen={isCostsOpen}
        onClose={() => setIsCostsOpen(false)}
        currentCostToDate={currentStage.costToDate}
      />

      <EmissionsLens
        isOpen={isEmissionsOpen}
        onClose={() => setIsEmissionsOpen(false)}
      />

      <PortMicroExperience
        isOpen={isPortSimOpen}
        onClose={() => setIsPortSimOpen(false)}
      />

      <SlotSelectorModal
        isOpen={isSlotSelectorOpen}
        onClose={() => setIsSlotSelectorOpen(false)}
      />

      <DisruptionModal
        disruptionId={activeDisruptionId}
        isOpen={activeDisruptionId !== null}
        onClose={() => setActiveDisruptionId(null)}
        onOpenDocuments={() => {
          setActiveDisruptionId(null);
          setIsDocumentsOpen(true);
        }}
      />

      <EvidenceLedgerModal
        isOpen={isSourcesOpen}
        onClose={() => setIsSourcesOpen(false)}
      />

    </div>
  );
};
