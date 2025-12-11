/**
 * ===========================================
 * COMPONENTE: LOG DE BATALHA
 * ===========================================
 * 
 * Exibe o histórico de ações da batalha.
 * Funciona como um "console.log" do sistema operacional,
 * mostrando o que cada "thread" está fazendo.
 */

import { BattleLog } from '@/game/types';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Swords, Wind, Skull, Trophy, Info } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface BattleLogDisplayProps {
  logs: BattleLog[];
}

// Ícones para cada tipo de evento
const iconMap = {
  attack: Swords,
  dodge: Wind,
  death: Skull,
  winner: Trophy,
  info: Info,
};

// Cores para cada tipo de evento
const colorMap = {
  attack: 'text-destructive',
  dodge: 'text-blue-400',
  death: 'text-muted-foreground',
  winner: 'text-primary',
  info: 'text-muted-foreground',
};

export function BattleLogDisplay({ logs }: BattleLogDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para o fim quando novos logs aparecem
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="chalkboard-frame rounded-lg p-4">
      <h3 className="font-chalk text-lg mb-3 chalk-text flex items-center gap-2">
        📜 Log de Batalha
        <span className="text-xs font-hand text-muted-foreground">
          (Histórico de execução das threads)
        </span>
      </h3>
      
      <ScrollArea className="h-64" ref={scrollRef}>
        <div className="space-y-2 pr-4">
          {logs.length === 0 ? (
            <p className="text-muted-foreground text-sm italic">
              Aguardando início da batalha...
            </p>
          ) : (
            logs.map((log) => {
              const Icon = iconMap[log.type];
              return (
                <div 
                  key={log.id}
                  className={cn(
                    'log-entry flex items-start gap-2 text-sm p-2 rounded bg-secondary/30',
                    colorMap[log.type]
                  )}
                >
                  <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="font-hand">{log.message}</span>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
