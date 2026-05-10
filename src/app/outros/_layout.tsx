import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="colegio" options={{ headerShown: false }} />
      <Stack.Screen name="disciplina" options={{ headerShown: false }} />
      <Stack.Screen name="aluno" options={{ headerShown: false }} />
    </Stack>
  );
}
