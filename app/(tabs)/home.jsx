import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import WeeklyAgingScore from "../../components/home/weekly-aging-score";
import RiskFactorSummary from "../../components/home/risk-factor-summary";
import TodayMealButton from "../../components/home/today-meal-button";
import TodayMission from "../../components/home/today-mission";
import RecentPurchaseList from "../../components/home/recent-purchase-list";

export default function HomePage() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <WeeklyAgingScore />
        <RiskFactorSummary />
        <TodayMealButton />
        <TodayMission />
        <RecentPurchaseList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingVertical: 24,
    alignItems: "center",
    paddingBottom: 40,
  },
});
