import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Page</Text>
      {/* 추후 로그인 기능 업데이트시 로그인 페이지로 사용. */}
      <Button
        title="Go To Home Tab"
        onPress={() => router.replace("/home")}
      ></Button>
      {/* 로그인 후 뒤로가기 방지 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
