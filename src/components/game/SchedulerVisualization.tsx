/**
 * ===========================================
 * COMPONENTE: VISUALIZAÇÃO DO ESCALONADOR
 * ===========================================
 * 
 * Mostra visualmente como o escalonador Round-Robin funciona,
 * usando cards modernos com avatares dos professores.
 */

import { Professor } from '@/game/types';
import { ThreadCard } from './ThreadCard';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface SchedulerVisualizationProps {
  professors: Professor[];
  currentAttackerIndex: number;
  currentTurn: number;
}

export function SchedulerVisualization({ 
  professors, 
  currentAttackerIndex,
  currentTurn 
}: SchedulerVisualizationProps) {
  return (
    <div className="rounded-2xl p-6 backdrop-blur-md bg-card/40 border border-border/50 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-primary" />
            Escalonador Round-Robin
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Cada thread executa 1 quantum (1 ataque) e passa a vez
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/30">
          <span className="text-sm text-muted-foreground">Turno:</span>
          <span className="text-2xl font-bold font-mono text-primary">{currentTurn}</span>
        </div>
      </div>
      
      {/* Fila de Threads */}
      <div className="flex items-center justify-center flex-wrap gap-3">
        {professors.map((professor, index) => (
          <div key={professor.threadId} className="flex items-center">
            <ThreadCard
              professor={professor}
              isRunning={index === currentAttackerIndex && professor.isAlive}
            />
            
            {/* Seta para próximo */}
            {index < professors.length - 1 && (
              <ArrowRight className="w-5 h-5 mx-2 text-muted-foreground/50" />
            )}
          </div>
        ))}
        
        {/* Indicador de ciclo */}
        <div className="flex items-center gap-2 ml-2 text-muted-foreground">
          <ArrowRight className="w-5 h-5" />
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/30">
            <RotateCcw className="w-4 h-4" />
            <span className="text-xs font-medium">Reinicia</span>
          </div>
        </div>
      </div>
    </div>
  );
}
