import { View, Text, StyleSheet } from "react-native";
import RecommendLocalCard from "./recommend-local-card";

export default function RecommendLocalList() {
  const items = [
    { name: "완주 유기농 현미", highlight: true },
    { name: "강화도 병아리콩" },
    { name: "무주 단호박" },
    { name: "서산 가지" },
  ];

  return (
    <View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>추천 로컬 식재료</Text>
      </View>
      {items.map((item, idx) => (
        <RecommendLocalCard
          key={idx}
          name={item.name}
          highlighted={item.highlight}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    paddingTop: 20,
    marginTop: -10,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
});
