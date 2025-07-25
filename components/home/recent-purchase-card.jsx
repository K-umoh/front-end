// RecentPurchaseCard.jsx
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function RecentPurchaseCard({ item }) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textWrapper}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₩{item.price.toLocaleString()}</Text>
        {item.extra && <Text style={styles.extra}>{item.extra}</Text>}
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>재구매</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingRight: 4,
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 6,
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
  },
  price: {
    color: "#888",
    fontSize: 13,
  },
  extra: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },
  button: {
    borderWidth: 1,
    borderColor: "#4A8A3F",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonText: {
    color: "#4A8A3F",
    fontWeight: "bold",
    fontSize: 13,
  },
});
