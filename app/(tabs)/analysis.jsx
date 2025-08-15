// app/.../analysis.jsx
import { StyleSheet, ScrollView, View } from "react-native";
import { useAtomValue } from "jotai";
import { Stack } from "expo-router";
import { isFirstMealAtom } from "../../state/demo-atom";

import MealRecordCard from "../../components/analysis/meal-record-card";
import NutritionChart from "../../components/analysis/nutrition-chart";
import RiskFactorSummary from "../../components/home/risk-factor-summary";
import AgingTextCard from "../../components/analysis/aging-text-card";
import GuideWrapper from "../../components/analysis/GuideWrapper";
import FirstMealHint from "../../components/analysis/first-meal-hint";

export default function AnalysisPage() {
  const isFirstMeal = useAtomValue(isFirstMealAtom);

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ contentStyle: { backgroundColor: "#fff" } }} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <MealRecordCard />

        {isFirstMeal ? (
          <FirstMealHint />
        ) : (
          <>
            <NutritionChart />
            <RiskFactorSummary variant="meal" />
            <AgingTextCard />
            <GuideWrapper />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  scroll: { flex: 1, backgroundColor: "#fff" },
  content: {
    paddingVertical: 24,
    alignItems: "center",
  },
});
