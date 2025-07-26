import { View, Text, StyleSheet } from "react-native";
import HealthGuideCard from "./health-guide-card";

export default function HealthGuideList() {
  const tips = [
    "통곡물과 채소 섭취량을 늘려 섬유질을 보충하세요.",
    "붉은 육류 대신 생선/콩류로 단백질을 섭취하세요.",
    "튀김 요리 대신 찜이나 구이 방식으로 조리하세요.",
  ];

  return (
    <View>
      <Text style={styles.title}>개선 방향</Text>
      {tips.map((tip, index) => (
        <HealthGuideCard key={index} text={tip} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 16,
  },
});
