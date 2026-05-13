import { styles } from "@/components/style-geral";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useEffect, useState } from "react";
import {
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

export default function Colegio() {
  const router = useRouter();
  const database = useSQLiteContext();
  const [data, setData] = useState<ColegioType[]>([]);

  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [responsavel, setResponsavel] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  const [bloqueado, setBloqueado] = useState<boolean>(false);

  //Carrega todos os dado cadastrados de Colegios.
  const loadData = async () => {
    const result = await database.getAllAsync<ColegioType>(
      "SELECT * FROM colegio;",
    );
    setData(result);
  };

  //Salva ou atualiza, se for indormado um Id
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
      handelCancela();
      loadData();
    }
  };

  const handelCancela = () => {
    setId(0);
    setName("");
    setResponsavel("");
    setEmail("");
    setTelefone("");
    setBloqueado(true);
  };

  const handelNovo = () => {
    setId(0);
    setName("");
    setResponsavel("");
    setEmail("");
    setTelefone("");
    setBloqueado(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await database.runAsync("DELETE FROM colegio WHERE id = ?", [id]);

      loadData();
    } catch (error) {
      console.log(error);
    } finally {
      setId(0);
    }
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
      <View style={styles.contentWithHeader}>
        {/* Campo de entrada com label */}

        <View style={styles.inputContainer}>
          <View style={{}}>
            <Text style={styles.label}>Nome do colegio</Text>
            <TextInput
              editable={!bloqueado}
              maxLength={255}
              inputMode="text"
              style={styles.input}
              placeholder="Ex. EEPG Juscelino Kubitschek"
              value={name}
              onChangeText={(t) => setName(t)}
            />
          </View>
          <View style={{}}>
            <Text style={styles.label}>Responsavel por Relatorio</Text>
            <TextInput
              editable={!bloqueado}
              maxLength={255}
              inputMode="text"
              style={styles.input}
              placeholder="Ex. João Paulo"
              value={responsavel}
              onChangeText={(t) => setResponsavel(t)}
            />
          </View>
          <View style={{}}>
            <Text style={styles.label}>E-mail para envio Relatorio:</Text>
            <TextInput
              editable={!bloqueado}
              maxLength={255}
              inputMode="email"
              style={styles.input}
              placeholder="joaopaulo@gmail.com"
              value={email}
              onChangeText={(t) => setEmail(t)}
            />
          </View>
          <View style={{}}>
            <Text style={styles.label}>Telefone para envio via Whatsapp</Text>
            <TextInput
              editable={!bloqueado}
              maxLength={11}
              inputMode="tel"
              style={styles.input}
              placeholder="Ex: 1299999999"
              value={telefone}
              onChangeText={(t) => setTelefone(t)}
            />
          </View>
        </View>

        {/* Botão de adicionar */}
        <View
          style={[styles.inputContainerCollumn, { justifyContent: "flex-end" }]}
        >
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: "blue" }]}
            onPress={() => handelNovo()}
          >
            <Text style={styles.addButtonText}>Novo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addButton]}
            onPress={() => handelSave()}
          >
            <Text style={styles.addButtonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: "gray" }]}
            onPress={() => handelCancela()}
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
          data={data}
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
                    setResponsavel(item.responsavel);
                    setEmail(item.email);
                    setTelefone(item.telefone);
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.listItemDescription}>{item.id} - </Text>
                    <Text style={styles.listItemTittle}> {item.name}</Text>
                  </View>
                  <View>
                    <Text style={styles.listItemName}>
                      - {item.responsavel}
                    </Text>
                    <Text style={styles.listItemDescription}>
                      - {item.email}
                    </Text>
                    <Text style={styles.listItemDescription}>
                      - {item.telefone}
                    </Text>
                  </View>
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
