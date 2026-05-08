import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="house" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="agenda"
        options={{
          headerTitle: "",
          title: "Chamada",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="fact-check" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="alunos"
        options={{
          headerTitle: "",
          title: "Relatorios",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="print" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
