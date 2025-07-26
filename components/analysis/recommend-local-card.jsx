import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

export default function RecommendLocalCard({ name }) {
  return (
    <View style={styles.card}>
      <MaterialCommunityIcons
        name="sprout"
        size={20}
        color="#2F7D32"
        style={{ marginRight: 8 }}
      />
      <Text style={styles.name}>{name}</Text>
      <Feather
        name="chevron-right"
        size={18}
        color="#2F2F2F"
        style={{ marginLeft: "auto" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 6,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
});
