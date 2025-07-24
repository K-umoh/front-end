import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function TodayMealButton({ onPress }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push("/recommend")}
    >
      <View style={styles.inner}>
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={20}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.text}>오늘의 추천 식단 확인</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#437A2A",
    width: "92%",
    marginTop: 14,
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
