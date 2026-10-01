import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { LifelinesBar } from './components/LifelinesBar';
import { QuestionBox } from './components/QuestionBox';
import { OptionsGrid } from './components/OptionsGrid';
import { LockConfirmationBar } from './components/LockConfirmationBar';
import { PrizeLadder } from './components/PrizeLadder';
import { HostDialog } from './components/HostDialog';
import { AudiencePollModal } from './components/AudiencePollModal';
import { ComputerJiHintModal } from './components/ComputerJiHintModal';
import { VictoryModal } from './components/VictoryModal';
import { AITopicGeneratorModal } from './components/AITopicGeneratorModal';
import { soundEngine } from './utils/audio';
import { Question, AgeGroup, GameStatus, LifelineState, OptionLetter } from './types/game';
import { PRIZE_LADDER, getGameQuestionPool, INITIAL_QUESTIONS, shuffleQuestionOptions } from './data/questions';
import { ASSET_IMAGES } from './assets/images';
import { Sparkles, Dices, RefreshCw } from 'lucide-react';

const LETTERS: OptionLetter[] = ['A', 'B', 'C', 'D'];

export default function App() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('all');
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(0);
  const [questionPool, setQuestionPool] = useState<Question[]>(() => getGameQuestionPool('all', 16));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>('PLAYING');
  const [eliminatedIndices, setEliminatedIndices] = useState<number[]>([]);
  const [isReadingSpeech, setIsReadingSpeech] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState<boolean>(true);
  const [isLadderOpenMobile, setIsLadderOpenMobile] = useState<boolean>(false);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState<number>(0);

  // Lifelines
  const [lifelines, setLifelines] = useState<LifelineState>({
    fiftyFifty: true,
    audiencePoll: true,
    expertHint: true,
    flipQuestion: true,
  });

  // Modals
  const [showAudienceModal, setShowAudienceModal] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [showAIGeneratorModal, setShowAIGeneratorModal] = useState<boolean>(false);

  // Current Question & Prize details
  const currentQuestion: Question = useMemo(() => {
    return questionPool[currentLevelIndex] || questionPool[0];
  }, [questionPool, currentLevelIndex]);

  // KBC prize tree is 1-indexed (Level 1 to 16)
  const currentLevelNumber = currentLevelIndex + 1;
  const currentLevelTier = useMemo(() => {
    return PRIZE_LADDER.find(p => p.level === currentLevelNumber) || PRIZE_LADDER[PRIZE_LADDER.length - 1];
  }, [currentLevelNumber]);

  // Current bank amount won so far
  const currentBankPrizeLabel = useMemo(() => {
    if (currentLevelIndex === 0) return '0 ⭐';
    const prevTier = PRIZE_LADDER.find(p => p.level === currentLevelIndex);
    return prevTier ? prevTier.label : '0 ⭐';
  }, [currentLevelIndex]);

  // Calculate guaranteed safe milestone prize
  const safePrizeLabel = useMemo(() => {
    if (currentLevelNumber > 10) return '3,20,000 ⭐ (Safe Padhao 2)';
    if (currentLevelNumber > 5) return '10,000 ⭐ (Safe Padhao 1)';
    return '0 ⭐';
  }, [currentLevelNumber]);

  // Host dialogue commentary text
  const hostMessage = useMemo(() => {
    if (selectedIndex === null) {
      if (currentLevelNumber === 1) {
        return "Swagat hai KBC Junior Star mein! Chaliye shuru karte hain pehle sawal se!";
      }
      if (currentLevelNumber === 5) {
        return "Sawal number 5! Yeh pehla Padhao (Milestone) hai! Yahan jeet pakki hogi!";
      }
      if (currentLevelNumber === 10) {
        return "Sawal number 10! Dusra bada Padhao (Milestone)! Dhyaan se sochiye champ!";
      }
      if (currentLevelNumber === 16) {
        return "Yeh hai aakhri aur sabse bada 7 Crore ka sawal! Best of luck, super star!";
      }
      return "Sawal aapki screen par hai! 4 vikalp hain, sahi uttar chuniye!";
    }
    return `Aapne option ${LETTERS[selectedIndex]} chuna hai. Kya ise lock kiya jaye?`;
  }, [currentLevelNumber, selectedIndex]);

  // Read current question and options out loud using SpeechSynthesis
  const readQuestionAloud = useCallback(() => {
    if (!currentQuestion) return;
    setIsReadingSpeech(true);
    const speechText = `Question: ${currentQuestion.statement}. Option A: ${currentQuestion.options[0]}. Option B: ${currentQuestion.options[1]}. Option C: ${currentQuestion.options[2]}. Option D: ${currentQuestion.options[3]}.`;
    soundEngine.speak(speechText, () => {
      setIsReadingSpeech(false);
    });
  }, [currentQuestion]);

  // Read automatically on question change if speech is enabled
  useEffect(() => {
    if (isSpeechEnabled && gameStatus === 'PLAYING') {
      const timer = setTimeout(() => {
        readQuestionAloud();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentLevelIndex, isSpeechEnabled, gameStatus, readQuestionAloud]);

  // Handle changing age group
  const handleSelectAgeGroup = (newAge: AgeGroup) => {
    setAgeGroup(newAge);
    soundEngine.stopSpeaking();
    const newPool = getGameQuestionPool(newAge, 16);
    setQuestionPool(newPool);
    setCurrentLevelIndex(0);
    setSelectedIndex(null);
    setEliminatedIndices([]);
    setGameStatus('PLAYING');
    setTotalCorrectAnswers(0);
    setLifelines({
      fiftyFifty: true,
      audiencePoll: true,
      expertHint: true,
      flipQuestion: true,
    });
  };

  // Handle selecting an option
  const handleSelectOption = (index: number) => {
    if (gameStatus !== 'PLAYING') return;
    soundEngine.playSelect();
    setSelectedIndex(index);
  };

  // Clear current selection
  const handleClearSelection = () => {
    if (gameStatus !== 'PLAYING') return;
    setSelectedIndex(null);
  };

  // Lock answer ("Lock Kiya Jaye?")
  const handleConfirmLock = () => {
    if (selectedIndex === null || gameStatus !== 'PLAYING') return;
    soundEngine.stopSpeaking();
    soundEngine.playLock();
    setGameStatus('LOCKED');

    // Dramatic KBC suspense delay
    setTimeout(() => {
      soundEngine.playTick();
    }, 450);

    setTimeout(() => {
      const isCorrect = selectedIndex === currentQuestion.correctIndex;
      if (isCorrect) {
        soundEngine.playCorrect();
        setGameStatus('REVEALED_CORRECT');
        setTotalCorrectAnswers(prev => prev + 1);

        // If reached 16th question and answered correctly, win grand jackpot!
        if (currentLevelNumber === 16) {
          setTimeout(() => {
            soundEngine.playGrandWin();
            setShowVictoryModal(true);
            setGameStatus('WON');
          }, 1200);
        }
      } else {
        soundEngine.playWrong();
        setGameStatus('REVEALED_WRONG');
        setTimeout(() => {
          setShowVictoryModal(true);
          setGameStatus('GAME_OVER');
        }, 2200);
      }
    }, 1500);
  };

  // Move to next question after correct reveal
  const handleNextQuestion = () => {
    soundEngine.stopSpeaking();
    if (currentLevelIndex < 15) {
      setCurrentLevelIndex(prev => prev + 1);
      setSelectedIndex(null);
      setEliminatedIndices([]);
      setGameStatus('PLAYING');
    }
  };

  // Restart game
  const handleRestartGame = () => {
    soundEngine.stopSpeaking();
    setShowVictoryModal(false);
    const newPool = getGameQuestionPool(ageGroup, 16);
    setQuestionPool(newPool);
    setCurrentLevelIndex(0);
    setSelectedIndex(null);
    setEliminatedIndices([]);
    setGameStatus('PLAYING');
    setTotalCorrectAnswers(0);
    setLifelines({
      fiftyFifty: true,
      audiencePoll: true,
      expertHint: true,
      flipQuestion: true,
    });
  };

  // Lifeline: 50:50
  const handleUseFiftyFifty = () => {
    if (!lifelines.fiftyFifty || gameStatus !== 'PLAYING') return;
    soundEngine.playLifeline();

    const correctIdx = currentQuestion.correctIndex;
    const incorrectIndices = [0, 1, 2, 3].filter(i => i !== correctIdx);
    // Shuffle incorrect indices and pick 2 to eliminate
    const shuffledIncorrect = [...incorrectIndices].sort(() => 0.5 - Math.random());
    const toEliminate = shuffledIncorrect.slice(0, 2);

    setEliminatedIndices(toEliminate);
    setLifelines(prev => ({ ...prev, fiftyFifty: false }));

    // If current selected option was eliminated, unselect it
    if (selectedIndex !== null && toEliminate.includes(selectedIndex)) {
      setSelectedIndex(null);
    }
  };

  // Lifeline: Audience Poll
  const handleUseAudiencePoll = () => {
    if (!lifelines.audiencePoll || gameStatus !== 'PLAYING') return;
    soundEngine.playLifeline();
    setShowAudienceModal(true);
    setLifelines(prev => ({ ...prev, audiencePoll: false }));
  };

  // Lifeline: Ask Computer Ji (Hint)
  const handleUseExpertHint = () => {
    if (!lifelines.expertHint || gameStatus !== 'PLAYING') return;
    soundEngine.playLifeline();
    setShowHintModal(true);
    setLifelines(prev => ({ ...prev, expertHint: false }));
  };

  // Lifeline: Flip The Question
  const handleUseFlipQuestion = () => {
    if (!lifelines.flipQuestion || gameStatus !== 'PLAYING') return;
    soundEngine.playLifeline();
    soundEngine.stopSpeaking();

    // Get a different question not currently in active slot
    const alternateQuestions = INITIAL_QUESTIONS.filter(q => q.id !== currentQuestion.id);
    const randomReplacement = alternateQuestions[Math.floor(Math.random() * alternateQuestions.length)];
    const shuffledReplacement = shuffleQuestionOptions({
      ...randomReplacement,
      id: `flipped-${Date.now()}`
    });

    setQuestionPool(prev => {
      const updated = [...prev];
      updated[currentLevelIndex] = shuffledReplacement;
      return updated;
    });

    setSelectedIndex(null);
    setEliminatedIndices([]);
    setLifelines(prev => ({ ...prev, flipQuestion: false }));
  };

  // Handle custom AI question injected
  const handleCustomQuestionReady = (customQ: Question) => {
    setQuestionPool(prev => {
      const updated = [...prev];
      updated[currentLevelIndex] = customQ;
      return updated;
    });
    setSelectedIndex(null);
    setEliminatedIndices([]);
    soundEngine.playLifeline();
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEngine.isMuted = nextMute;
  };

  // Toggle Speech
  const handleToggleSpeech = () => {
    const nextSpeech = !isSpeechEnabled;
    setIsSpeechEnabled(nextSpeech);
    soundEngine.isSpeechEnabled = nextSpeech;
    if (!nextSpeech) {
      soundEngine.stopSpeaking();
      setIsReadingSpeech(false);
    } else {
      readQuestionAloud();
    }
  };

  const ageGroupLabel = ageGroup === 'toddler' ? 'Ages 3–5' : ageGroup === 'junior' ? 'Ages 6–8' : 'All Ages (3–8)';

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
      {/* Background Stage Image Backdrop with dark blue radial studio lighting */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src={ASSET_IMAGES.stageBg}
          alt="KBC Studio Stage"
          className="w-full h-full object-cover opacity-20 filter contrast-125"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Cinematic gradient vignette overlays */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#030712]/70 to-[#030712]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/90 via-transparent to-[#030712]" />
      </div>

      {/* Top Header */}
      <Header
        ageGroup={ageGroup}
        onSelectAgeGroup={handleSelectAgeGroup}
        currentPrize={currentBankPrizeLabel}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isSpeechEnabled={isSpeechEnabled}
        onToggleSpeech={handleToggleSpeech}
        onOpenLadder={() => setIsLadderOpenMobile(true)}
        level={currentLevelNumber}
      />

      {/* Main KBC Stage Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 flex flex-col lg:flex-row gap-6 items-start">
        {/* Left / Center Zone: Quiz Studio Screen */}
        <div className="flex-1 w-full flex flex-col justify-between">
          {/* Lifelines Bar & AI Generator Trigger */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <LifelinesBar
              lifelines={lifelines}
              onUseFiftyFifty={handleUseFiftyFifty}
              onUseAudiencePoll={handleUseAudiencePoll}
              onUseExpertHint={handleUseExpertHint}
              onUseFlipQuestion={handleUseFlipQuestion}
              disabled={gameStatus !== 'PLAYING'}
            />

            {/* Quick Random Statement / AI Topic button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAIGeneratorModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-md hover:border-amber-400 transition-all"
                title="Create a custom question about any topic"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>AI Topic Question</span>
              </button>

              <button
                onClick={handleUseFlipQuestion}
                disabled={gameStatus !== 'PLAYING'}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-sky-500/40 text-sky-300 text-xs font-bold shadow-md hover:border-sky-400 transition-all disabled:opacity-40"
                title="Give another random statement"
              >
                <Dices className="w-3.5 h-3.5 text-sky-400" />
                <span>Random Statement</span>
              </button>
            </div>
          </div>

          {/* Question Box */}
          <QuestionBox
            question={currentQuestion}
            questionNumber={currentLevelNumber}
            prizeAmount={currentLevelTier.label}
            onReadAloud={readQuestionAloud}
            isReading={isReadingSpeech}
          />

          {/* Options Grid (A, B, C, D) */}
          <OptionsGrid
            options={currentQuestion.options}
            correctIndex={currentQuestion.correctIndex}
            selectedIndex={selectedIndex}
            gameStatus={gameStatus}
            eliminatedIndices={eliminatedIndices}
            onSelectOption={handleSelectOption}
            disabled={gameStatus !== 'PLAYING'}
          />

          {/* Lock Confirmation / Next Question Bar */}
          <LockConfirmationBar
            selectedIndex={selectedIndex}
            gameStatus={gameStatus}
            selectedOptionText={selectedIndex !== null ? currentQuestion.options[selectedIndex] : ''}
            onConfirmLock={handleConfirmLock}
            onNextQuestion={handleNextQuestion}
            onClearSelection={handleClearSelection}
            isGameOver={gameStatus === 'GAME_OVER' || gameStatus === 'WON'}
          />

          {/* Host Dialog (Computer Ji Commentary) */}
          <HostDialog
            gameStatus={gameStatus}
            explanation={currentQuestion.explanation}
            correctAnswerText={currentQuestion.options[currentQuestion.correctIndex]}
            hostMessage={hostMessage}
          />
        </div>

        {/* Right Zone: Authentic KBC Prize Ladder */}
        <PrizeLadder
          currentLevel={currentLevelNumber}
          isOpenOnMobile={isLadderOpenMobile}
          onCloseMobile={() => setIsLadderOpenMobile(false)}
        />
      </main>

      {/* Lifeline Modals */}
      <AudiencePollModal
        isOpen={showAudienceModal}
        onClose={() => setShowAudienceModal(false)}
        correctIndex={currentQuestion.correctIndex}
        options={currentQuestion.options}
        eliminatedIndices={eliminatedIndices}
      />

      <ComputerJiHintModal
        isOpen={showHintModal}
        onClose={() => setShowHintModal(false)}
        hint={currentQuestion.hint}
      />

      <AITopicGeneratorModal
        isOpen={showAIGeneratorModal}
        onClose={() => setShowAIGeneratorModal(false)}
        ageGroup={ageGroup}
        onCustomQuestionReady={handleCustomQuestionReady}
      />

      {/* Victory / End of Game Celebration */}
      <VictoryModal
        isOpen={showVictoryModal}
        isGrandWinner={currentLevelNumber === 16 && gameStatus === 'WON'}
        scoreLabel={
          gameStatus === 'WON'
            ? '7 CRORE 🏆'
            : currentLevelNumber > 10
            ? '3,20,000 ⭐'
            : currentLevelNumber > 5
            ? '10,000 ⭐'
            : `${currentBankPrizeLabel}`
        }
        totalCorrect={totalCorrectAnswers}
        onRestart={handleRestartGame}
        ageGroupLabel={ageGroupLabel}
      />

      {/* Quiet Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/80 py-3 px-4 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>KBC Junior Star Quiz · Designed for Curious Young Minds (Ages 3–8)</span>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Guaranteed Safe Milestone: {safePrizeLabel}</span>
            <button
              onClick={handleRestartGame}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Restart Quiz</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
