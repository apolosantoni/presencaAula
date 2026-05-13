import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="colegio"
        options={{ headerShown: true, title: "Colegios" }}
      />
      <Stack.Screen
        name="disciplina"
        options={{ headerShown: true, title: "Disciplinas" }}
      />
      <Stack.Screen
        name="turma"
        options={{ headerShown: true, title: "Turma" }}
      />
      <Stack.Screen
        name="complementares"
        options={{ headerShown: true, title: "Dados Complementares" }}
      />
    </Stack>
  );
}
