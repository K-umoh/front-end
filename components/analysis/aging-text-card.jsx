// components/analysis/aging-text-card.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AgingTextCard({ variant = "warning" }) {
  const theme = THEMES[variant];

  return (
    <LinearGradient
      colors={theme.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { borderColor: theme.border }]}
    >
      <MaterialCommunityIcons
        name={theme.icon}
        size={40}
        color={theme.primary}
        style={{ marginBottom: 12 }}
      />

      <Text style={[styles.title, { color: theme.primary }]}>
        {theme.title}
      </Text>

      <View style={[styles.badge, { borderColor: theme.primary }]}>
        <Text style={[styles.badgeText, { color: theme.primary }]}>
          {theme.badge}
        </Text>
      </View>

      <Text style={styles.subtext}>{theme.text}</Text>

      {/* 리스크/강점 태그 */}
      <View style={styles.chipsRow}>
        {theme.chips.map((c, i) => (
          <View
            key={i}
            style={[styles.chip, { backgroundColor: theme.chipBg }]}
          >
            <Text style={[styles.chipText, { color: theme.primary }]}>{c}</Text>
          </View>
        ))}
      </View>

      {/* AGEs 안내 (경고 테마에서만) */}
      {theme.ages && (
        <View style={styles.agesBox}>
          <MaterialCommunityIcons name="fire" size={18} color={theme.primary} />
          <View style={{ marginLeft: 8, flex: 1 }}>
            <Text style={styles.agesTitle}>{theme.ages.title}</Text>
            {theme.ages.lines.map((l, i) => (
              <Text key={i} style={styles.agesText}>
                • {l}
              </Text>
            ))}
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const THEMES = {
  good: {
    gradient: ["#D5E3D1", "#B4CDB0"],
    primary: "#2F7D32",
    border: "#CFE5D4",
    icon: "leaf",
    title: "저속노화형 식단",
    badge: "훌륭합니다!",
    text: "항산화 성분과 식이섬유가 충분하고, 포화지방과 나트륨이 적정 수준이에요.",
    chips: ["항산화 ↑", "식이섬유 ↑", "당·나트륨 적정"],
    chipBg: "#E8F3EA",
  },
  average: {
    gradient: ["#EEF5E8", "#E1EED7"],
    primary: "#3E7F46",
    border: "#DDEAD6",
    icon: "sprout",
    title: "중립형 식단",
    badge: "보통이에요",
    text: "전체적인 균형은 무난하지만, 섬유소와 항산화 보충 또는 나트륨 관리를 권장해요.",
    chips: ["식이섬유 보완", "항산화 보완", "나트륨 주의"],
    chipBg: "#ECF5EE",
  },
  warning: {
    gradient: ["#FFE8E3", "#FDE2D5"],
    primary: "#D14343",
    border: "#F6C7BE",
    icon: "alert-decagram-outline",
    title: "고속노화 주의",
    badge: "개선이 필요해요",
    text: "튀김/가공육과 소스로 인해 포화지방·나트륨·정제 탄수 비중이 높고, 항산화가 부족해요.",
    chips: ["포화지방 ↑", "나트륨 ↑", "정제 탄수 ↑", "항산화 낮음", "AGEs ↑"],
    chipBg: "#FFF2EE",
    ages: {
      title: "AGE(당화최종산물) 경고",
      lines: [
        "돈가스처럼 고온 튀김 조리는 AGEs 생성을 크게 높입니다.",
        "삶기·찜·조림 등 수분 많은 조리법은 AGEs를 줄이는 데 도움됩니다.",
      ],
    },
  },
};

const styles = StyleSheet.create({
  container: {
    width: "92%",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 15,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
  },
  title: { fontSize: 18, fontWeight: "800", marginBottom: 10 },
  badge: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 10,
    borderWidth: 1,
  },
  badgeText: { fontWeight: "800", fontSize: 13 },
  subtext: { fontSize: 14, color: "#333", textAlign: "center", lineHeight: 20 },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
  },
  chip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  chipText: { fontSize: 12, fontWeight: "800" },

  agesBox: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "#FFF6F4",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#F9C9BD",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  agesTitle: { fontWeight: "800", color: "#B53C3C", marginBottom: 4 },
  agesText: { color: "#333", lineHeight: 18, fontSize: 13 },
});
