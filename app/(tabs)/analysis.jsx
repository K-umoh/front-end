import { StyleSheet, ScrollView } from "react-native";
import RiskFactorSummary from "../../components/home/risk-factor-summary";
import MealRecordCard from "../../components/analysis/meal-record-card";
import NutritionChart from "../../components/analysis/nutrition-chart";
import AgingTextCard from "../../components/analysis/aging-text-card";
import GuideWrapper from "../../components/analysis/GuideWrapper";

export default function AnalysisPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MealRecordCard />
      <NutritionChart />
      <RiskFactorSummary />
      <AgingTextCard />
      <GuideWrapper />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
