import { View, Text, StyleSheet } from "react-native";

export default function MarketPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>마켓 페이지</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
