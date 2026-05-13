import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

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
        name="chamada"
        options={{
          headerShown: false,
          title: "Presencas",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="checklist" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracao"
        options={{
          headerShown: false,
          title: "Configuracao",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="settings" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
