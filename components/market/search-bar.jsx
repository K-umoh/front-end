import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, Octicons } from "@expo/vector-icons"; // 또는 react-native-vector-icons

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Feather name="search" size={20} color="#999" style={styles.icon} />
        <TextInput
          placeholder="검색어 입력"
          placeholderTextColor="#999"
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.boxButton}>
        <Octicons name="package" size={20} color="#2E7D32" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 999,
    paddingHorizontal: 12,
    height: 40,
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },

  boxButton: {
    marginLeft: 12,
    borderWidth: 1,
    borderColor: "#2E7D32",
    borderRadius: 999,
    padding: 10,
  },
});
