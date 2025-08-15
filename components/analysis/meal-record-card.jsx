import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { MediaType } from "expo-image-picker";

export default function MealRecordCard() {
  const router = useRouter();

  const handleImageSelect = async () => {
    Alert.alert("사진 선택", "식단 이미지를 선택하는 방법을 고르세요.", [
      { text: "카메라로 촬영", onPress: handleCamera },
      { text: "앨범에서 선택", onPress: handleLibrary },
      { text: "취소", style: "cancel" },
    ]);
  };

  const gotoAnalyzing = (imageUri) => {
    router.push({
      pathname: "/analyzing",
      params: { imageUri, delayMs: 5000 }, // 하드코딩 지연
    });
  };

  const handleCamera = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("권한 필요", "카메라 접근 권한이 필요합니다.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: MediaType.IMAGE, // 그대로 유지
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const imageUri = result.assets?.[0]?.uri;
      if (imageUri) gotoAnalyzing(imageUri);
    }
  };

  const handleLibrary = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("권한 필요", "앨범 접근 권한이 필요합니다.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // 그대로 유지
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const imageUri = result.assets?.[0]?.uri;
      if (imageUri) gotoAnalyzing(imageUri);
    }
  };

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
      <TouchableOpacity style={styles.button} onPress={handleImageSelect}>
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
