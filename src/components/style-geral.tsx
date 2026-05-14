import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // garante que fique acima do conteúdo
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    paddingTop: 70, // espaço para o header
    paddingBottom: 70, // espaço para o footer
    paddingHorizontal: 16,
  },
  contentWithHeader: {
    paddingTop: 0, // espaço para o header
    paddingBottom: 70, // espaço para o footer
    paddingHorizontal: 16,
  },
  contentTab: {
    paddingTop: 70, // espaço para o header
    paddingBottom: 380, // espaço para o footer
    paddingHorizontal: 16,
  },
  scroolView: {
    paddingHorizontal: 16,
    minHeight: 200,
    maxHeight: 300,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 22,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#03dac6",
    justifyContent: "center",
    zIndex: 10,
  },
  footerText: {
    textAlign: "center",
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: 12,
  },
  inputContainerCollumn: {
    marginBottom: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  inputContainerRow: {
    marginBottom: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "space-between",
    gap: 10,
  },
  componentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  viewInput: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#FFF",
  },
  inputs: {
    //width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#FFF",
  },
  picker: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 6,
    backgroundColor: "#FFF",
  },
  pickers: {
    //width: "30%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 6,
    backgroundColor: "#FFF",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  addButtonIcon: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignContent: "flex-end",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  listLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#DDD",
    //marginBottom: 8,
    //gap: 10,
  },
  listItemTittle: { fontWeight: "bold", fontSize: 20 },
  listItemName: { fontWeight: "bold", fontSize: 16 },
  listItemDescription: { fontSize: 12 },
  listItemIcon: {},
  itemLabel: {
    fontWeight: "bold",
    marginRight: 6,
  },
  itemText: {
    flex: 1,
  },
  removeButton: {
    backgroundColor: "#E53935",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  removeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  flatListContainer: {
    //borderWidth: 1,
    borderRadius: 6,
    borderColor: "#CCC",
    paddingVertical: 5,
    gap: 5,
  },
  listItemText: {
    fontSize: 16,
    color: "#333",
  },
  divider: {
    //width: "100%", // Espessura da linha
    height: 1, // Altura total do container
    backgroundColor: "#ccc", // Cor da linha
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
