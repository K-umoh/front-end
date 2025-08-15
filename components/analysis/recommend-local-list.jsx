import { View, Text, StyleSheet } from "react-native";
import RecommendLocalCard from "./recommend-local-card";

export default function RecommendLocalList() {
  const items = [
    { name: "완도 미역·다시마", highlight: true }, // 해조류: 식이섬유/미네랄
    { name: "남해 마늘" }, // 알리신 풍부, 향으로 소스 사용량 절감
    { name: "해남 밤고구마" }, // 튀김 대체 탄수화물(구이/찜)
    { name: "제주 당근" }, // 베타카로틴·항산화
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
