// components/analysis/first-meal-hint.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function FirstMealHint() {
  return (
    <LinearGradient
      colors={["#F0FDF4", "#E8F3EA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.wrap}
    >
      <View style={styles.headerRow}>
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={22}
          color="#2E7D32"
        />
        <Text style={styles.title}>
          식단을 등록해서 분석 결과를 받아보세요!
        </Text>
      </View>

      <Text style={styles.sub}>
        상단의 <Text style={styles.bold}>“카메라로 식단 분석하기”</Text> 버튼을
        눌러 사진을 올리면, 탄·단·지와 나트륨/당류까지 AI가 자동 분석해드려요.
      </Text>

      <View style={styles.stepsRow}>
        <Step icon="camera-outline" label="사진 업로드" />
        <Arrow />
        <Step icon="robot-happy-outline" label="AI 분석" />
        <Arrow />
        <Step icon="chart-bar" label="결과 확인" />
      </View>

      <View style={styles.hintBox}>
        <MaterialCommunityIcons
          name="lightbulb-on-outline"
          size={18}
          color="#2E7D32"
        />
        <Text style={styles.hintText}>
          첫 분석이 완료되면 영양 차트와 노화 관련 인사이트가 여기에 표시됩니다.
        </Text>
      </View>
    </LinearGradient>
  );
}

function Step({ icon, label }) {
  return (
    <View style={styles.stepItem}>
      <View style={styles.stepIconWrap}>
        <MaterialCommunityIcons name={icon} size={20} color="#1b3b1e" />
      </View>
      <Text style={styles.stepLabel}>{label}</Text>
    </View>
  );
}

function Arrow() {
  return (
    <MaterialCommunityIcons name="chevron-right" size={18} color="#2E7D32" />
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "92%",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#dfe9e3",
    marginTop: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 15, fontWeight: "800", color: "#1b3b1e" },
  sub: { marginTop: 6, color: "#3a5241", lineHeight: 20 },
  bold: { fontWeight: "800", color: "#1b3b1e" },

  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  stepItem: { alignItems: "center" },
  stepIconWrap: {
    backgroundColor: "#E8F3EA",
    borderRadius: 999,
    padding: 8,
    borderWidth: 1,
    borderColor: "#cfe5d4",
  },
  stepLabel: {
    fontSize: 12,
    color: "#2E7D32",
    fontWeight: "700",
    marginTop: 6,
  },

  hintBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E8F3EA",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 14,
  },
  hintText: { color: "#1b3b1e", fontWeight: "600", flex: 1 },
});
