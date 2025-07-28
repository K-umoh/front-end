import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { MediaType } from "expo-image-picker";

//식사 교체하기, 식사 삭제하기, 다음 식사 분석하기, 삭제햇을땐 뭔 데이터 보여줌?, 모든 컴포넌트 보통으로?

export default function MealRecordCard() {
  const router = useRouter();

  const handleImageSelect = async () => {
    Alert.alert("사진 선택", "식단 이미지를 선택하는 방법을 고르세요.", [
      {
        text: "카메라로 촬영",
        onPress: handleCamera,
      },
      {
        text: "앨범에서 선택",
        onPress: handleLibrary,
      },
      {
        text: "취소",
        style: "cancel",
      },
    ]);
  };

  // 공통: 이미지 업로드 함수 (추후 백엔드 API 연결 시 사용)
  const uploadImageToServer = async (imageUri) => {
    const formData = new FormData();
    const filename = imageUri.split("/").pop();
    const fileType = filename.split(".").pop();

    formData.append("image", {
      uri: imageUri,
      name: filename,
      type: `image/${fileType}`,
    });

    try {
      const res = await fetch("https://your-api-endpoint.com/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Upload failed");
      return json; // e.g. { imageId: "abc123" }
    } catch (err) {
      console.error("Upload error:", err);
      alert("이미지 업로드에 실패했습니다.");
      return null;
    }
  };

  const handleCamera = async () => {
    const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
    if (!cameraPerm.granted) {
      alert("카메라 접근 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: MediaType.IMAGE,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      //API 붙이기 전: 바로 라우터 이동
      router.push({ pathname: "/camera-result", params: { imageUri } });

      // API 붙인 후: 아래 코드 사용
      /*
      const response = await uploadImageToServer(imageUri);
      if (response) {
        router.push({
          pathname: "/camera-result",
          params: { imageId: response.imageId },
        });
      }
      */
    }
  };

  const handleLibrary = async () => {
    const libPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!libPerm.granted) {
      alert("앨범 접근 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      // API 붙이기 전: 바로 라우터 이동
      router.push({ pathname: "/camera-result", params: { imageUri } });

      // API 붙인 후: 아래 코드 사용
      /*
      const response = await uploadImageToServer(imageUri);
      if (response) {
        router.push({
          pathname: "/camera-result",
          params: { imageId: response.imageId },
        });
      }
      */
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
