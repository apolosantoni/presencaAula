import { styles } from "@/components/style-geral";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";
import {
  ScrollView,
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

type TurmaType = {
  id: number;
  colegioId: number;
  disciplinaId: number;
  periodo: string;
  serie: string;
  turma: string;
};
type AlunoType = {
  id: number;
  name: string;
  colegioId: number;
  periodo: string;
  serie: string;
  turma: string;
};

export default function Turma() {
  const router = useRouter();
  //const [dbAluno, dbColegio, dbDisciplina] = Array(3).fill(useSQLiteContext());
  const database = useSQLiteContext();

  const [dataAluno, setDataAluno] = useState<AlunoType[]>([]);
  const [dataColegio, setDataColegio] = useState<ColegioType[]>([]);
  const [dataDisciplina, setDataDisciplina] = useState<DisciplinaType[]>([]);

  const [idColegio, setIdColegio] = useState<number>();
  const [nomeColegio, setNomeColegio] = useState<string>();

  const [idDisciplina, setIdDisciplina] = useState<number>();
  const [nomeDisciplina, setNomeDisciplina] = useState<string>();

  const [idTurma, setIdTurma] = useState<number>();
  const [turmaColegioId, setTurmaColegioId] = useState<number>();
  const [turmaDisciplinaId, setTurmaDisciplinaId] = useState<number>();
  const [turmaPeriodo, setTurmaPeriodo] = useState<string>();
  const [turmaSerie, setTurmaSerie] = useState<string>();
  const [turmaTurma, setTurmaTurma] = useState<string>();

  const [idAluno, setIdAluno] = useState<number>();
  const [alunoColegioId, setAlunoColegioId] = useState<number>();
  const [alunoDisciplinaId, setAlunoDisciplinaId] = useState<number>();
  const [alunoPeriodo, setAlunoPeriodo] = useState<string>();
  const [alunoSerie, setAlunoSerie] = useState<string>();
  const [alunoTurma, setAlunoTurma] = useState<string>();

  const [filtroDisciplina, setFiltroDisciplina] =
    useState<DisciplinaType[]>(dataDisciplina);

  const loadData = async () => {
    const rColegio = await database.getAllAsync<ColegioType>(
      "SELECT * FROM colegio;",
    );
    setDataColegio(rColegio);

    const rDisciplina = await database.getAllAsync<DisciplinaType>(
      "SELECT * FROM disciplina;",
    );
    setDataDisciplina(rDisciplina);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWithHeader}>
        {/* Campo de entrada com label */}
        <View style={styles.inputContainer}>
          {/** Text Inputs */}
          <Text style={styles.label}>Selecione o colégio</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={idColegio}
              onValueChange={(itemValue: number) => {
                setIdColegio(itemValue);
                setIdDisciplina(-1);
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
          <Text style={styles.label}>Selecione a disciplina</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={idDisciplina}
              onValueChange={(itemValue: number) => {
                setIdDisciplina(itemValue);
              }}
            >
              <Picker.Item
                value={-1}
                label={
                  idColegio === -1
                    ? "Sem Disciplinas"
                    : "Selecione o Disciplina"
                }
              ></Picker.Item>
              {dataDisciplina
                .filter((item) => item.colegioId === idColegio)
                .map((disciplina) => (
                  <Picker.Item
                    value={disciplina.id}
                    label={disciplina.name}
                  ></Picker.Item>
                ))}
            </Picker>
          </View>
          <Text style={styles.label}>Complemento</Text>
          <View style={styles.componentRow}>
            {/** Periodo*/}
            <View style={[styles.pickers, { width: "48%" }]}>
              <Picker
                enabled={idDisciplina != -1 ? true : false}
                selectedValue={turmaPeriodo}
                onValueChange={(itemValue: string) => {
                  setTurmaPeriodo(itemValue);
                }}
              >
                <Picker.Item value={-1} label={"Periodo"} />
                <Picker.Item value={"1"} label="Matutino" />
                <Picker.Item value={"2"} label="Vespertino" />
                <Picker.Item value={"3"} label="Noturno" />
              </Picker>
            </View>
            {/** Serie*/}
            <View style={[styles.pickers, { width: "48%" }]}>
              <Picker
                enabled={idDisciplina != -1 ? true : false}
                selectedValue={turmaSerie}
                onValueChange={(itemValue: string) => {
                  setTurmaSerie(itemValue);
                }}
              >
                <Picker.Item value={"-1"} label={"Ensino"} />
                <Picker.Item value={"1"} label="Maternal" />
                <Picker.Item value={"2"} label="Infantil" />
                <Picker.Item value={"3"} label="Fundamental" />
                <Picker.Item value={"4"} label="Médio" />
                <Picker.Item value={"5"} label="Tecnico" />
              </Picker>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.componentRow}>
            {/** Serie*/}
            <View style={[styles.pickers, { width: "48%" }]}>
              <Picker
                enabled={idDisciplina != -1 ? true : false}
                selectedValue={turmaSerie}
                onValueChange={(itemValue: string) => {
                  setTurmaSerie(itemValue);
                }}
              >
                <Picker.Item value={-1} label={"Serie"} />
                <Picker.Item value={"1"} label="1º ano" />
                <Picker.Item value={"2"} label="2º ano" />
                <Picker.Item value={"3"} label="3º ano" />
                <Picker.Item value={"4"} label="4º ano" />
                <Picker.Item value={"5"} label="5º ano" />
                <Picker.Item value={"6"} label="6º ano" />
                <Picker.Item value={"7"} label="7º ano" />
                <Picker.Item value={"8"} label="8º ano" />
                <Picker.Item value={"9"} label="9º ano" />
              </Picker>
            </View>
            {/** Turma*/}
            <View style={[styles.pickers, { width: "48%" }]}>
              <Picker
                enabled={idDisciplina != -1 ? true : false}
                selectedValue={turmaTurma}
                onValueChange={(itemValue: string) => {
                  setTurmaTurma(itemValue);
                }}
              >
                <Picker.Item value={"-1"} label={"Turma"} />
                <Picker.Item value={"S"} label=" " />
                <Picker.Item value={"A"} label="A" />
                <Picker.Item value={"B"} label="B" />
                <Picker.Item value={"C"} label="C" />
              </Picker>
            </View>
          </View>
          <View style={[styles.divider, { marginVertical: 20 }]} />
          {/** Text Inputs */}
          <Text style={styles.label}>Nome Aluno</Text>
          <TextInput
            editable={idColegio != -1 ? true : false}
            maxLength={255}
            inputMode="text"
            style={styles.input}
            placeholder="Ex.: José Silva"
            //value={name}
            //onChangeText={(t) => setName(t)}
          />
          <Text style={styles.label}>Registro Matricula</Text>
          <View
            style={[
              styles.componentRow,
              { alignItems: "center", justifyContent: "space-between" },
            ]}
          >
            <TextInput
              editable={idColegio != -1 ? true : false}
              maxLength={255}
              inputMode="text"
              style={[styles.inputs, { width: "45%" }]}
              placeholder="Ex.: RM123456789"
              //value={name}
              //onChangeText={(t) => setName(t)}
            />
            <View
              style={[
                styles.componentRow,
                { width: "45%", justifyContent: "space-between" },
              ]}
            >
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity onPress={() => null}>
                  <MaterialIcons size={30} name="add-circle" color={"blue"} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity onPress={() => null}>
                  <MaterialIcons size={30} name="save" color={"green"} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity onPress={() => null}>
                  <MaterialIcons size={30} name="cancel" color={"gray"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.divider, { marginVertical: 20 }]} />
        {/** Lista de alunos */}
        <Text style={styles.label}>Alunos registrados:</Text>
        {/* <TouchableOpacity onPress={() => router.navigate("/modTeste")}>
          <Text> Abrir Modal</Text>
        </TouchableOpacity> */}

        <ScrollView style={{ flex: 1, minHeight: 200, maxHeight: "auto" }}>
          <View style={styles.flatListContainer}>
            {Array.from({ length: 10 }, (_, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listItemText}>Aluno {i + 1}</Text>
                <TouchableOpacity style={styles.removeButton}>
                  <MaterialIcons
                    size={26}
                    name="delete"
                    color={"yellow"}
                  ></MaterialIcons>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
