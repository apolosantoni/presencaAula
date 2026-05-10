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

type AlunoType = {
  id: number;
  name: string;
  registroMatricula: string;
  idColegio: number;
  Colegio: string;
  idDisciplina: number;
  Disciplina: string;
  ano: number;
  serie: string;
  turma: string;
};

type ColegioType = {
  id: number;
  name: string;
};

type DisciplinaType = {
  id: number;
  name: string;
  colegioId: number;
};

export default function Aluno() {
  const router = useRouter();
  const database = useSQLiteContext();

  //databases
  const [data, setData] = useState<AlunoType[]>([]);
  const [dataColegio, setDataColegio] = useState<ColegioType[]>([]);
  const [dataDisciplina, setDataDisciplina] = useState<DisciplinaType[]>([]);
  //variaveis
  const [disciplina, setDisciplina] = useState<string>("");
  const [colegio, setColegio] = useState<string>("");

  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [registroMatricula, setRegistroMatricula] = useState<string>("");
  const [colegionName, setColegioName] = useState<string>("");
  const [disciplinaName, setDisciplinaName] = useState<string>("");
  const [ano, setAno] = useState<string>("");
  const [serie, setSerie] = useState<string>("");
  const [turma, setTurma] = useState<string>("");
  //controles logicos.
  const [bloqueado, setBloqueado] = useState<boolean>(false);
  const [manterDados, setManterDados] = useState<boolean>(false);

  const loadData = async () => {
    //carrega os dados salvos
    const result = await database.getAllAsync<AlunoType>(
      `SELECT
       aluno.id, aluno.name, aluno.registroMatricula, 
       aluno.idColegio, colegio.name AS Colegio,  
       aluno.idDisciplina, disciplina.name AS Disciplina,
       aluno.ano, aluno.serie, aluno.turma
       FROM aluno
       LEFT JOIN colegio
        ON aluno.idColegio = colegio.id
       LEFT JOIN disciplina
        ON aluno.idDisciplina = disciplina.id
       ;`,
    );
    setData(result);
    console.log(data);

    // preencher os dados da pickbox
    const result1 = await database.getAllAsync<DisciplinaType>(
      "SELECT * FROM disciplina;",
    );
    setDataDisciplina(result1);

    const result2 = await database.getAllAsync<ColegioType>(
      "SELECT id, name FROM colegio;",
    );
    setDataColegio(result2);
  };

  const handelSave = async () => {
    try {
      if (id) {
        try {
          await database.runAsync(
            `UPDATE aluno SET
              name = ?,
              registroMatricula = ?,
              idColegio = ?,
              idDisciplina = ?,
              ano = ?,
              serie = ?,
              turma = ?
             WHERE id = ?`,
            [
              name,
              registroMatricula,
              parseInt(colegio),
              parseInt(disciplina),
              parseInt(ano),
              serie,
              turma,
              id,
            ],
          );
          loadData();
        } catch (error) {
          console.log(error);
        }
      } else {
        database.runAsync(
          `INSERT INTO aluno (
          name, 
          registroMatricula, 
          idColegio,
          idDisciplina,
          ano,
          serie,
          turma
          ) VALUES (?,?,?,?,?,?,?);`,
          [
            name,
            registroMatricula,
            parseInt(colegio),
            parseInt(disciplina),
            parseInt(ano),
            serie,
            turma,
          ],
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
    if (manterDados == true) {
      setId(null);
      setName("");
      setRegistroMatricula("");
    } else {
      setId(null);
      setName("");
      setRegistroMatricula("");
      setColegio("");
      setColegioName("");
      setDisciplina("");
      setDisciplinaName("");
      setAno("");
      setSerie("");
      setTurma("");
      setBloqueado(true);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await database.runAsync("DELETE FROM aluno WHERE id = ?", [id]);

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

  // State for filtered data and search text
  const [filteredData, setFilteredData] = useState(data);

  // realiza bloqueio dos campos caso o id seja null, sem haver valor pode ser gerado um novo e
  // libera as caixas para receber edição
  useEffect(() => {
    setBloqueado(!id);
    setFilteredData(data); // Reset to full list

    if (!colegio) {
      setDisciplina("");
    }
    if (disciplina != "") {
      setFilteredData(
        data.filter(
          (item) =>
            item.idColegio === parseInt(colegio) &&
            item.idDisciplina === parseInt(disciplina),
        ),
      );
    } else {
      setFilteredData(
        data.filter((item) => item.idColegio === parseInt(colegio)),
      );
    }
    console.log(disciplina);
  }, [id, disciplina, colegio, data]);

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
            <Picker
              selectedValue={colegio}
              onValueChange={(itemValue: string, itemIndex: number) => {
                setColegio(itemValue);
                setDisciplina("");
              }}
              enabled={!manterDados}
            >
              {dataColegio.map((item) => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Picker>
            <Picker
              selectedValue={disciplina}
              onValueChange={(itemValue: string, itemIndex: number) => {
                setDisciplina(itemValue);
                console.log("key : " + itemValue);
              }}
              enabled={!manterDados}
            >
              {dataDisciplina
                .filter((fItem) => fItem.colegioId === parseInt(colegio))
                .map((item) => (
                  <Picker.Item
                    label={item.name}
                    value={item.id}
                    key={item.id}
                  />
                ))}
            </Picker>
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
                value={ano}
                onChangeText={(text) => setAno(text)}
              />
              <TextInput
                editable={!bloqueado}
                keyboardType="numeric"
                maxLength={4}
                style={[styles.textInput, { width: 50 }]}
                placeholder="Serie"
                value={serie}
                onChangeText={(text) => setSerie(text)}
              />
              <TextInput
                editable={!bloqueado}
                keyboardType="default"
                maxLength={4}
                style={[styles.textInput, { width: 50 }]}
                placeholder="Turma"
                value={turma}
                onChangeText={(text) => setTurma(text)}
              />
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
              >
                <Text style={{ fontSize: 10 }}>Manter Dados</Text>
                <Checkbox value={manterDados} onValueChange={setManterDados} />
              </View>
            </View>

            <TextInput
              editable={!bloqueado}
              keyboardType="default"
              maxLength={255}
              style={[styles.textInput]}
              placeholder="Nome Aluno"
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
                keyboardType="default"
                maxLength={255}
                style={[styles.textInput, { width: 200 }]}
                placeholder="Registro Matricula"
                value={registroMatricula}
                onChangeText={(text) => setRegistroMatricula(text)}
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
            data={filteredData}
            ListEmptyComponent={<Text style={{}}>No results found</Text>}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      borderStyle: "solid",
                      borderWidth: 1,
                      borderColor: "gray",
                    }}
                    onPress={() => {
                      try {
                        setId(item.id);
                        setName(item.name);
                        setRegistroMatricula(item.registroMatricula);

                        setDisciplinaName(item.Disciplina);
                        setDisciplina(item.idDisciplina.toString());

                        setColegio(item.idColegio.toString());
                        setColegioName(item.Colegio);
                        setDisciplina(item.idDisciplina.toString());
                        setAno(item.ano.toString());
                        setSerie(item.serie);
                        setTurma(item.turma);
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 18 }}>{item.name}</Text>
                      <Text>
                        Colegio : {item.idColegio.toString()} - {item.Colegio}
                      </Text>
                      <Text>
                        Disciplina: {item.idDisciplina.toString()} -{" "}
                        {item.Disciplina}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ marginLeft: 5, width: 30 }}>
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
