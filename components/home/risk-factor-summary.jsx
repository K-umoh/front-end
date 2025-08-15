// components/home/risk-factor-summary.jsx
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { useAtomValue } from "jotai";
import { isFirstMealAtom } from "../../state/demo-atom"; // ← 경로 확인
import RiskRow from "./RiskRow";

/**
 * props:
 *  - variant: "home" | "meal"
 *  - mealTotals? (variant="meal"에서 선택): { fat?: number, sodium?: number, cooking?: "fried"|"grill"|"roast"|"boil"|"steam"|"raw" }
 */
export default function RiskFactorSummary({ variant = "home", mealTotals }) {
  if (variant === "home") {
    return <HomeRiskSummary />;
  }
  return <MealRiskSummary mealTotals={mealTotals} />;
}

/* ───────────── Home: 긍정 3 + 부정 3 ───────────── */

function HomeRiskSummary() {
  // ✅ 전역 플래그: 첫 식단 등록 전이면 모든 점수 50으로 고정
  const isFirstMeal = useAtomValue(isFirstMealAtom);

  // 기본(최근 7일) 더미 스코어
  const basePositives = [
    {
      icon: (
        <MaterialCommunityIcons
          name="leaf"
          size={20}
          color="#2E7D32"
          style={styles.icon}
        />
      ),
      label: "식이섬유",
      score: 64,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="oil"
          size={20}
          color="#2E7D32"
          style={styles.icon}
        />
      ),
      label: "불포화지방 비율",
      score: 58,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="fruit-cherries"
          size={20}
          color="#2E7D32"
          style={styles.icon}
        />
      ),
      label: "항산화 식품",
      score: 61,
    },
  ];

  const baseNegatives = [
    {
      icon: (
        <MaterialCommunityIcons
          name="food-off-outline"
          size={20}
          color="#b45309"
          style={styles.icon}
        />
      ),
      label: "트랜스지방",
      score: 35,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="shaker-outline"
          size={20}
          color="#b45309"
          style={styles.icon}
        />
      ),
      label: "나트륨",
      score: 62,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="baguette"
          size={20}
          color="#b45309"
          style={styles.icon}
        />
      ),
      label: "정제 탄수",
      score: 70,
    },
  ];

  // 첫 식단 상태면 모든 점수를 50으로 덮어쓰기
  const positives = isFirstMeal
    ? basePositives.map((p) => ({ ...p, score: 50 }))
    : basePositives;

  const negatives = isFirstMeal
    ? baseNegatives.map((n) => ({ ...n, score: 50 }))
    : baseNegatives;

  return (
    <View style={{ width: "92%" }}>
      <SectionCard title="긍정 지표 (최근 7일)">
        {positives.map((it, i) => (
          <AnimatedRiskRow key={`p-${i}`} {...it} />
        ))}
      </SectionCard>

      <SectionCard title="위험 지표 (최근 7일)">
        {negatives.map((it, i) => (
          <AnimatedRiskRow key={`n-${i}`} {...it} />
        ))}
      </SectionCard>
    </View>
  );
}

/* ───────────── Analysis: 이번 식사 3가지 ───────────── */

function MealRiskSummary({
  mealTotals = { fat: 103, sodium: 2833, cooking: "fried" }, // 돈가스 더미 기본
}) {
  // 한 끼 기준값(2400kcal/일의 1/3)
  const perMealNa = 2300 / 3; // ≈ 767 mg
  const perMealSFA = (2400 * 0.1) / 9 / 3; // ≈ 8.9 g (SFA 10%E 가정)
  // SFA 추정: 튀김/가공육은 총지방의 ~40% 보수적 추정
  const estSFAg = (mealTotals.fat ?? 0) * 0.4;

  const agesScore = cookingToAgesScore(mealTotals.cooking || "fried");
  const sfaScore = Math.min(100, Math.round((estSFAg / perMealSFA) * 100));
  const naScore = Math.min(
    100,
    Math.round(((mealTotals.sodium ?? 0) / perMealNa) * 100)
  );

  const items = [
    {
      icon: (
        <MaterialCommunityIcons
          name="fire"
          size={20}
          color="#3a7d38"
          style={styles.icon}
        />
      ),
      label: "최종당화산물(AGEs)",
      score: agesScore,
    },
    {
      icon: (
        <MaterialIcons
          name="adjust"
          size={20}
          color="#3a7d38"
          style={styles.icon}
        />
      ),
      label: "포화지방",
      score: sfaScore,
      rightText: `${Math.round(estSFAg)}g / ${perMealSFA.toFixed(1)}g`,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="shaker-outline"
          size={20}
          color="#3a7d38"
          style={styles.icon}
        />
      ),
      label: "나트륨",
      score: naScore,
      rightText: `${format(mealTotals.sodium)}mg / ${Math.round(perMealNa)}mg`,
    },
  ];

  return (
    <View style={{ width: "92%" }}>
      <SectionCard
        title="이번 식사 위험 요소"
        footnote="기준: 2400kcal/일, 1끼 목표(1/3)"
      >
        {items.map((it, i) => (
          <AnimatedRiskRow key={`m-${i}`} {...it} />
        ))}
      </SectionCard>
    </View>
  );
}

/* ───────────── 공용 소형 컴포넌트 ───────────── */

function SectionCard({ title, children, footnote }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.divider} />
      {children}
      {!!footnote && <Text style={styles.footnote}>{footnote}</Text>}
    </View>
  );
}

function AnimatedRiskRow(props) {
  const { score } = props;
  const animatedValue = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      animatedValue.value = 0;
      animatedValue.value = withTiming(score, { duration: 1000 });
    }, [score])
  );

  return <RiskRow {...props} animatedValue={animatedValue} />;
}

function cookingToAgesScore(cooking) {
  switch (cooking) {
    case "fried":
      return 95;
    case "grill":
      return 85;
    case "roast":
      return 75;
    case "boil":
      return 40;
    case "steam":
      return 30;
    case "raw":
      return 20;
    default:
      return 70;
  }
}

function format(n) {
  try {
    return new Intl.NumberFormat("ko-KR").format(n);
  } catch {
    return String(n);
  }
}

/* ───────────── styles ───────────── */

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#222" },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 12 },
  icon: { width: 24, marginRight: 8 },
  footnote: { marginTop: 8, color: "#888", fontSize: 12 },
});
