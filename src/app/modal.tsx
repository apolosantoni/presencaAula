import { router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Modal() {
  const { id } = useLocalSearchParams();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [editMode, setEditMode] = useState(false);

  const database = useSQLiteContext();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    const result = await database.getFirstAsync<{
      name: string;
      email: string;
    }>("SELECT name, email FROM users WHERE id = ?;", [parseInt(id as string)]);
    if (result) {
      setName(result.name);
      setEmail(result.email);
    }
  };

  const handelSave = async () => {
    try {
      database.runAsync("INSERT INTO users (name, email) VALUES (?,?);", [
        name,
        email,
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setName("");
      setEmail("");
    }
    router.back();
  };

  const handleUpdate = async () => {
    try {
      const response = await database.runAsync(
        `UPDATE users SET name = ?, email = ? WHERE id = ?`,
        [name, email, parseInt(id as string)],
      );
      console.log("Item atualizado com sucesso", response?.changes!);
    } catch (error) {
      console.log(error);
    } finally {
      setName("");
      setEmail("");
    }
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tittle}>
        <Text style={styles.tittleText}>Cadastrando usuarios</Text>
      </View>
      <View>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
        />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 50,
          gap: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.button, { backgroundColor: "red" }]}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            editMode ? handleUpdate() : handelSave();
          }}
          style={[styles.button, { backgroundColor: "red" }]}
        >
          <Text style={styles.buttonText}>
            {editMode ? "Atualizar" : "Salvar"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tittle: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
  tittleText: {
    fontSize: 20,
  },
  button: {
    height: 45,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  textInput: {
    borderBottomWidth: 1, // Creates the line
    borderBottomColor: "#333", // Line color
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 16,
  },
});
