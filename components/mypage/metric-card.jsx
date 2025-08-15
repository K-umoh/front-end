import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeartPulse, Moon, Syringe, Weight } from "lucide-react-native";

// ===== 더미 데이터 =====
const BP_SYSTOLIC = 120;
const BP_DIASTOLIC = 80;
const SLEEP_HOURS = 7.5;
const FASTING_GLUCOSE = 95; // mg/dL
const WEIGHT_KG = 65;

// ===== 카드 하나 =====
function MetricCard({ Icon, title, valueLines = [], caption }) {
  return (
    <View style={styles.card}>
      <Icon size={28} color="#2E7D32" />
      <Text style={styles.title}>{title}</Text>
      {valueLines.map((line, idx) => (
        <Text key={idx} style={[styles.value, idx === 1 && styles.valueSub]}>
          {line}
        </Text>
      ))}
      {!!caption && <Text style={styles.caption}>{caption}</Text>}
    </View>
  );
}

// ===== 그리드 컴포넌트 =====
export default function HealthMetrics() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>나의 주요 건강 지표</Text>

      <View style={styles.grid}>
        {/* 혈압 */}
        <MetricCard
          Icon={HeartPulse}
          title="혈압"
          valueLines={[`${BP_SYSTOLIC}/${BP_DIASTOLIC}`, "mmHg"]}
          caption="정상 범위 유지 중"
        />
        {/* 수면 질 */}
        <MetricCard
          Icon={Moon}
          title="수면 질"
          valueLines={[`${SLEEP_HOURS} 시간`]}
          caption="충분한 수면 시간"
        />
        {/* 공복 혈당 */}
        <MetricCard
          Icon={Syringe}
          title="공복 혈당"
          valueLines={[`${FASTING_GLUCOSE} mg/dL`]}
          caption="건강한 수준"
        />
        {/* 체중 */}
        <MetricCard
          Icon={Weight}
          title="체중"
          valueLines={[`${WEIGHT_KG} kg`]}
          caption="목표 체중 달성"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E9ED",
    paddingVertical: 16,
    paddingHorizontal: 14,
    width: "92%",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#222",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EDF0F2",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 14,
    alignItems: "center",
  },
  title: {
    marginTop: 8,
    fontSize: 13,
    color: "#6B7280",
  },
  value: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    lineHeight: 24,
  },
  valueSub: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  caption: {
    marginTop: 6,
    fontSize: 12,
    color: "#6B7280",
  },
});
