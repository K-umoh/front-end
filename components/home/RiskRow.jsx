import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const RiskRow = ({ icon, label, score, animatedValue }) => {
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

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
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

export default RiskRow;
