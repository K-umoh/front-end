import { View, Text, StyleSheet } from "react-native";

export default function RecommendPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>추천식단 페이지</Text>
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
