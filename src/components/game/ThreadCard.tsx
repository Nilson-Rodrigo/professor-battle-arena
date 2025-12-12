/**
 * ===========================================
 * COMPONENTE: THREAD CARD (Mini Card)
 * ===========================================
 * 
 * Card compacto para visualização no escalonador Round-Robin.
 * Mostra avatar, nome, thread ID e status com glassmorphism.
 */

import { Professor } from '@/game/types';
import { cn } from '@/lib/utils';

interface ThreadCardProps {
  professor: Professor;
  isRunning?: boolean;
  showArrow?: boolean;
}

// Mapeamento de avatar por nome do professor
const avatarMap: Record<string, string> = {
  maykol: '/avatars/maykol.png',
  sekeff: '/avatars/sekeff.png',
  iallen: '/avatars/iallen.jpg',
  jivago: '/avatars/jivago.jpg',
  maylon: '/avatars/maylon.jpg',
  jeferson: '/avatars/jeferson.jpg',
};

// Cores de borda por professor
const borderColorMap: Record<string, string> = {
  maykol: 'border-red-500/50 shadow-red-500/20',
  sekeff: 'border-orange-500/50 shadow-orange-500/20',
  iallen: 'border-yellow-500/50 shadow-yellow-500/20',
  jivago: 'border-green-500/50 shadow-green-500/20',
  maylon: 'border-blue-500/50 shadow-blue-500/20',
  jeferson: 'border-purple-500/50 shadow-purple-500/20',
};

const glowColorMap: Record<string, string> = {
  maykol: 'shadow-red-500/40',
  sekeff: 'shadow-orange-500/40',
  iallen: 'shadow-yellow-500/40',
  jivago: 'shadow-green-500/40',
  maylon: 'shadow-blue-500/40',
  jeferson: 'shadow-purple-500/40',
};

export function ThreadCard({ professor, isRunning }: ThreadCardProps) {
  const status = !professor.isAlive ? 'DEAD' : isRunning ? 'RUN' : 'READY';
  
  return (
    <div
      className={cn(
        'relative flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300',
        'backdrop-blur-md bg-card/40',
        'min-w-[90px]',
        borderColorMap[professor.name],
        !professor.isAlive && 'opacity-40 grayscale',
        isRunning && [
          'scale-110 z-10',
          'shadow-lg',
          glowColorMap[professor.name],
          'ring-2 ring-primary/50'
        ]
      )}
    >
      {/* Indicador RUN */}
      {isRunning && professor.isAlive && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold animate-pulse">
          ▶ RUN
        </div>
      )}
      
      {/* Avatar */}
      <div className={cn(
        'w-12 h-12 rounded-full overflow-hidden border-2 mb-2',
        'shadow-md',
        isRunning && 'border-primary'
      )}>
        <img
          src={avatarMap[professor.name]}
          alt={professor.displayName}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Nome */}
      <span className="text-sm font-semibold text-foreground truncate max-w-full">
        {professor.displayName}
      </span>
      
      {/* Thread ID */}
      <span className="text-xs text-muted-foreground font-mono">
        T{professor.threadId}
      </span>
      
      {/* Status Badge */}
      <span className={cn(
        'mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase',
        status === 'RUN' && 'bg-primary/20 text-primary',
        status === 'READY' && 'bg-green-500/20 text-green-400',
        status === 'DEAD' && 'bg-destructive/20 text-destructive'
      )}>
        {status}
      </span>
    </div>
  );
}
