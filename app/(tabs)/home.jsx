import { View, Text, StyleSheet } from "react-native";
import WeeklyAgingScore from "../../components/home/weekly-aging-score";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <WeeklyAgingScore />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
