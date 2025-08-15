// components/common/submit-button.jsx
import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { isFirstMealAtom } from "../../state/demo-atom";
import { useSetAtom } from "jotai";

export default function SubmitButton({
  label = "제출하기",
  route = "/(tabs)/analysis",
  isLoading: isLoadingProp, // 외부 제어도 가능
  onPressCustom, // 필요 시 완전 커스텀
  delayMs = 1200, // ✅ 강제 지연 (ms)
}) {
  const router = useRouter();
  const [internalLoading, setInternalLoading] = useState(false);
  const isLoading = isLoadingProp ?? internalLoading;

  const setIsFirstMeal = useSetAtom(isFirstMealAtom);

  const handlePress = async () => {
    setIsFirstMeal(false);

    if (onPressCustom) {
      return onPressCustom();
    }
    try {
      setInternalLoading(true);
      await new Promise((res) => setTimeout(res, delayMs)); // ✅ 강제 지연
      router.push(route);
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={{ borderRadius: 12, overflow: "hidden", marginTop: 16 }}
      onPress={handlePress}
      disabled={isLoading}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={["#F472B6", "#F59E0B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.text}>{label}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
