// components/analysis/health-guide-list.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HealthGuideCard from "./health-guide-card";

export default function HealthGuideList() {
  const tips = [
    "튀김·소스 양을 줄이거나 구이/에어프라이로 대체하세요.",
    "밥은 반공기 또는 잡곡으로 교체해 보세요.",
    "샐러드·채소를 1~2접시 추가하세요.",
    "국물은 적게 드시거나 맑은 국으로 대체하세요.",
  ];

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>개선 방향</Text>
      {tips.map((tip, index) => (
        <HealthGuideCard key={index} text={tip} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: "92%" },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
    marginLeft: 4,
  },
});
