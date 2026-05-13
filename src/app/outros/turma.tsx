import { styles } from "@/components/style-geral";
import React from "react";
import { Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Turma() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Index Tabs</Text>
        <View style={styles.divider} />
      </View>
    </SafeAreaView>
  );
}
