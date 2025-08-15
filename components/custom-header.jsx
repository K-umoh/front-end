import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CustomHeader() {
  return (
    <View style={styles.container}>
      <Ionicons name="menu" size={24} color="green" />
      <Text style={styles.title}>오래살장</Text>
      <View style={styles.right}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>류</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ededec",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 14,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#6DBE81",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  circleText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
