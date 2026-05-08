import { Stack } from "expo-router/stack";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";

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
            name TEXT
            );
     
            `);
  };
  return (
    <SQLiteProvider databaseName="presencaAula.db" onInit={createDbIfNeeded}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="outros" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="modal1" options={{ presentation: "modal" }} />
      </Stack>
    </SQLiteProvider>
  );
}
