import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import { use, useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import ExpoCheckbox from "expo-checkbox/build/ExpoCheckbox";

type UserType = {
  id: number;
  name: string;
  responsavel: string;
  email: string;
  telefone: string;
};

type DisciplinaType = {
  id: number;
  name: string;
};

export default function Aluno() {
  const router = useRouter();
  const database = useSQLiteContext();
  const [data, setData] = useState<UserType[]>([]);
  const [dataDisciplina, setDataDisciplina] = useState<DisciplinaType[]>([]);
  const [disciplina, setDisciplina] = useState<string>("");

  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [responsavel, setResponsavel] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  const [bloqueado, setBloqueado] = useState<boolean>(false);
  const [manterDados, setManterDados] = useState<boolean>(false);

  const loadData = async () => {
    const result = await database.getAllAsync<UserType>(
      "SELECT * FROM colegio;",
    );
    setData(result);

    const result1 = await database.getAllAsync<DisciplinaType>(
      "SELECT * FROM disciplina;",
    );
    setDataDisciplina(result1);
  };

  const handelSave = async () => {
    try {
      if (id) {
        try {
          await database.runAsync(
            `UPDATE colegio SET
              name = ?,
              responsavel = ?,
              email = ?,
              telefone = ?
             WHERE id = ?`,
            [name, responsavel, email, telefone, id],
          );
          loadData();
        } catch (error) {
          console.log(error);
        }
      } else {
        database.runAsync(
          "INSERT INTO colegio (name, responsavel, email, telefone) VALUES (?,?,?,?);",
          [name, responsavel, email, telefone],
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      cancela();

      loadData();
    }
  };

  const cancela = () => {
    setId(null);
    setName("");
    setResponsavel("");
    setEmail("");
    setTelefone("");
    setBloqueado(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await database.runAsync("DELETE FROM colegio WHERE id = ?", [id]);

      loadData();
    } catch (error) {
      console.log(error);
    } finally {
      setId(null);
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

  const handlePress = (ids: number) => {
    setId(ids);
    Alert.alert("Item clicado", `ID: ${ids}`);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  useEffect(() => {
    setBloqueado(!id);
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "" }} />
      <View style={styles.header}>
        <Text style={styles.titleText}>Alunos</Text>
        <Text style={styles.subtitleText}>Cadastro os alunos das turmas.</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.containerDiv}>
        <View style={styles.containerDiv}>
          <View>
            <TextInput
              editable={!bloqueado}
              keyboardType="default"
              maxLength={255}
              style={styles.textInput}
              placeholder="Nome Colegio"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                editable={!bloqueado}
                keyboardType="numeric"
                maxLength={4}
                style={[styles.textInput, { width: 50 }]}
                placeholder="Ano"
                value={responsavel}
                onChangeText={(text) => setResponsavel(text)}
              />
              <TextInput
                editable={!bloqueado}
                keyboardType="numeric"
                maxLength={4}
                style={[styles.textInput, { width: 50 }]}
                placeholder="Serie"
                value={responsavel}
                onChangeText={(text) => setResponsavel(text)}
              />
              <TextInput
                editable={!bloqueado}
                keyboardType="default"
                maxLength={4}
                style={[styles.textInput, { width: 50 }]}
                placeholder="Turma"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
              >
                <Text style={{ fontSize: 10 }}>Manter Dados</Text>
                <Checkbox value={manterDados} onValueChange={setManterDados} />
              </View>
            </View>
            <Picker
              selectedValue={disciplina}
              onValueChange={(itemValue: string, itemIndex: number) =>
                setDisciplina(itemValue)
              }
              enabled={!manterDados}
            >
              {dataDisciplina.map((item) => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Picker>
            <TextInput
              editable={!bloqueado}
              keyboardType="default"
              maxLength={12}
              style={[styles.textInput]}
              placeholder="Nome Aluno"
              value={telefone}
              onChangeText={(text) => setTelefone(text)}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                editable={!bloqueado}
                keyboardType="default"
                maxLength={255}
                style={[styles.textInput, { width: 200 }]}
                placeholder="Registro Matricula"
                value={telefone}
                onChangeText={(text) => setTelefone(text)}
              />
              <TouchableOpacity
                disabled={bloqueado}
                onPress={() => handelSave()}
              >
                <MaterialIcons
                  size={32}
                  name="save"
                  color={bloqueado ? "gray" : "green"}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={cancela}>
                <MaterialIcons size={32} name="cancel" color={"gray"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setBloqueado(false)}>
                <MaterialIcons size={32} name="add-circle" color={"blue"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View></View>
        <View>
          <Text style={styles.defaultText}>Lista de colegios</Text>
          <FlatList
            style={{
              backgroundColor: "#dfdfdf",
              paddingHorizontal: 10,
              minHeight: 300,
              maxHeight: 300,
            }}
            showsVerticalScrollIndicator
            data={data}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setId(item.id);
                      setName(item.name);
                      setResponsavel(item.responsavel);
                      setEmail(item.email);
                      setTelefone(item.telefone);
                    }}
                  >
                    <Text>{item.name}</Text>
                    <Text>{item.responsavel}</Text>
                    <Text>{item.email}</Text>
                    <Text>{item.telefone}</Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                      <MaterialIcons size={28} name="delete" color={"red"} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export const unstable_settings = {
  headerShown: false, // Hides the header
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    borderStyle: "solid",

    marginVertical: 20,
  },
  containerDiv: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: "column",
  },
  defaultText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  titleText: {
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 52,
  },
  subtitleText: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: 600,
  },
  textInput: {
    backgroundColor: "#dfdfdf",
    width: "100%",
    justifyContent: "center",
    marginBottom: 10,
  },
});
