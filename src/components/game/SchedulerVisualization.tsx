/**
 * ===========================================
 * COMPONENTE: VISUALIZAÇÃO DO ESCALONADOR
 * ===========================================
 * 
 * Mostra visualmente como o escalonador Round-Robin funciona,
 * indicando qual "thread" está executando no momento.
 */

import { Professor } from '@/game/types';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface SchedulerVisualizationProps {
  professors: Professor[];
  currentAttackerIndex: number;
  currentTurn: number;
}

const colorBgMap: Record<string, string> = {
  'professor-maykol': 'bg-red-500',
  'professor-sekeff': 'bg-orange-500',
  'professor-iallen': 'bg-yellow-500',
  'professor-jivago': 'bg-green-500',
  'professor-maylon': 'bg-blue-500',
  'professor-jeferson': 'bg-purple-500',
};

export function SchedulerVisualization({ 
  professors, 
  currentAttackerIndex,
  currentTurn 
}: SchedulerVisualizationProps) {
  return (
    <div className="chalkboard-frame rounded-lg p-4">
      <h3 className="font-chalk text-lg mb-3 chalk-text">
        ⚙️ Escalonador Round-Robin
      </h3>
      
      <div className="mb-3 text-sm font-hand text-muted-foreground">
        Turno atual: <span className="text-primary font-bold">{currentTurn}</span>
      </div>
      
      {/* Fila de threads */}
      <div className="flex items-center justify-center flex-wrap gap-2">
        {professors.map((professor, index) => (
          <div key={professor.threadId} className="flex items-center">
            <div
              className={cn(
                'relative px-3 py-2 rounded-lg border-2 transition-all duration-300',
                'flex flex-col items-center min-w-[60px]',
                !professor.isAlive && 'opacity-30 line-through',
                index === currentAttackerIndex && professor.isAlive && 'ring-2 ring-primary scale-110',
              )}
            >
              {/* Indicador de "executando" */}
              {index === currentAttackerIndex && professor.isAlive && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-primary font-bold animate-bounce">
                  ▼ RUN
                </div>
              )}
              
              {/* Bolinha colorida da thread */}
              <div 
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1',
                  colorBgMap[professor.color],
                  professor.isAlive ? 'opacity-100' : 'opacity-30'
                )}
              >
                T{professor.threadId}
              </div>
              
              {/* Nome abreviado */}
              <span className="text-xs font-hand">
                {professor.displayName.slice(0, 3)}
              </span>
              
              {/* Status */}
              <span className={cn(
                'text-[10px]',
                professor.isAlive ? 'text-hp-bar' : 'text-destructive'
              )}>
                {professor.isAlive ? 'READY' : 'DEAD'}
              </span>
            </div>
            
            {/* Seta para próximo (exceto último) */}
            {index < professors.length - 1 && (
              <ArrowRight className="w-4 h-4 mx-1 text-muted-foreground" />
            )}
          </div>
        ))}
        
        {/* Seta de volta ao início (Round-Robin) */}
        <div className="flex items-center text-muted-foreground text-xs font-hand">
          <ArrowRight className="w-4 h-4 mx-1" />
          <span>↩️ volta</span>
        </div>
      </div>
      
      <p className="mt-3 text-xs text-muted-foreground font-hand text-center">
        Cada thread executa um "quantum" (1 ataque) e passa a vez
      </p>
    </div>
  );
}
