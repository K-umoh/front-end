import { StyleSheet, Text, View } from "react-native";
import {
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useCallback } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";

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

  const getLevel = (score) => {
    if (score >= 70)
      return {
        label: "높음",
        style: styles.badgeRed,
        textColor: { color: "#de3b40" },
      };
    if (score >= 40)
      return {
        label: "보통",
        style: styles.badgeYellow,
        textColor: { color: "#e6b006" },
      };
    return {
      label: "낮음",
      style: styles.badgeGreen,
      textColor: { color: "#15b880" },
    };
  };

  const renderRow = (icon, label, score, animatedValue) => {
    const level = getLevel(score);

    const animatedBarStyle = useAnimatedStyle(() => {
      return {
        flex: animatedValue.value / 100,
      };
    });

    return (
      <View style={styles.row}>
        {icon}
        <Text style={styles.label}>{label}</Text>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, animatedBarStyle]} />
          <View style={[styles.progressRemain, { flex: 1 - score / 100 }]} />
        </View>
        <View style={[styles.badge, level.style]}>
          <Text style={[styles.badgeText, level.textColor]}>{level.label}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>주요 위험 요소 요약</Text>
      <View style={styles.divider} />

      {renderRow(
        <FontAwesome5
          name="heartbeat"
          size={20}
          color="#3a7d38"
          style={styles.icon}
        />,
        "최종당화산물",
        ages,
        animatedAges
      )}

      {renderRow(
        <MaterialIcons
          name="adjust"
          size={20}
          color="#3a7d38"
          style={styles.icon}
        />,
        "포화지방",
        fat,
        animatedFat
      )}

      {renderRow(
        <MaterialCommunityIcons
          name="fire"
          size={20}
          color="#3a7d38"
          style={styles.icon}
        />,
        "항산화 부족",
        antioxidant,
        animatedAntioxidant
      )}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  icon: {
    width: 24,
    marginRight: 8,
  },
  label: {
    flex: 1.5,
    fontSize: 14,
    color: "#333",
  },
  progressBar: {
    flex: 2,
    height: 8,
    borderRadius: 4,
    flexDirection: "row",
    backgroundColor: "#dcefd9",
    marginHorizontal: 8,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: "#3a7d38",
  },
  progressRemain: {
    backgroundColor: "#dcefd9",
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
  },
  badgeRed: {
    backgroundColor: "#fcebec",
    borderColor: "#f6c8c9",
    borderWidth: 1,
  },
  badgeYellow: {
    backgroundColor: "#fdf7e6",
    borderColor: "#f9e8b9",
    borderWidth: 1,
  },
  badgeGreen: {
    backgroundColor: "#e7f9f2",
    borderColor: "#bbebdb",
    borderWidth: 1,
  },
});
