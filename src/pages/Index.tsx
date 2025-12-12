/**
 * ===========================================
 * PÁGINA PRINCIPAL: BATALHA DE PROFESSORES
 * ===========================================
 * 
 * Layout reorganizado e modernizado com glassmorphism.
 */

import { useGameState } from '@/hooks/useGameState';
import { ProfessorCard } from '@/components/game/ProfessorCard';
import { BattleLogDisplay } from '@/components/game/BattleLogDisplay';
import { ThreadExplanation } from '@/components/game/ThreadExplanation';
import { GameControls } from '@/components/game/GameControls';
import { SchedulerVisualization } from '@/components/game/SchedulerVisualization';
import { Cpu, Users, Gamepad2, ScrollText, BookOpen } from 'lucide-react';

const Index = () => {
  const {
    professors,
    battleLog,
    isRunning,
    isPaused,
    winner,
    currentTurn,
    currentAttackerIndex,
    currentDefenderIndex,
    speed,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    changeSpeed,
  } = useGameState();

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="text-center py-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            🎮 Batalha de Professores
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Simulação didática de Threads e Escalonamento Round-Robin
          </p>
          <div className="flex items-center justify-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              6 Threads
            </span>
            <span className="flex items-center gap-1">
              <Cpu className="w-4 h-4" />
              Round-Robin
            </span>
          </div>
        </header>

        {/* Seção 1: Escalonador Round-Robin */}
        <section>
          <SectionHeader 
            icon={<Cpu className="w-5 h-5" />} 
            title="Escalonador Round-Robin (T0–T5)" 
          />
          <SchedulerVisualization 
            professors={professors}
            currentAttackerIndex={currentAttackerIndex}
            currentTurn={currentTurn}
          />
        </section>

        {/* Seção 2: Professores (Threads) - Cards Grandes */}
        <section>
          <SectionHeader 
            icon={<Users className="w-5 h-5" />} 
            title="Professores (Threads)" 
          />
          <div className="rounded-2xl p-6 backdrop-blur-md bg-card/40 border border-border/50 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {professors.map((professor, index) => (
                <ProfessorCard
                  key={professor.threadId}
                  professor={professor}
                  isAttacking={index === currentAttackerIndex && isRunning}
                  isDefending={index === currentDefenderIndex && isRunning}
                  isWinner={winner?.threadId === professor.threadId}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Seção 3 e 4: Controles e Log lado a lado */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Controles */}
          <section>
            <SectionHeader 
              icon={<Gamepad2 className="w-5 h-5" />} 
              title="Controles da Batalha" 
            />
            <div className="rounded-2xl p-6 backdrop-blur-md bg-card/40 border border-border/50 shadow-xl h-[calc(100%-2.5rem)]">
              <GameControls
                isRunning={isRunning}
                isPaused={isPaused}
                hasWinner={winner !== null}
                speed={speed}
                onStart={startGame}
                onPause={pauseGame}
                onResume={resumeGame}
                onReset={resetGame}
                onSpeedChange={changeSpeed}
              />
            </div>
          </section>

          {/* Log da Batalha */}
          <section>
            <SectionHeader 
              icon={<ScrollText className="w-5 h-5" />} 
              title="Log da Batalha" 
            />
            <div className="rounded-2xl backdrop-blur-md bg-card/40 border border-border/50 shadow-xl h-[calc(100%-2.5rem)] overflow-hidden">
              <BattleLogDisplay logs={battleLog} />
            </div>
          </section>
        </div>

        {/* Seção 5: Conceitos de SO */}
        <section>
          <SectionHeader 
            icon={<BookOpen className="w-5 h-5" />} 
            title="Conceitos de Sistema Operacional" 
          />
          <div className="rounded-2xl backdrop-blur-md bg-card/40 border border-border/50 shadow-xl overflow-hidden">
            <ThreadExplanation />
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Nota:</span> JavaScript é single-threaded. 
            Para threads reais, use Web Workers ou Worker Threads (Node.js).
          </p>
        </footer>
      </div>
    </div>
  );
};

// Componente auxiliar para headers de seção
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-3">
      <span className="text-primary">{icon}</span>
      {title}
    </h2>
  );
}

export default Index;
