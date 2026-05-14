import { Stack } from "expo-router/stack";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { CriandoBancoDados } from "./outros/database";

export default function Layout() {
  const createDbIfNeeded = async (db: SQLiteDatabase) => {
    console.log("Creating database if Needed");
    await db.execAsync(` 
            CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT
            );
            
            CREATE TABLE IF NOT EXISTS perfil (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            telefone TEXT
             );

            CREATE TABLE IF NOT EXISTS colegio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            responsavel TEXT,
            email TEXT,
            telefone TEXT
             );

            CREATE TABLE IF NOT EXISTS disciplina (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            colegioId INTEGER
            );

            CREATE TABLE IF NOT EXISTS aluno (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            registroMatricula TEXT,
            idColegio INTEGER,
            idDisciplina INTEGER,
            ano TEXT,
            serie TEXT,
            turma TEXT
            );
     
            `);
  };
  return (
    <SQLiteProvider databaseName="presencaAula.db" onInit={CriandoBancoDados}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="outros" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="modTeste" options={{ presentation: "modal" }} />
      </Stack>
    </SQLiteProvider>
  );
}
