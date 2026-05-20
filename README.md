# Cadastro de presença em aula.

Registrar a frequencia dos alunos e emitir relatorios de presença a um responsavel.

## Índicie

- [Descrição](#descrição)
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

````bash
git clone https://github.com/apolosantoni/presencaaula.git



## Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
````

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
