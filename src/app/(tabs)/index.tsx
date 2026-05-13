import { styles } from "@/components/style-geral";
import React, { useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
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

export default function Index() {
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
      <View style={styles.contentTab}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Index Tabs</Text>
        </View>
        <View style={{}}></View>

        {/* Campo de entrada com label */}

        <View style={styles.inputContainerCollumn}>
          <View style={styles.viewInput}>
            <Text style={styles.label}>Digite um valor:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Maçã"
              value={inputValue}
              onChangeText={setInputValue}
            />
          </View>
        </View>

        {/* Botão de adicionar */}
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>

        {/* Lista */}
        <Text style={styles.listLabel}>Itens adicionados:</Text>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum item adicionado.</Text>
          }
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer</Text>
      </View>
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
