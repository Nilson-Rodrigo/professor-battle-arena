/**
 * ===========================================
 * COMPONENTE: EXPLICAÇÕES DIDÁTICAS
 * ===========================================
 * 
 * Explica os conceitos de threads, escalonamento,
 * deadlock e livelock de forma simples.
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ThreadExplanation() {
  return (
    <div className="chalkboard-frame rounded-lg p-4">
      <h3 className="font-chalk text-lg mb-3 chalk-text">
        📚 Conceitos de Sistemas Operacionais
      </h3>
      
      <Tabs defaultValue="threads" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-secondary">
          <TabsTrigger value="threads" className="text-xs font-hand">Threads</TabsTrigger>
          <TabsTrigger value="scheduling" className="text-xs font-hand">Escalonamento</TabsTrigger>
          <TabsTrigger value="deadlock" className="text-xs font-hand">Deadlock</TabsTrigger>
          <TabsTrigger value="livelock" className="text-xs font-hand">Livelock</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="h-48 mt-3">
          <TabsContent value="threads" className="mt-0">
            <div className="space-y-3 font-hand text-sm">
              <h4 className="font-chalk text-primary">🧵 O que são Threads?</h4>
              <p>
                <strong>Thread</strong> é a menor unidade de processamento que pode ser 
                escalonada pelo sistema operacional.
              </p>
              <p>
                Imagine que cada <strong>professor é uma thread</strong>. Eles existem 
                no mesmo "programa" (o jogo), mas cada um executa suas próprias ações 
                independentemente.
              </p>
              <div className="bg-secondary/50 p-3 rounded">
                <p className="text-xs text-muted-foreground">
                  <strong>No jogo:</strong> Cada professor tem um ID de thread (T0, T1, T2...).
                  O indicador que pulsa mostra que a thread está "viva" e pronta para executar.
                </p>
              </div>
              <p>
                <strong>Diferença de Processo:</strong> Um processo é um programa em execução 
                (o jogo todo). Threads são "sub-processos" dentro dele (os professores).
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="scheduling" className="mt-0">
            <div className="space-y-3 font-hand text-sm">
              <h4 className="font-chalk text-primary">⏰ Escalonamento Round-Robin</h4>
              <p>
                <strong>Escalonamento</strong> é como o sistema operacional decide qual 
                thread vai executar e quando.
              </p>
              <p>
                Usamos <strong>Round-Robin</strong>: cada thread recebe um tempo igual 
                (quantum) para executar, depois passa a vez para a próxima.
              </p>
              <div className="bg-secondary/50 p-3 rounded">
                <p className="text-xs text-muted-foreground">
                  <strong>No jogo:</strong> Cada professor ataca uma vez (quantum = 1 ataque), 
                  depois o próximo professor (thread) executa. A ordem é circular: 
                  Maykol → Sekeff → Iallen → Jivago → Maylon → Jeferson → Maykol...
                </p>
              </div>
              <p>
                <strong>Outros algoritmos:</strong> FIFO (primeiro a chegar), SJF (trabalho mais curto primeiro), 
                Prioridade (quem tem mais prioridade executa primeiro).
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="deadlock" className="mt-0">
            <div className="space-y-3 font-hand text-sm">
              <h4 className="font-chalk text-destructive">🔒 Deadlock (Impasse)</h4>
              <p>
                <strong>Deadlock</strong> acontece quando duas ou mais threads ficam 
                esperando uma pela outra eternamente, e nenhuma consegue prosseguir.
              </p>
              <div className="bg-secondary/50 p-3 rounded">
                <p className="text-xs text-muted-foreground">
                  <strong>Exemplo clássico:</strong> Thread A tem o recurso 1 e quer o recurso 2.
                  Thread B tem o recurso 2 e quer o recurso 1. Nenhuma libera seu recurso até 
                  conseguir o outro. Resultado: as duas ficam travadas para sempre!
                </p>
              </div>
              <p>
                <strong>4 condições para deadlock:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Exclusão mútua (só uma thread usa o recurso)</li>
                <li>Posse e espera (segura um recurso enquanto espera outro)</li>
                <li>Não preempção (não pode tirar recurso à força)</li>
                <li>Espera circular (A espera B, B espera A)</li>
              </ol>
              <p className="text-muted-foreground text-xs italic">
                No nosso jogo, evitamos deadlock pois apenas uma thread ataca por vez!
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="livelock" className="mt-0">
            <div className="space-y-3 font-hand text-sm">
              <h4 className="font-chalk text-accent">🔄 Livelock</h4>
              <p>
                <strong>Livelock</strong> é parecido com deadlock, mas as threads NÃO 
                estão travadas - elas continuam executando, mas nunca fazem progresso útil.
              </p>
              <div className="bg-secondary/50 p-3 rounded">
                <p className="text-xs text-muted-foreground">
                  <strong>Exemplo da vida real:</strong> Duas pessoas num corredor tentando passar.
                  Ambas se movem para o mesmo lado ao mesmo tempo, depois para o outro lado, 
                  e assim infinitamente. Estão "executando", mas não avançam!
                </p>
              </div>
              <p>
                <strong>Diferença do Deadlock:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li><strong>Deadlock:</strong> Threads paradas, esperando (não fazem nada)</li>
                <li><strong>Livelock:</strong> Threads ativas, mas sem progresso (fazem algo inútil)</li>
              </ul>
              <p className="text-muted-foreground text-xs italic">
                No jogo, isso seria como dois professores sempre desviando dos ataques um do outro!
              </p>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
