/**
 * ===========================================
 * COMPONENTE: CONTROLES DO JOGO
 * ===========================================
 * 
 * Botões para iniciar, pausar e reiniciar a batalha.
 */

import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface GameControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  hasWinner: boolean;
  speed: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export function GameControls({
  isRunning,
  isPaused,
  hasWinner,
  speed,
  onStart,
  onPause,
  onResume,
  onReset,
  onSpeedChange,
}: GameControlsProps) {
  return (
    <div className="chalkboard-frame rounded-lg p-4">
      <h3 className="font-chalk text-lg mb-3 chalk-text">
        🎮 Controles
      </h3>
      
      <div className="flex flex-wrap gap-3 mb-4">
        {!isRunning && !hasWinner && (
          <Button onClick={onStart} className="font-hand gap-2">
            <Play className="w-4 h-4" />
            Iniciar Batalha
          </Button>
        )}
        
        {isRunning && !isPaused && (
          <Button onClick={onPause} variant="secondary" className="font-hand gap-2">
            <Pause className="w-4 h-4" />
            Pausar
          </Button>
        )}
        
        {isRunning && isPaused && (
          <Button onClick={onResume} className="font-hand gap-2">
            <Play className="w-4 h-4" />
            Continuar
          </Button>
        )}
        
        {(isRunning || hasWinner) && (
          <Button onClick={onReset} variant="outline" className="font-hand gap-2">
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </Button>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-hand flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Velocidade do Escalonador
          </span>
          <span className="text-muted-foreground">{speed}ms por turno</span>
        </div>
        <Slider
          value={[speed]}
          onValueChange={(value) => onSpeedChange(value[0])}
          min={100}
          max={2000}
          step={100}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground font-hand">
          Menor = mais rápido | Maior = mais lento (melhor para observar)
        </p>
      </div>
    </div>
  );
}
