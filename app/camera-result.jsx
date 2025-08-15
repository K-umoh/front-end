import { View, Image, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import MealAnalysisList from "../components/cameraResult/meal-list";
import SubmitButton from "../components/cameraResult/submit-button";

export default function CameraResult() {
  const { imageUri: rawImageUri } = useLocalSearchParams();
  const imageUri = rawImageUri
    ? decodeURIComponent(String(rawImageUri))
    : undefined;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <Text style={styles.label}>선택한 식단 사진</Text>
      {!!imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <MealAnalysisList imageUri={imageUri} />
      <SubmitButton />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  label: { fontSize: 16, fontWeight: "700", color: "#222" },
  image: {
    width: "100%",
    height: 280,
    marginTop: 12,
    marginBottom: 18,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
  },
});
