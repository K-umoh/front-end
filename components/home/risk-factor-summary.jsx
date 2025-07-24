import { StyleSheet, Text, View } from "react-native";
import {
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useCallback } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import RiskRow from "./RiskRow";

export default function RiskFactorSummary() {
  const ages = 80;
  const fat = 50;
  const antioxidant = 10;

  const animatedAges = useSharedValue(0);
  const animatedFat = useSharedValue(0);
  const animatedAntioxidant = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      animatedAges.value = 0;
      animatedFat.value = 0;
      animatedAntioxidant.value = 0;

      animatedAges.value = withTiming(ages, { duration: 1000 });
      animatedFat.value = withTiming(fat, { duration: 1000 });
      animatedAntioxidant.value = withTiming(antioxidant, {
        duration: 1000,
      });
    }, [ages, fat, antioxidant])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>주요 위험 요소 요약</Text>
      <View style={styles.divider} />

      <RiskRow
        icon={
          <FontAwesome5
            name="heartbeat"
            size={20}
            color="#3a7d38"
            style={styles.icon}
          />
        }
        label="최종당화산물"
        score={ages}
        animatedValue={animatedAges}
      />

      <RiskRow
        icon={
          <MaterialIcons
            name="adjust"
            size={20}
            color="#3a7d38"
            style={styles.icon}
          />
        }
        label="포화지방"
        score={fat}
        animatedValue={animatedFat}
      />

      <RiskRow
        icon={
          <MaterialCommunityIcons
            name="fire"
            size={20}
            color="#3a7d38"
            style={styles.icon}
          />
        }
        label="항산화 부족"
        score={antioxidant}
        animatedValue={animatedAntioxidant}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "92%",
    marginTop: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },
  icon: {
    width: 24,
    marginRight: 8,
  },
});
