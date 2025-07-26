import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function HealthGuideCard({ text }) {
  return (
    <View style={styles.card}>
      <MaterialIcons name="check-circle" size={20} color="#2F7D32" />
      <Text style={styles.cardText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});
