import { View, Text, StyleSheet } from "react-native";
import PieChart from "react-native-pie-chart";

export default function NutritionChart() {
  const widthAndHeight = 160;

  const fat = 16;
  const protein = 29;
  const tansu = 55;
  const salt = 2100;
  const sugar = 25;

  const rawData = [
    { label: "탄수화물", value: tansu },
    { label: "단백질", value: protein },
    { label: "지방", value: fat },
  ];

  const sorted = [...rawData].sort((a, b) => b.value - a.value);
  const colors = ["#2F7D32", "#66BB6A", "#A5D6A7"]; // 진→중→연

  const coloredData = sorted.map((item, index) => ({
    ...item,
    color: colors[index],
  }));

  const finalData = rawData.map((item) => {
    const found = coloredData.find((d) => d.label === item.label);
    return { ...item, color: found.color };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>성분 분석 결과</Text>

      {/* 퍼센트 라벨 */}
      <View style={styles.percentRow}>
        {finalData.map((item, i) => (
          <Text key={i} style={[styles.percentText, { color: item.color }]}>
            {item.label}: {item.value}%
          </Text>
        ))}
      </View>

      {/* 차트 */}
      <View style={{ marginVertical: 16 }}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={finalData.map((d) => ({ value: d.value, color: d.color }))}
          cover={0.57}
        />
      </View>

      {/* 범례 */}
      <View style={styles.legendRow}>
        {finalData.map((item, i) => (
          <View style={styles.legendItem} key={i}>
            <View style={[styles.dot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.label}
              {item.label === "탄수화물"
                ? `${tansu}g`
                : item.label === "단백질"
                ? `${protein}g`
                : `${fat}g`}
            </Text>
          </View>
        ))}
      </View>

      {/* 하단 요약 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          나트륨: <Text style={styles.footerHighlight}>{salt}mg</Text>
        </Text>
        <Text style={styles.footerText}>
          당지수(GI): <Text style={styles.footerHighlight}>{sugar}g</Text>
        </Text>
      </View>
    </View>
  );
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
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  percentRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 4,
  },
  percentText: {
    fontSize: 13,
    fontWeight: "600",
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 13,
    color: "#444",
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 12,
    color: "#555",
  },
  footerHighlight: {
    fontWeight: "bold",
    color: "#222",
  },
});
