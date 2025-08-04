import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const categories = [
  "모든 상품",
  "야채",
  "과일",
  "곡류",
  "발효식품",
  "건강식품",
];

export default function CategoryTabs() {
  const [selected, setSelected] = useState("모든 상품");

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.tab, selected === cat && styles.activeTab]}
          onPress={() => setSelected(cat)}
        >
          <Text
            style={[styles.tabText, selected === cat && styles.activeTabText]}
          >
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 10,
  },

  tab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 999,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  activeTab: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },

  tabText: {
    fontSize: 14,
    color: "#222",
    fontWeight: "500",
  },

  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
