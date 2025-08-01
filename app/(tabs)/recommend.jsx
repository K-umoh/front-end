import { View, Text, StyleSheet } from "react-native";
import RecommendFilter from "../../components/recommend/recommend-filter";
import MealList from "../../components/recommend/meal-list";

export default function RecommendPage() {
  return (
    <View style={styles.container}>
      <RecommendFilter />
      <MealList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
