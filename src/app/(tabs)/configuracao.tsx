import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { RecriandoBancoDados } from "../outros/auxiliares/database";
import { SQLiteDatabase, SQLiteProvider, SQLiteStatement } from "expo-sqlite";

export default function Configuracao() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tittle}>
        <Text>Preencha suas informçoes e dados.</Text>
        <View
          style={{
            width: "100%",
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            borderStyle: "solid",
          }}
        ></View>
      </View>
      <View style={styles.viewFormulario}>
        <View>
          <TextInput style={styles.textInput} placeholder="Seu nome" />
          <TextInput style={styles.textInput} placeholder="Seu email" />
          <TextInput style={styles.textInput} placeholder="Telefone" />
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              alignContent: "flex-end",
            }}
          >
            <Text>Salve os dados</Text>
            <MaterialIcons size={28} name="save" color={"blue"} />
          </TouchableOpacity>
        </View>

        <View style={styles.line}></View>
        <View style={styles.splitView}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              alignContent: "flex-end",
            }}
            onPress={() => router.push("/outros/colegio")}
          >
            <Text>Cadastrar Colegios</Text>
            <MaterialIcons size={28} name="save" color={"blue"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              alignContent: "flex-end",
            }}
            onPress={() => router.push("/outros/disciplina")}
          >
            <Text>Cadastrar disciplinas</Text>
            <MaterialIcons size={28} name="save" color={"blue"} />
          </TouchableOpacity>
        </View>
        <View style={styles.splitView}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              alignContent: "flex-end",
            }}
            onPress={() => router.push("/outros/aluno")}
          >
            <Text>Cadastrar Alunos</Text>
            <MaterialIcons size={28} name="save" color={"blue"} />
          </TouchableOpacity>
        </View>

        <View style={styles.splitView}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              alignContent: "flex-end",
            }}
            onPress={() => {
              RecriandoBancoDados;
            }}
          >
            <Text>Recriar Banco Dados</Text>
            <MaterialIcons size={28} name="warning" color={"red"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
export const options = {
  headerShown: false,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    borderStyle: "solid",
  },
  tittle: {
    justifyContent: "center",
    alignItems: "center",
  },
  tittleText: {
    fontSize: 16,
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
  viewFormulario: {
    justifyContent: "center",
    marginTop: 30,
    marginHorizontal: 20,
  },
  textInput: {
    borderBottomWidth: 1, // Creates the line
    borderBottomColor: "#333", // Line color
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  splitView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    gap: 20,
  },
  viewFlatlist: {
    flex: 1,
    flexDirection: "column",
  },
});
