# 🎮 Batalha de Professores

## 🎯 Intuito do Jogo

A **Batalha de Professores** é uma simulação didática criada para ajudar estudantes a compreender, de forma visual e divertida, conceitos fundamentais de **Sistemas Operacionais**, como:

- 🧵 **Threads**
- ⚙️ **Escalonamento (Round-Robin)**
- 🔄 **Troca de contexto (Context Switch)**
- 🖥️ **Processos**
- 🚫 **Deadlock**
- 🔁 **Livelock**

No jogo:

- Cada professor representa **uma thread** (T0, T1, T2…)
- O jogo inteiro funciona como **um processo**
- O escalonador utiliza **Round-Robin**, onde cada thread executa 1 quantum (um ataque)
- O jogador pode ajustar a velocidade do escalonador para visualizar a concorrência
- O *log* mostra o histórico de execução dos “threads-professores”

O objetivo é tornar conceitos abstratos mais fáceis de entender ao observar tudo acontecendo em tempo real.

---

## 🔹 Usar sua IDE preferida

Se quiser trabalhar localmente utilizando sua própria IDE, você pode clonar este repositório e enviar (push) suas alterações.

### ✔️ Requisitos

- **Node.js + npm**  
  Recomenda-se instalar usando **nvm**:  
  https://github.com/nvm-sh/nvm#installing-and-updating

---

## 🚀 Como rodar o projeto

```sh
# Passo 1: Clone o repositório usando a URL Git do projeto.
git clone <YOUR_GIT_URL>

# Passo 2: Acesse o diretório do projeto.
cd <YOUR_PROJECT_NAME>

# Passo 3: Instale as dependências necessárias.
npm i

# Passo 4: Inicie o servidor de desenvolvimento com auto-reload e preview instantâneo.
npm run dev
