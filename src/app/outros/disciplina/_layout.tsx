import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import { use, useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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

type DisciplinaType = {
  id: number;
  name: string;
  colegioId: number;
};
type ColegioType = {
  id: number;
  name: string;
  responsavel: string;
  email: string;
  telefone: string;
};

export default function Disciplina() {
  const router = useRouter();

  const database = useSQLiteContext();
  const colegioDB = useSQLiteContext();

  const [data, setData] = useState<DisciplinaType[]>([]);
  const [dataColegio, setDataColegio] = useState<ColegioType[]>([]);

  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");

  const [idColegio, setIdColegio] = useState<number | null>(null);
  const [nameColegio, setNameColegio] = useState<string>("");

  const [bloqueado, setBloqueado] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState(data);

  const loadData = async () => {
    const result = await database.getAllAsync<DisciplinaType>(
      "SELECT * FROM disciplina;",
    );
    setData(result);

    const result1 = await database.getAllAsync<ColegioType>(
      "SELECT * FROM colegio;",
    );
    setDataColegio(result1);
  };

  const handelSave = async () => {
    try {
      if (id) {
        try {
          await database.runAsync(
            `UPDATE colegio SET
              name = ?,
              colegioId = ?
             WHERE id = ?`,
            [name, idColegio, id],
          );
          loadData();
        } catch (error) {
          console.log(error);
        }
      } else {
        database.runAsync(
          "INSERT INTO disciplina (name, colegioId ) VALUES (?,?);",
          [name, idColegio],
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
    setBloqueado(true);
  };

  const novo = () => {
    setName("");
    setBloqueado(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await database.runAsync("DELETE FROM disciplina WHERE id = ?", [id]);

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
    setFilteredData(data.filter((item) => item.colegioId === idColegio));
  }, [id, idColegio]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "" }} />
      <View style={styles.header}>
        <Text style={styles.titleText}>Disciplinas</Text>
        <Text style={styles.subtitleText}>
          Aqui voce cadastra as disciplinas que leciona.
        </Text>
      </View>
      <View style={styles.line} />
      <View style={styles.containerDiv}>
        <View style={styles.containerDiv}>
          <View>
            {/* <TextInput
              editable={!bloqueado}
              keyboardType="default"
              maxLength={255}
              style={styles.textInput}
              placeholder="Colegio"
              value={nameColegio}
              onChangeText={(text) => setNameColegio(text)}
            /> */}
            <View
              style={{
                flexDirection: "column",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  width: 65,
                  bottom: 0,

                  fontSize: 12,
                  borderWidth: 1,
                  paddingHorizontal: 5,
                }}
              >
                Colégios
              </Text>
              <View style={{ flex: 1 }}>
                <Picker
                  style={{ backgroundColor: "#dfdfdf" }}
                  selectedValue={idColegio?.toString()}
                  onValueChange={(itemValue: string) => {
                    setIdColegio(parseInt(itemValue));
                    //console.log("id colegio :" + idColegio?.toString());
                  }}
                >
                  {dataColegio.map((item) => (
                    <Picker.Item label={item.name} value={item.id} />
                  ))}
                </Picker>
              </View>
            </View>
            <View>
              <Text
                style={{
                  width: 100,
                  bottom: 0,
                  fontSize: 12,
                  borderWidth: 1,
                  paddingHorizontal: 5,
                }}
              >
                Nome disciplina
              </Text>
              <TextInput
                editable={!bloqueado}
                keyboardType="default"
                maxLength={255}
                style={styles.textInput}
                placeholder="Disciplina"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={[styles.textInput, { width: 200 }]} />
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
              <TouchableOpacity onPress={novo}>
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
            data={filteredData}
            ListEmptyComponent={<Text style={{}}>No results found</Text>}
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
                    }}
                  >
                    <Text>{item.name}</Text>
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
