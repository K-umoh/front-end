import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * 스탠드얼론 차트:
 * - 내부에 돈가스 더미데이터(DONGAS_ITEMS)를 보유
 * - 자체 합산 후 탄/단/지 "목표(1끼)" vs "실제" 막대 그래프 출력
 * - 하단에 나트륨/당류 합계 표시
 *
 * 옵션 props:
 *  - kcalPerDay: 일일 총열량 (기본 2400)
 *  - amdr: { carb, protein, fat }  // 에너지비율 (기본 0.60 / 0.15 / 0.25)
 */

const DONGAS_ITEMS = [
  {
    id: "cutlet",
    name: "돈가스",
    grams: 230,
    kcal: 750,
    carb: 50,
    protein: 35,
    fat: 45,
    sugar: 8,
    sodium: 1200,
  },
  {
    id: "sausage",
    name: "소시지",
    grams: 90,
    kcal: 270,
    carb: 10,
    protein: 12,
    fat: 20,
    sugar: 2,
    sodium: 650,
  },
  {
    id: "shrimp-fry",
    name: "새우튀김(2개)",
    grams: 60,
    kcal: 180,
    carb: 16,
    protein: 7,
    fat: 10,
    sugar: 1,
    sodium: 340,
  },
  {
    id: "rice",
    name: "백미밥",
    grams: 150,
    kcal: 230,
    carb: 52,
    protein: 4,
    fat: 0.5,
    sugar: 0,
    sodium: 3,
  },
  {
    id: "corn",
    name: "옥수수콘",
    grams: 60,
    kcal: 90,
    carb: 17,
    protein: 3,
    fat: 1.5,
    sugar: 5,
    sodium: 120,
  },
  {
    id: "slaw",
    name: "양배추 샐러드(드레싱)",
    grams: 50,
    kcal: 85,
    carb: 6,
    protein: 1,
    fat: 6,
    sugar: 3,
    sodium: 160,
  },
  {
    id: "fries",
    name: "감자튀김",
    grams: 120,
    kcal: 360,
    carb: 40,
    protein: 5,
    fat: 20,
    sugar: 1,
    sodium: 360,
  },
];

export default function NutritionChartStandalone({
  kcalPerDay = 2400,
  amdr = { carb: 0.6, protein: 0.15, fat: 0.25 },
}) {
  // 합계 계산 (하드코딩과 정확히 일치)
  const totals = useMemo(() => {
    const sum = (k) => DONGAS_ITEMS.reduce((a, c) => a + (c[k] || 0), 0);
    return {
      grams: sum("grams"), // 760
      kcal: sum("kcal"), // 1965
      carb: sum("carb"), // 191 g
      protein: sum("protein"), // 67 g
      fat: sum("fat"), // 103 g
      sugar: sum("sugar"), // 20 g
      sodium: sum("sodium"), // 2833 mg
    };
  }, []);

  // 1끼 목표치(g) 계산 (KCAL→g: C4/P4/F9)
  const targets = useMemo(() => {
    const perDayC = (kcalPerDay * amdr.carb) / 4;
    const perDayP = (kcalPerDay * amdr.protein) / 4;
    const perDayF = (kcalPerDay * amdr.fat) / 9;
    return {
      carb: perDayC / 3, // 2400kcal, 60% → 120g
      protein: perDayP / 3, // 30g
      fat: perDayF / 3, // ≈22.2g
    };
  }, [kcalPerDay, amdr]);

  const groups = [
    { key: "carb", label: "탄수화물", unit: "g" },
    { key: "protein", label: "단백질", unit: "g" },
    { key: "fat", label: "지방", unit: "g" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>성분 분석</Text>

      <View style={styles.legendRow}>
        <Legend color="#A5D6A7" label="한끼 기준치" />
        <Legend color="#2E7D32" label="분석된 식단" />
      </View>

      <View style={styles.chartRow}>
        {groups.map((g) => (
          <BarPair
            key={g.key}
            label={g.label}
            unit={g.unit}
            target={targets[g.key]}
            actual={totals[g.key]}
            targetColor="#A5D6A7"
            actualColor="#2E7D32"
          />
        ))}
      </View>

      {/* 하단 요약(합계 그대로 표시) */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          나트륨:{" "}
          <Text style={styles.footerHighlight}>
            {formatNum(totals.sodium)} mg
          </Text>
        </Text>
        <Text style={styles.footerText}>
          당류:{" "}
          <Text style={styles.footerHighlight}>
            {formatNum(totals.sugar)} g
          </Text>
        </Text>
      </View>

      <Text style={styles.note}>
        * 각 카테고리(탄·단·지) 내부 최대값 대비 상대 높이로 표시됩니다.
      </Text>
    </View>
  );
}

function Legend({ color, label }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

function BarPair({
  label,
  unit = "g",
  target,
  actual,
  targetColor = "#A5D6A7",
  actualColor = "#2E7D32",
  maxHeight = 140,
}) {
  const maxVal = Math.max(target, actual, 1e-6);
  const tH = Math.max((target / maxVal) * maxHeight, 2);
  const aH = Math.max((actual / maxVal) * maxHeight, 2);

  return (
    <View style={styles.groupCol}>
      <Text style={styles.groupLabel}>{label}</Text>
      <View style={styles.barWrap}>
        <View style={styles.barCol}>
          <View
            style={[styles.bar, { height: tH, backgroundColor: targetColor }]}
          />
          <Text style={styles.valueText}>
            {round1(target)}
            {unit}
          </Text>
        </View>
        <View style={styles.barCol}>
          <View
            style={[styles.bar, { height: aH, backgroundColor: actualColor }]}
          />
          <Text style={styles.valueText}>
            {round1(actual)}
            {unit}
          </Text>
        </View>
      </View>
    </View>
  );
}

function round1(n) {
  return Math.round(n * 10) / 10;
}
function formatNum(n) {
  try {
    return new Intl.NumberFormat("ko-KR").format(n);
  } catch {
    return String(n);
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    width: "92%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "800", marginBottom: 8, color: "#1b3b1e" },

  legendRow: { flexDirection: "row", gap: 16, marginTop: 2, marginBottom: 4 },
  legendItem: { flexDirection: "row", alignItems: "center" },
  dot: { width: 10, height: 10, borderRadius: 6, marginRight: 6 },
  legendText: { color: "#444", fontSize: 12, fontWeight: "600" },

  chartRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginTop: 8,
    marginBottom: 8,
  },
  groupCol: { width: "30%", alignItems: "center" },
  groupLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 8,
  },
  barWrap: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    minHeight: 160,
  },
  barCol: { alignItems: "center", width: "40%" },
  bar: { width: "100%", borderRadius: 8 },
  valueText: { marginTop: 6, fontSize: 12, color: "#333", fontWeight: "600" },

  footer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: { fontSize: 12, color: "#555" },
  footerHighlight: { fontWeight: "800", color: "#222" },
  note: { marginTop: 6, fontSize: 11, color: "#7a7a7a" },
});
