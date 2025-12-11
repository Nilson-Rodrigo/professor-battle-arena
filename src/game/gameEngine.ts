/**
 * ===========================================
 * MOTOR DO JOGO - SIMULAÇÃO DE THREADS
 * ===========================================
 * 
 * Este arquivo contém toda a lógica do jogo.
 * 
 * CONCEITO DE THREADS:
 * - Cada professor representa uma "thread" no sistema
 * - O escalonador (scheduler) decide qual thread executa
 * - Usamos Round-Robin: cada thread tem sua vez em ordem
 * 
 * CONCEITO DE ESCALONAMENTO:
 * - Round-Robin: cada processo recebe um "quantum" de tempo
 * - Quando o quantum acaba, o próximo processo executa
 * - Aqui, cada "quantum" é um ataque
 */

import { Professor, ProfessorName, AttackResult, BattleLog } from './types';

/**
 * Dados iniciais dos professores
 * Cada um tem atributos balanceados para tornar a batalha interessante
 */
export const PROFESSOR_DATA: Record<ProfessorName, Omit<Professor, 'hp' | 'maxHp' | 'isAlive' | 'threadId'>> = {
  maykol: {
    name: 'maykol',
    displayName: 'Maykol',
    attack: 18,      // Alto ataque
    defense: 8,      // Baixa defesa
    speed: 35,       // Velocidade média
    color: 'professor-maykol',
  },
  sekeff: {
    name: 'sekeff',
    displayName: 'Sekeff',
    attack: 12,      // Ataque médio
    defense: 15,     // Alta defesa
    speed: 25,       // Velocidade baixa
    color: 'professor-sekeff',
  },
  iallen: {
    name: 'iallen',
    displayName: 'Iallen',
    attack: 14,      // Ataque médio-alto
    defense: 10,     // Defesa média
    speed: 45,       // Alta velocidade
    color: 'professor-iallen',
  },
  jivago: {
    name: 'jivago',
    displayName: 'Jivago',
    attack: 16,      // Ataque alto
    defense: 12,     // Defesa média-alta
    speed: 30,       // Velocidade média
    color: 'professor-jivago',
  },
  maylon: {
    name: 'maylon',
    displayName: 'Maylon',
    attack: 10,      // Ataque baixo
    defense: 18,     // Defesa muito alta
    speed: 40,       // Velocidade alta
    color: 'professor-maylon',
  },
  jeferson: {
    name: 'jeferson',
    displayName: 'Jeferson',
    attack: 20,      // Ataque muito alto
    defense: 6,      // Defesa muito baixa
    speed: 50,       // Velocidade muito alta
    color: 'professor-jeferson',
  },
};

/**
 * Cria um professor com todos os atributos inicializados
 * @param name - Nome do professor
 * @param threadId - ID da thread (simulação)
 * @returns Professor completo
 */
export function createProfessor(name: ProfessorName, threadId: number): Professor {
  const data = PROFESSOR_DATA[name];
  return {
    ...data,
    hp: 100,           // Vida inicial
    maxHp: 100,        // Vida máxima
    isAlive: true,     // Começa vivo
    threadId,          // ID da thread
  };
}

/**
 * Cria todos os professores para uma nova batalha
 * @returns Array com todos os professores
 */
export function createAllProfessors(): Professor[] {
  const names: ProfessorName[] = ['maykol', 'sekeff', 'iallen', 'jivago', 'maylon', 'jeferson'];
  return names.map((name, index) => createProfessor(name, index));
}

/**
 * ESCALONADOR ROUND-ROBIN
 * 
 * Escolhe qual "thread" (professor) vai executar agora.
 * Round-Robin: cada thread executa em ordem, depois volta ao início.
 * 
 * @param professors - Lista de professores
 * @param lastAttackerIndex - Índice do último atacante
 * @returns Índice do próximo atacante
 */
