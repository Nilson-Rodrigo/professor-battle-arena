/**
 * ===========================================
 * PÁGINA PRINCIPAL: BATALHA DE PROFESSORES
 * ===========================================
 * 
 * Jogo didático que simula conceitos de:
 * - Threads (cada professor é uma thread)
 * - Escalonamento Round-Robin
 * - Conceitos de Deadlock e Livelock
 * 
 * Desenvolvido para fins educacionais.
 */

import { useGameState } from '@/hooks/useGameState';
import { ProfessorCard } from '@/components/game/ProfessorCard';
import { BattleLogDisplay } from '@/components/game/BattleLogDisplay';
import { ThreadExplanation } from '@/components/game/ThreadExplanation';
import { GameControls } from '@/components/game/GameControls';
import { SchedulerVisualization } from '@/components/game/SchedulerVisualization';

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
    <div className="min-h-screen p-4 md:p-8">
      {/* Título */}
      <header className="text-center mb-8">
        <h1 className="font-chalk text-4xl md:text-5xl chalk-text mb-2">
          🎮 Batalha de Professores
        </h1>
        <p className="font-hand text-lg text-muted-foreground">
          Simulação didática de Threads e Escalonamento
        </p>
        <p className="font-hand text-sm text-muted-foreground mt-1">
          Cada professor = 1 Thread | Escalonamento Round-Robin
        </p>
      </header>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Visualização do Escalonador */}
        <SchedulerVisualization 
          professors={professors}
          currentAttackerIndex={currentAttackerIndex}
          currentTurn={currentTurn}
        />

        {/* Grid de Professores (Threads) */}
        <div className="chalkboard-frame rounded-lg p-4">
          <h2 className="font-chalk text-xl mb-4 chalk-text">
            🧑‍🏫 Professores (Threads)
          </h2>
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

        {/* Controles e Log */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
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
            <BattleLogDisplay logs={battleLog} />
          </div>
          
          <ThreadExplanation />
        </div>

        {/* Rodapé com explicação rápida */}
        <footer className="chalkboard-frame rounded-lg p-4 text-center">
          <h3 className="font-chalk text-lg mb-2 chalk-text">
            💡 Como isso simula Threads?
          </h3>
          <div className="font-hand text-sm text-muted-foreground space-y-2 max-w-2xl mx-auto">
            <p>
              Cada <strong className="text-primary">professor é uma "thread"</strong> com seu próprio ID (T0-T5).
              O <strong className="text-primary">escalonador Round-Robin</strong> decide qual thread executa a cada turno.
            </p>
            <p>
              Usamos <code className="bg-secondary px-1 rounded">async/await</code> e <code className="bg-secondary px-1 rounded">setTimeout</code> para 
              simular a execução assíncrona, similar a como threads reais funcionariam.
            </p>
            <p className="text-xs">
              ⚠️ Nota: JavaScript é single-threaded. Para threads reais, use Web Workers ou Worker Threads (Node.js).
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
