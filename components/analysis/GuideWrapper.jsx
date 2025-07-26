import { StyleSheet, View, Text } from "react-native";
import HealthGuideList from "./health-guide-list";
import RecommendLocalList from "./recommend-local-list";

export default function GuideWrapper() {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>개선 방향 및 식재료 추천</Text>
      </View>

      <View style={styles.section}>
        <HealthGuideList />
      </View>

      <View style={styles.section}>
        <RecommendLocalList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "92%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 20,
    paddingBottom: 0,
    marginTop: 15,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  titleWrapper: {
    paddingBottom: 12,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  section: {
    marginBottom: 16,
  },
});
