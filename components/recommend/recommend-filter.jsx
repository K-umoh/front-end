import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

const categories = ["항산화", "면역력 강화", "해독"];

export default function RecommendFilter() {
  const [selected, setSelected] = useState("항산화");

  return (
    <View style={styles.container}>
      {categories.map((label) => (
        <TouchableOpacity
          key={label}
          style={[styles.tab, selected === label && styles.selectedTab]}
          onPress={() => setSelected(label)}
        >
          <Text
            style={[
              styles.tabText,
              selected === label && styles.selectedTabText,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
    marginTop: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedTab: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },
  tabText: {
    color: "#333",
    fontWeight: "500",
    fontSize: 13,
  },
  selectedTabText: {
    color: "#fff",
  },
});
