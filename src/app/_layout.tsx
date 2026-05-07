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
            )
            `);
  };
  return (
    <SQLiteProvider databaseName="presencaAula.db" onInit={createDbIfNeeded}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </SQLiteProvider>
  );
}
