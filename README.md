# Cadastro de presença em aula.

Registrar a frequencia dos alunos e emitir relatorios de presença a um responsavel.

## Índicie

- [Descrição](#descrição)
- [Entendimento e Estrutura](#Entendimento-e-Estrutura)
- [Status do Projeto](#status-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Contribuidores](#contribuidores)
- [Licença](#licença)

## Descrição

Presença a frequencia do aluno deve ser emitada semanalmente ou mensalmente.
As aulas podem ser simples ou mais. Tem uma data semanal fixa e horario fixo.
As aulas sao para uma determinada turma que por sua vez é composta de um grupo de alunos.
Os alunos sao entidades da escola, podendo pertencer a mais de um periodo, ensino, serie e turma
Ex. Aluno A
periodo matutino - ensino medio - 3º ano - turma A
periodo vespertino - ensino técnico Informática - 1º ano - Turma B

A disciplina( materia aplicada ) refere a uma turma e seus alunos cadastrados.

- turma é o agrupamento dos alunos.
- disciplina é aplicada recorrente em dia(s) da semana, em horarios fixos(com possibilidade de alteração.)
- registrando os dias da semana e horario das aulas pode ser gerado nota ao usuario sobre a necessidade de aferir a presença do aluno.
- com isso pode ser definido de forma automatica periodo para emissão do relatorio ao responsavel.

\*\* com isso o sistema tem que percorrer os registros e aferir as datas de aula da disciplina, e conforme configurado emitir o relatorio.

## Entendimento e Estrutura

### O que é Aula.

A aula é a aplicação de uma disciplina ministrada para alunos agrupados em turmas que pertence a uma determinada serie/ano de um determinado tipo de ensino que pertence a um periodo em um colegio.

### O que é presença.

É a verificação do comparecimento do aluno em uma disciplina.

### Qual a frequencia dos registro.

A disciplina é aplicada em dias da semana em horarios determinados que podem sofrer alteração por diversos fatores.

### O que pode ser relatado desse registro.

A frequencia do aluno nas disciplina.
O percentual de alunos na disciplina.
Os dias com maior e menor frequencia dos alunos.
Quantidade de vezes em que o professor aplicou a disciplina.( considerando que o mesmo pode nao apresentar aula devido a motivos adversos, tais como fechamento de colegio, tempo, ou algum tipo de determinação.)

## Status do Projeto

🚧 Projeto em construção 🚧

## Funcionalidades

- Funcionalidade 1: Registro de frequencia de alunos em determinadas aulas prestadas por professor.
- Funcionalidade 2: Emissão de relatorios com base na frequencia do aluno e presença em aula.

## Tecnologias Utilizadas

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), um sandbox limitado para desenvolvimento de Expo
- [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/), banco de dados nativo do aparelho

## Como Rodar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/apolosantoni/presencaaula.git



```
