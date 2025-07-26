import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // expo install expo-linear-gradient
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AgingTextCard() {
  const score = "훌륭합니다!";
  const text =
    "이 식단은 노화 방지에 긍정적인 영향을 미치는\n성분들을 풍부하게 포함하고 있습니다.";

  return (
    <LinearGradient
      colors={["#D5E3D1", "#B4CDB0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <MaterialCommunityIcons
        name="leaf"
        size={40}
        color="#2F7D32"
        style={{ marginBottom: 12 }}
      />
      <Text style={styles.title}>저속노화형 식단</Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{score}</Text>
      </View>

      <Text style={styles.subtext}>{text}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "92%",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 15,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F7D32",
    marginBottom: 12,
  },
  badge: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 16,
  },
  badgeText: {
    color: "#2F7D32",
    fontWeight: "bold",
    fontSize: 14,
  },
  subtext: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    lineHeight: 20,
  },
});
