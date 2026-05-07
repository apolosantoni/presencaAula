import { Text, View, StyleSheet } from "react-native";

export default function Agenda() {
  return (
    <View style={styles.container}>
      <Text>Agenda</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
