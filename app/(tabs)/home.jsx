import { View, Text, StyleSheet } from "react-native";
import WeeklyAgingScore from "../../components/home/weekly-aging-score";
import RiskFactorSummary from "../../components/home/risk-factor-summary";
import TodayMealButton from "../../components/home/today-meal-button";
import TodayMission from "../../components/home/today-mission";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <WeeklyAgingScore />
      <RiskFactorSummary />
      <TodayMealButton />
      <TodayMission />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
