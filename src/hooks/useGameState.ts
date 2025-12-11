/**
 * ===========================================
 * HOOK: ESTADO DO JOGO
 * ===========================================
 * 
 * Este hook gerencia todo o estado do jogo e a lógica
 * de simulação de threads usando async/await.
 * 
 * IMPORTANTE: Este é um exemplo didático!
 * Não usamos threads reais do sistema, mas simulamos
 * o comportamento de escalonamento usando setTimeout.
 */

import { useState, useCallback, useRef } from 'react';
import { Professor, BattleLog, GameState } from '@/game/types';
import {
  createAllProfessors,
  scheduleNextAttacker,
  chooseDefender,
  calculateAttack,
  applyDamage,
  checkWinner,
  createLogEntry,
  resetLogCounter,
} from '@/game/gameEngine';

/**
 * Hook principal do jogo
 * Retorna o estado e funções para controlar a batalha
 */
export function useGameState() {
  // Estado dos professores
  const [professors, setProfessors] = useState<Professor[]>(createAllProfessors());
  
  // Log de batalha
  const [battleLog, setBattleLog] = useState<BattleLog[]>([]);
  
  // Estados de controle
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [winner, setWinner] = useState<Professor | null>(null);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentAttackerIndex, setCurrentAttackerIndex] = useState(-1);
  const [currentDefenderIndex, setCurrentDefenderIndex] = useState(-1);
  const [speed, setSpeed] = useState(800); // ms entre turnos
  
  // Refs para controle do loop (evita problemas com closures)
  const isRunningRef = useRef(false);
  const isPausedRef = useRef(false);
  const speedRef = useRef(speed);
  
  // Atualiza as refs quando o estado muda
  speedRef.current = speed;

  /**
   * Adiciona uma entrada ao log
   */
  const addLog = useCallback((message: string, type: BattleLog['type']) => {
    const entry = createLogEntry(message, type);
    setBattleLog(prev => [...prev, entry]);
  }, []);

  /**
   * Função que espera um tempo (simula o "quantum" da thread)
   * Isso é como se fosse o tempo que a thread tem para executar
   */
  const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  /**
   * Executa um turno de batalha
   * Esta é a função que simula uma "thread" executando
   */
  const executeTurn = useCallback(async (
    currentProfessors: Professor[],
    lastAttackerIdx: number
  ): Promise<{ updatedProfessors: Professor[]; attackerIdx: number; defenderIdx: number }> => {
    // 1. ESCALONADOR: Escolhe qual thread vai executar (Round-Robin)
    const attackerIdx = scheduleNextAttacker(currentProfessors, lastAttackerIdx);
    
    if (attackerIdx === -1) {
      return { updatedProfessors: currentProfessors, attackerIdx: -1, defenderIdx: -1 };
    }
    
    // 2. Escolhe o defensor
    const defenderIdx = chooseDefender(currentProfessors, attackerIdx);
    
    if (defenderIdx === -1) {
      return { updatedProfessors: currentProfessors, attackerIdx, defenderIdx: -1 };
    }
    
    const attacker = currentProfessors[attackerIdx];
    const defender = currentProfessors[defenderIdx];
    
    // 3. A "THREAD" EXECUTA: Calcula o ataque
    const result = calculateAttack(attacker, defender);
    
    // 4. Processa o resultado
    let updatedProfessors = [...currentProfessors];
    
    if (result.dodged) {
      // Defensor desviou!
      addLog(
        `🌀 [Thread ${attacker.threadId}] ${attacker.displayName} atacou ${defender.displayName}, mas ele desviou! (Velocidade: ${defender.speed}%)`,
        'dodge'
      );
    } else {
      // Ataque acertou
      const updatedDefender = applyDamage(defender, result.damage);
      updatedProfessors[defenderIdx] = updatedDefender;
      
      const critText = result.critical ? ' CRÍTICO!' : '';
      addLog(
        `⚔️ [Thread ${attacker.threadId}] ${attacker.displayName} causou ${result.damage} de dano${critText} em ${defender.displayName}! (HP: ${updatedDefender.hp}/${updatedDefender.maxHp})`,
        'attack'
      );
      
      // Verifica se o defensor morreu
      if (!updatedDefender.isAlive) {
        addLog(
          `💀 [Thread ${defender.threadId}] ${defender.displayName} foi eliminado! Thread encerrada.`,
          'death'
        );
      }
    }
    
    return { updatedProfessors, attackerIdx, defenderIdx };
  }, [addLog]);

  /**
   * LOOP PRINCIPAL DO JOGO
   * Simula o escalonador do sistema operacional
   */
  const gameLoop = useCallback(async () => {
    isRunningRef.current = true;
    let currentProfessors = [...professors];
    let lastAttackerIdx = -1;
    let turn = 0;
    
    addLog('🎮 Batalha iniciada! Escalonador Round-Robin ativado.', 'info');
    addLog('📋 Cada professor (thread) terá sua vez de atacar em ordem.', 'info');
    
    // Loop enquanto não há vencedor e não foi parado
    while (isRunningRef.current) {
      // Verifica pausa
      while (isPausedRef.current && isRunningRef.current) {
        await sleep(100);
      }
      
      if (!isRunningRef.current) break;
      
      turn++;
      setCurrentTurn(turn);
      
      // Executa o turno
      const { updatedProfessors, attackerIdx, defenderIdx } = await executeTurn(
        currentProfessors,
        lastAttackerIdx
      );
      
      currentProfessors = updatedProfessors;
      lastAttackerIdx = attackerIdx;
      
      // Atualiza o estado visual
      setProfessors([...currentProfessors]);
      setCurrentAttackerIndex(attackerIdx);
      setCurrentDefenderIndex(defenderIdx);
      
      // Verifica vencedor
      const gameWinner = checkWinner(currentProfessors);
      if (gameWinner) {
        addLog(
          `🏆 ${gameWinner.displayName} (Thread ${gameWinner.threadId}) é o VENCEDOR!`,
          'winner'
        );
        setWinner(gameWinner);
        isRunningRef.current = false;
        setIsRunning(false);
        break;
      }
      
      // Espera antes do próximo turno (simula o quantum)
      await sleep(speedRef.current);
    }
  }, [professors, executeTurn, addLog]);

  /**
   * Inicia a batalha
   */
  const startGame = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
    isPausedRef.current = false;
    gameLoop();
  }, [gameLoop]);

  /**
   * Pausa a batalha
   */
  const pauseGame = useCallback(() => {
    setIsPaused(true);
    isPausedRef.current = true;
    addLog('⏸️ Batalha pausada. Threads em espera.', 'info');
  }, [addLog]);

  /**
   * Continua a batalha
   */
  const resumeGame = useCallback(() => {
    setIsPaused(false);
    isPausedRef.current = false;
    addLog('▶️ Batalha retomada. Threads reativadas.', 'info');
  }, [addLog]);

  /**
   * Reinicia o jogo
   */
  const resetGame = useCallback(() => {
    isRunningRef.current = false;
    isPausedRef.current = false;
    resetLogCounter();
    
    setProfessors(createAllProfessors());
    setBattleLog([]);
    setIsRunning(false);
    setIsPaused(false);
    setWinner(null);
    setCurrentTurn(0);
    setCurrentAttackerIndex(-1);
    setCurrentDefenderIndex(-1);
  }, []);

  /**
   * Altera a velocidade
   */
  const changeSpeed = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
    speedRef.current = newSpeed;
  }, []);

  return {
    // Estado
    professors,
    battleLog,
    isRunning,
    isPaused,
    winner,
    currentTurn,
    currentAttackerIndex,
    currentDefenderIndex,
    speed,
    
    // Ações
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    changeSpeed,
  };
}