export function scheduleNextAttacker(professors: Professor[], lastAttackerIndex: number): number {
  // Pega apenas os professores vivos
  const aliveProfessors = professors.filter(p => p.isAlive);
  
  if (aliveProfessors.length <= 1) {
    return -1; // Jogo acabou
  }

  // Round-Robin: próximo na fila
  let nextIndex = (lastAttackerIndex + 1) % professors.length;
  
  // Procura o próximo professor VIVO
  while (!professors[nextIndex].isAlive) {
    nextIndex = (nextIndex + 1) % professors.length;
  }
  
  return nextIndex;
}

/**
 * Escolhe um defensor aleatório (diferente do atacante e vivo)
 * @param professors - Lista de professores
 * @param attackerIndex - Índice do atacante
 * @returns Índice do defensor
 */
export function chooseDefender(professors: Professor[], attackerIndex: number): number {
  // Filtra professores vivos que não são o atacante
  const possibleDefenders = professors
    .map((p, i) => ({ professor: p, index: i }))
    .filter(({ professor, index }) => professor.isAlive && index !== attackerIndex);
  
  if (possibleDefenders.length === 0) {
    return -1;
  }
  
  // Escolhe aleatoriamente
  const randomIndex = Math.floor(Math.random() * possibleDefenders.length);
  return possibleDefenders[randomIndex].index;
}

/**
 * Calcula o resultado de um ataque
 * 
 * MECÂNICA:
 * 1. Verifica se o defensor desvia (baseado na velocidade)
 * 2. Se não desviar, calcula o dano: ataque - defesa (mínimo 1)
 * 3. 10% de chance de crítico (dano dobrado)
 * 
 * @param attacker - Professor atacante
 * @param defender - Professor defensor
 * @returns Resultado do ataque
 */
export function calculateAttack(attacker: Professor, defender: Professor): AttackResult {
  // 1. Verifica se o defensor desvia
  // Chance de desvio = velocidade do defensor (em %)
  const dodgeRoll = Math.random() * 100;
  const dodged = dodgeRoll < defender.speed;
  
  if (dodged) {
    return {
      attacker,
      defender,
      damage: 0,
      dodged: true,
      critical: false,
    };
  }
  
  // 2. Calcula o dano base
  let damage = attacker.attack - defender.defense;
  
  // Dano mínimo é 1 (sempre causa algum dano se acertar)
  damage = Math.max(1, damage);
  
  // 3. Verifica crítico (10% de chance)
  const criticalRoll = Math.random() * 100;
  const critical = criticalRoll < 10;
  
  if (critical) {
    damage *= 2; // Dano dobrado no crítico!
  }
  
  return {
    attacker,
    defender,
    damage,
    dodged: false,
    critical,
  };
}

/**
 * Aplica o dano ao defensor
 * @param defender - Professor que recebeu o ataque
 * @param damage - Quantidade de dano
 * @returns Professor atualizado
 */
export function applyDamage(defender: Professor, damage: number): Professor {
  const newHp = Math.max(0, defender.hp - damage);
  
  return {
    ...defender,
    hp: newHp,
    isAlive: newHp > 0,
  };
}

/**
 * Verifica se há um vencedor
 * @param professors - Lista de professores
 * @returns O vencedor ou null se a batalha continua
 */
export function checkWinner(professors: Professor[]): Professor | null {
  const aliveProfessors = professors.filter(p => p.isAlive);
  
  if (aliveProfessors.length === 1) {
    return aliveProfessors[0];
  }
  
  return null;
}

/**
 * Cria uma entrada de log
 * @param message - Mensagem do log
 * @param type - Tipo do evento
 * @returns Entrada de log
 */
let logIdCounter = 0;
export function createLogEntry(
  message: string, 
  type: BattleLog['type']
): BattleLog {
  return {
    id: ++logIdCounter,
    message,
    type,
    timestamp: Date.now(),
  };
}

/**
 * Reseta o contador de log (para novo jogo)
 */
export function resetLogCounter(): void {
  logIdCounter = 0;
}
