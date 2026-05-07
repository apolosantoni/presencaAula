import { router, Stack, useFocusEffect } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

type UserType = { id: number; name: string; email: string };

export default function Index() {
  const [data, setData] = useState<UserType[]>([]);
  const database = useSQLiteContext();

  const loadData = async () => {
    const result = await database.getAllAsync<UserType>("SELECT * FROM users;");
    setData(result);
  };

  const handleDelete = async (id: number) => {
    try {
      await database.runAsync("DELETE FROM users WHERE id = ?", [id]);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const confirmAction = (id: number) => {
    Alert.prompt("Exclussão", "Deseja realmente excluir o arquivo ?", [
      {
        text: "Sim",
        onPress: () => handleDelete(id),
      },
    ]);
  };
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const headerRight = () => {
    return (
      <TouchableOpacity
        onPress={() => router.push("/modal")}
        style={{ marginRight: 10 }}
      >
        <FontAwesome name="plus-circle" size={28} color="blue" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerRight }} />
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View style={{ padding: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text>{item.name}</Text>
                    <Text>{item.email}</Text>
                  </View>
                  <View style={{ flexDirection: "row", columnGap: 10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        router.push(`/modal?id=${item.id}`);
                      }}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(item.id)}
                      style={[styles.button, { backgroundColor: "red" }]}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 10,
  },
  itemText: {
    fontSize: 15,
  },
  button: {
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 5,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});
