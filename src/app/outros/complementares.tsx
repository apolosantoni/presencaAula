import { styles } from "@/components/style-geral";
import React, { useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

// Tipo para os itens da lista
interface Item {
  id: string;
  name: string;
}

export default function Complementares() {
  const [inputValue, setInputValue] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);

  // Adiciona item à lista
  const addItem = () => {
    if (!inputValue.trim()) return; // validação
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), name: inputValue.trim() },
    ]);
    setInputValue("");
  };

  // Remove item pelo id
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Renderiza cada item da FlatList
  const renderItem = ({ item }: ListRenderItemInfo<Item>) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.contentWithHeader}>
          {/* Campo de entrada com label */}
          <View style={styles.inputContainerRow}>
            <View style={styles.componentRow}>
              <View>
                <Text style={styles.label}>Periodos</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Matutino"
                  value={inputValue}
                  onChangeText={setInputValue}
                />
              </View>
              <View>
                <View></View>
                <TouchableOpacity style={styles.addButton} onPress={addItem}>
                  <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.listLabel}>Lista de Periodos:</Text>
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.flatListContainer}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Nenhum Periodo adicionado.</Text>
              }
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.inputContainerRow}>
            <View style={styles.componentRow}>
              <View>
                <Text style={styles.label}>Series</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Serie"
                  value={inputValue}
                  onChangeText={setInputValue}
                />
              </View>
              <View>
                <View></View>
                <TouchableOpacity style={styles.addButton} onPress={addItem}>
                  <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.listLabel}>Lista de Series:</Text>
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.flatListContainer}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Nenhum Serie adicionado.</Text>
              }
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.inputContainerRow}>
            <View style={styles.componentRow}>
              <View>
                <Text style={styles.label}>Turma</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: A"
                  value={inputValue}
                  onChangeText={setInputValue}
                />
              </View>
              <View>
                <View></View>
                <TouchableOpacity style={styles.addButton} onPress={addItem}>
                  <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.listLabel}>Lista de Turmas:</Text>
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.flatListContainer}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Nenhum Turma adicionado.</Text>
              }
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.inputContainerRow}>
            <View style={styles.componentRow}>
              <View>
                <Text style={styles.label}>Horarios</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 08:00 - 08-40"
                  value={inputValue}
                  onChangeText={setInputValue}
                />
              </View>
              <View>
                <View></View>
                <TouchableOpacity style={styles.addButton} onPress={addItem}>
                  <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.listLabel}>Lista de Horarios:</Text>
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.flatListContainer}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Nenhum horario adicionado.</Text>
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
// Bom comamando para gerar texto
// <View>
//   <ScrollView>
//     <Text style={styles.bodyText}>
//       {Array(50).fill("Conteúdo do meio...\n").join("")}
//     </Text>
//   </ScrollView>
// </View>
