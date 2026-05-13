import { styles } from "@/components/style-geral";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecriandoBancoDados } from "../outros/database";
type PerfilType = {
  id: number;
  name: string;
  email: string;
  telefone: string;
};
export default function Configuracao() {
  const route = useRouter();
  const database = useSQLiteContext();

  const [data, setData] = useState<PerfilType[]>([]);

  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  const loadData = async () => {
    const result = await database.getAllAsync<PerfilType>(
      "SELECT * FROM perfil;",
    );

    setData(result);
    setId(data[0]?.id);
    setName(data[0]?.name);
    setEmail(data[0]?.email);
    setTelefone(data[0]?.telefone);
  };

  const handelSave = async (ids: number) => {
    try {
      if (ids > 0) {
        try {
          await database.runAsync(
            `UPDATE perfil SET
              name = ?,
              email = ?,
              telefone = ?
             WHERE id = ?`,
            [name, email, telefone, ids],
          );
          loadData();
        } catch (error) {
          console.log(error);
        }
      } else {
        await database.runAsync(
          "INSERT INTO perfil (name, email, telefone) VALUES (?,?,?);",
          [name, email, telefone],
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadData();
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );
  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentTab}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Seus Dados</Text>
        </View>

        {/* Campo de entrada com label */}

        <View style={styles.inputContainer}>
          <View style={{}}>
            <Text style={styles.label}>Entre com seu nome:</Text>
            <TextInput
              maxLength={255}
              inputMode="text"
              style={styles.input}
              placeholder="Ex: Maria"
              value={name}
              onChangeText={(t) => setName(t)}
            />
          </View>
          <View style={{}}>
            <Text style={styles.label}>Entre com seu Email:</Text>
            <TextInput
              maxLength={255}
              inputMode="email"
              style={styles.input}
              placeholder="Ex: maria@gmail.com"
              value={email}
              onChangeText={(t) => setEmail(t)}
            />
          </View>
          <View style={{}}>
            <Text style={styles.label}>Entre com seu Telefone:</Text>
            <TextInput
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
        <TouchableOpacity style={styles.addButton} onPress={() => handelSave}>
          <Text style={styles.addButtonText}>
            {id === 0 ? "Salvar Dados" : "Atualizar Dados"}
          </Text>
        </TouchableOpacity>

        {/* Lista */}
        <Text style={styles.listLabel}>Cadastros:</Text>
        <View
          style={{
            alignItems: "stretch",
            alignContent: "space-between",
            justifyContent: "space-between",
            gap: 50,
          }}
        >
          <View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => route.push("/outros/colegio")}
            >
              <Text style={styles.addButtonText}>Cadastrar Colegios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => route.push("/outros/disciplina")}
            >
              <Text style={styles.addButtonText}>Cadastrar Disciplinas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => route.push("/outros/complementares")}
            >
              <Text style={styles.addButtonText}>Dados complementares</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => route.push("/outros/turma")}
            >
              <Text style={styles.addButtonText}>Cadastrar Turma</Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <TouchableOpacity
              style={[styles.addButtonIcon, { backgroundColor: "yellow" }]}
              onPress={() => RecriandoBancoDados}
            >
              <Text style={[styles.addButtonText, { color: "red" }]}>
                Recriar Banco Dados
              </Text>
              <MaterialIcons size={22} name="warning" color={"red"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={{ gap: 5, bottom: -7, paddingHorizontal: 15 }}>
          <TouchableOpacity style={styles.addButton} onPress={() => null}>
            <Text style={styles.addButtonText}>Sobre sistema</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
