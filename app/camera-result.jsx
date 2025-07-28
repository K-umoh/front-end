import { View, Image, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

// export const screenOptions = {
//   title: "식단 분석 결과", // 헤더 제목
//   headerBackTitleVisible: false, // 뒤로가기 글자 없애기
//   headerTintColor: "#2E7D32", // 뒤로가기 아이콘 색상
//   headerTitleAlign: "center", // 제목 가운데 정렬
// };

export default function CameraResult() {
  const { imageUri } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>선택한 식단 사진:</Text>
      <Image
        source={{ uri: imageUri }}
        style={{ width: "100%", height: 300, marginTop: 20 }}
      />
    </View>
  );
}
