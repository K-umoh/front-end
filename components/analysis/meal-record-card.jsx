import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MealRecordCard({ onPress }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="silverware-fork-knife"
        size={48}
        color="#2E7D32"
      />
      <Text style={styles.title}>식단 기록하기</Text>
      <Text style={styles.subtitle}>
        오늘 섭취한 식단을 기록하고 분석 결과를 확인하세요.
      </Text>

      {/* TODO: 우선 아이폰으로 카메라 구현, 사진촬영시 나올 UI들 구현해야함 */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>카메라로 식단 분석하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 16,
    borderWidth: 1,
    width: "92%",
    borderColor: "#e0e0e0",
    padding: 24,
    alignItems: "center",
    marginTop: -10,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 8,
    color: "#222",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#2E7D32",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: "86%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});
