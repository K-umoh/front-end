import { View, Image, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function CameraResult() {
  const { imageUri } = useLocalSearchParams();

  //여기서 UPDATE 후 한번더 POST?

  return (
    <View style={styles.container}>
      <Text style={styles.label}>선택한 식단 사진:</Text>
      <Image source={{ uri: imageUri }} style={styles.image} />

      {/* 🥗 식단 정보 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🥗 식단 정보</Text>
        <Text>• 식사 시간: 점심</Text>
        <Text>• 칼로리: 520 kcal</Text>
        <Text>• 음식 구성: 잡곡밥, 불고기, 나물무침</Text>
      </View>

      {/* 🧪 주요 성분 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🧪 주요 성분 분석</Text>
        <Text>• 단백질: 25g</Text>
        <Text>• 지방: 12g</Text>
        <Text>• 당류: 10g</Text>
        <Text>• 포화지방: ⚠️ 높음 (주의)</Text>
      </View>

      {/* 🧓 노화 관련 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🧓 노화 관련 평가</Text>
        <Text>• 항산화 지수: 👍 높음</Text>
        <Text>• AGE 위험도: ⚠️ 중간</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 20,
    marginBottom: 24,
    borderRadius: 12,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2E7D32",
  },
});
