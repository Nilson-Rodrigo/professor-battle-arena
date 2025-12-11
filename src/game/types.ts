/**
 * ===========================================
 * TIPOS DO JOGO - BATALHA DE PROFESSORES
 * ===========================================
 * 
 * Este arquivo define todos os tipos usados no jogo.
 * Pense neles como "moldes" que definem a estrutura dos dados.
 */

// Nomes dos professores disponíveis
export type ProfessorName = 'maykol' | 'sekeff' | 'iallen' | 'jivago' | 'maylon' | 'jeferson';

/**
 * Interface que define um Professor
 * Cada professor tem atributos como em um jogo de RPG
 */
export interface Professor {
  name: ProfessorName;        // Nome do professor
  displayName: string;        // Nome para exibição (capitalizado)
  hp: number;                 // HP atual (vida)
  maxHp: number;              // HP máximo
  attack: number;             // Poder de ataque
  defense: number;            // Capacidade de reduzir dano
  speed: number;              // Velocidade (chance de desviar, 0-100)
  isAlive: boolean;           // Se ainda está vivo
  color: string;              // Cor do professor (para UI)
  threadId: number;           // ID da "thread" (simulação)
}

/**
 * Interface para uma entrada no log de batalha
 */
export interface BattleLog {
  id: number;                 // ID único do log
  message: string;            // Mensagem do que aconteceu
  type: 'attack' | 'dodge' | 'death' | 'winner' | 'info';  // Tipo de evento
  timestamp: number;          // Quando aconteceu
}

/**
 * Estado do jogo
 */
export interface GameState {
  professors: Professor[];    // Lista de professores
  battleLog: BattleLog[];     // Histórico da batalha
  isRunning: boolean;         // Se a batalha está acontecendo
  isPaused: boolean;          // Se está pausado
  winner: Professor | null;   // Vencedor (se houver)
  currentTurn: number;        // Número do turno atual
  schedulerQueue: number[];   // Fila do escalonador (IDs das threads)
}

/**
 * Resultado de um ataque
 */
export interface AttackResult {
  attacker: Professor;        // Quem atacou
  defender: Professor;        // Quem defendeu
  damage: number;             // Dano causado
  dodged: boolean;            // Se o defensor desviou
  critical: boolean;          // Se foi crítico (10% de chance)
}
