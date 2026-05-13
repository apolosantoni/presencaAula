import { styles } from "@/components/style-geral";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ColegioType = {
  id: number;
  name: string;
  responsavel: string;
  email: string;
  telefone: string;
};
type DisciplinaType = {
  id: number;
  name: string;
  colegioId: number;
};

export default function Disciplina() {
  const router = useRouter();
  const database = useSQLiteContext();
  const colegioDB = useSQLiteContext();

  const [dataColegio, setDataColegio] = useState<ColegioType[]>([]);
  const [dataDisciplina, setDataDisciplina] = useState<DisciplinaType[]>([]);

  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");

  const [idColegio, setIdColegio] = useState<number>(0);
  const [nameColegio, setNameColegio] = useState<string>("");

  const [bloqueado, setBloqueado] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState(dataDisciplina);

  const loadData = async () => {
    const result = await database.getAllAsync<DisciplinaType>(
      "SELECT * FROM disciplina;",
    );
    setDataDisciplina(result);

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
              name = ?
              
             WHERE id = ?`,
            [name, id],
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
    setFilteredData(
      dataDisciplina.filter((item) => item.colegioId === idColegio),
    );
  }, [id, idColegio]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWithHeader}>
        {/* Campo de entrada com label */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Selecione o Colegio</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={idColegio}
              onValueChange={(itemValue: number) => {
                setIdColegio(itemValue);
              }}
            >
              <Picker.Item
                value={-1}
                label="Selecione um colegio"
              ></Picker.Item>
              {dataColegio.map((item) => (
                <Picker.Item value={item.id} label={item.name}></Picker.Item>
              ))}
            </Picker>
          </View>
          <Text style={styles.label}>Nome Disciplina</Text>
          <TextInput
            editable={bloqueado}
            maxLength={255}
            inputMode="text"
            style={styles.input}
            placeholder="Ex.: Matematica"
            value={name}
            onChangeText={(t) => setName(t)}
          />
        </View>
        {/* Botão de adicionar */}
        <View
          style={[styles.inputContainerCollumn, { justifyContent: "flex-end" }]}
        >
          {/* <TouchableOpacity
            style={[styles.addButton, { backgroundColor: "blue" }]}
            onPress={() => null}
          >
            <Text style={styles.addButtonText}>Novo</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.addButton]}
            onPress={() => handelSave()}
          >
            <Text style={styles.addButtonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: "gray" }]}
            onPress={() => cancela}
          >
            <Text style={styles.addButtonText}>Cancela</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.divider, { marginBottom: 10 }]} />
        {/* Lista */}
        <Text style={styles.listLabel}>Colegios Cadastrados.</Text>
        <FlatList
          style={{
            paddingHorizontal: 0,
            minHeight: 300,
            maxHeight: 300,
          }}
          showsVerticalScrollIndicator
          data={filteredData}
          contentContainerStyle={styles.flatListContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum item adicionado.</Text>
          }
          renderItem={({ item }) => {
            return (
              <View style={styles.listItem}>
                <TouchableOpacity
                  onPress={() => {
                    setId(item.id);
                    setName(item.name);
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.listItemDescription}>{item.id} - </Text>
                    <Text style={styles.listItemTittle}> {item.name}</Text>
                  </View>
                  <View></View>
                </TouchableOpacity>
                <View>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <MaterialIcons size={28} name="delete" color={"red"} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
