/**
 * ===========================================
 * COMPONENTE: CARD DO PROFESSOR (Grande)
 * ===========================================
 * 
 * Exibe um professor com avatar, stats e efeitos visuais.
 * Design moderno com glassmorphism.
 */

import { Professor } from '@/game/types';
import { cn } from '@/lib/utils';
import { Swords, Shield, Zap, Heart } from 'lucide-react';
interface ProfessorCardProps {
  professor: Professor;
  isAttacking?: boolean;
  isDefending?: boolean;
  isWinner?: boolean;
}

// Mapeamento de avatar por nome do professor
const avatarMap: Record<string, string> = {
  maykol: '/avatars/maykol.png',
  sekeff: '/avatars/sekeff.png',
  iallen: '/avatars/iallen.jpg',
  jivago: '/avatars/jivago.jpg',
  maylon: '/avatars/maylon.jpg',
  jeferson: '/avatars/jeferson.jpg'
};

// Cores de borda e glow por professor
const colorMap: Record<string, {
  border: string;
  glow: string;
  bg: string;
}> = {
  maykol: {
    border: 'border-red-500/60',
    glow: 'shadow-red-500/30',
    bg: 'from-red-500/10'
  },
  sekeff: {
    border: 'border-orange-500/60',
    glow: 'shadow-orange-500/30',
    bg: 'from-orange-500/10'
  },
  iallen: {
    border: 'border-yellow-500/60',
    glow: 'shadow-yellow-500/30',
    bg: 'from-yellow-500/10'
  },
  jivago: {
    border: 'border-green-500/60',
    glow: 'shadow-green-500/30',
    bg: 'from-green-500/10'
  },
  maylon: {
    border: 'border-blue-500/60',
    glow: 'shadow-blue-500/30',
    bg: 'from-blue-500/10'
  },
  jeferson: {
    border: 'border-purple-500/60',
    glow: 'shadow-purple-500/30',
    bg: 'from-purple-500/10'
  }
};
export function ProfessorCard({
  professor,
  isAttacking,
  isDefending,
  isWinner
}: ProfessorCardProps) {
  const hpPercentage = professor.hp / professor.maxHp * 100;
  const colors = colorMap[professor.name];
  const hpBarColor = hpPercentage > 50 ? 'bg-gradient-to-r from-green-500 to-emerald-400' : hpPercentage > 25 ? 'bg-gradient-to-r from-yellow-500 to-orange-400' : 'bg-gradient-to-r from-red-600 to-red-400';
  return <div className={cn('professor-card relative rounded-2xl border-2 transition-all duration-300', 'backdrop-blur-md bg-gradient-to-b to-card/60', 'shadow-lg hover:shadow-xl', 'overflow-hidden', colors.border, colors.glow, colors.bg, !professor.isAlive && 'opacity-50 grayscale', isAttacking && 'attack-shake ring-2 ring-primary scale-105', isDefending && 'damage-flash', isWinner && 'victory-glow ring-2 ring-yellow-400')}>
      {/* Indicador de Thread */}
      <div className="absolute top-2 right-2 z-10">
        <div className={cn('px-2 py-1 rounded-lg text-xs font-mono font-bold', 'backdrop-blur-sm bg-background/60 border border-border/50', professor.isAlive && 'animate-pulse')}>
          T{professor.threadId}
        </div>
      </div>

      {/* Indicador de Vencedor */}
      {isWinner && <div className="absolute top-2 left-2 z-10 bg-yellow-500 text-yellow-950 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
          🏆 VENCEDOR!
        </div>}

      {/* Avatar Grande */}
      <div className="relative p-4 pb-0">
        <div className={cn('mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden', 'border-3 shadow-lg', colors.border, isAttacking && 'animate-pulse')}>
          <img src={avatarMap[professor.name]} alt={professor.displayName} className="w-full h-full object-fill" />
        </div>
      </div>

      {/* Nome */}
      <h3 className="text-center font-bold text-lg mt-3 text-foreground">
        {professor.displayName}
      </h3>

      {/* HP Bar */}
      <div className="px-4 mt-3">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Heart className="w-3 h-3 text-red-400" />
            HP
          </span>
          <span className="font-mono font-semibold">{professor.hp}/{professor.maxHp}</span>
        </div>
        <div className="h-3 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm">
          <div className={cn('h-full rounded-full transition-all duration-500', hpBarColor)} style={{
          width: `${hpPercentage}%`
        }} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 p-4 mt-2">
        <div className="flex flex-col items-center p-2 rounded-xl bg-muted/30 backdrop-blur-sm">
          <Swords className="w-4 h-4 mb-1 text-red-400" />
          <span className="font-bold text-sm">{professor.attack}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wide">ATK</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-xl bg-muted/30 backdrop-blur-sm">
          <Shield className="w-4 h-4 mb-1 text-blue-400" />
          <span className="font-bold text-sm">{professor.defense}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wide">DEF</span>
        </div>
        <div className="flex flex-col items-center p-2 rounded-xl bg-muted/30 backdrop-blur-sm">
          <Zap className="w-4 h-4 mb-1 text-yellow-400" />
          <span className="font-bold text-sm">{professor.speed}%</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wide">SPD</span>
        </div>
      </div>

      {/* Overlay de Eliminado */}
      {!professor.isAlive && <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
          <span className="text-destructive text-2xl font-bold tracking-wider">ELIMINADO</span>
        </div>}
    </div>;
}