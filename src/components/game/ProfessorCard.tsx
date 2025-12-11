/**
 * ===========================================
 * COMPONENTE: CARD DO PROFESSOR
 * ===========================================
 * 
 * Exibe um professor com todos os seus atributos.
 * Cada card representa uma "thread" no sistema.
 */

import { Professor } from '@/game/types';
import { cn } from '@/lib/utils';
import { Swords, Shield, Zap, Heart } from 'lucide-react';

interface ProfessorCardProps {
  professor: Professor;
  isAttacking?: boolean;    // Se está atacando neste turno
  isDefending?: boolean;    // Se está sendo atacado
  isWinner?: boolean;       // Se é o vencedor
}

// Mapeamento de cores para cada professor
const colorMap: Record<string, string> = {
  'professor-maykol': 'border-red-400 bg-red-500/10',
  'professor-sekeff': 'border-orange-400 bg-orange-500/10',
  'professor-iallen': 'border-yellow-400 bg-yellow-500/10',
  'professor-jivago': 'border-green-400 bg-green-500/10',
  'professor-maylon': 'border-blue-400 bg-blue-500/10',
  'professor-jeferson': 'border-purple-400 bg-purple-500/10',
};

const threadColorMap: Record<string, string> = {
  'professor-maykol': 'bg-red-500',
  'professor-sekeff': 'bg-orange-500',
  'professor-iallen': 'bg-yellow-500',
  'professor-jivago': 'bg-green-500',
  'professor-maylon': 'bg-blue-500',
  'professor-jeferson': 'bg-purple-500',
};

export function ProfessorCard({ professor, isAttacking, isDefending, isWinner }: ProfessorCardProps) {
  // Calcula a porcentagem de HP para a barra de vida
  const hpPercentage = (professor.hp / professor.maxHp) * 100;
  
  // Define a cor da barra de HP baseado na vida restante
  const hpBarColor = hpPercentage > 50 
    ? 'bg-hp-bar' 
    : hpPercentage > 25 
      ? 'bg-yellow-500' 
      : 'bg-hp-low';

  return (
    <div
      className={cn(
        'professor-card relative p-4 rounded-lg border-2 transition-all duration-300',
        colorMap[professor.color],
        !professor.isAlive && 'opacity-40 grayscale',
        isAttacking && 'attack-shake ring-2 ring-primary',
        isDefending && 'damage-flash',
        isWinner && 'victory-glow'
      )}
    >
      {/* Indicador de Thread (simula o ID da thread) */}
      <div className="absolute -top-2 -right-2 flex items-center gap-1">
        <div 
          className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-background',
            threadColorMap[professor.color],
            professor.isAlive && 'thread-pulse'
          )}
        >
          T{professor.threadId}
        </div>
      </div>

      {/* Nome do Professor */}
      <h3 className="font-chalk text-lg mb-2 chalk-text">
        {professor.displayName}
      </h3>

      {/* Barra de HP */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            HP
          </span>
          <span>{professor.hp}/{professor.maxHp}</span>
        </div>
        <div className="h-3 bg-hp-bg rounded-full overflow-hidden">
          <div 
            className={cn('hp-bar h-full rounded-full', hpBarColor)}
            style={{ width: `${hpPercentage}%` }}
          />
        </div>
      </div>

      {/* Status: Vivo ou Morto */}
      {!professor.isAlive && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg">
          <span className="font-chalk text-destructive text-xl">ELIMINADO</span>
        </div>
      )}

      {/* Indicador de Vencedor */}
      {isWinner && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold">
          🏆 VENCEDOR!
        </div>
      )}

      {/* Atributos */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="flex flex-col items-center p-1 bg-secondary/50 rounded">
          <Swords className="w-4 h-4 mb-1 text-destructive" />
          <span className="font-bold">{professor.attack}</span>
          <span className="text-muted-foreground">ATK</span>
        </div>
        <div className="flex flex-col items-center p-1 bg-secondary/50 rounded">
          <Shield className="w-4 h-4 mb-1 text-blue-400" />
          <span className="font-bold">{professor.defense}</span>
          <span className="text-muted-foreground">DEF</span>
        </div>
        <div className="flex flex-col items-center p-1 bg-secondary/50 rounded">
          <Zap className="w-4 h-4 mb-1 text-yellow-400" />
          <span className="font-bold">{professor.speed}%</span>
          <span className="text-muted-foreground">SPD</span>
        </div>
      </div>
    </div>
  );
}
