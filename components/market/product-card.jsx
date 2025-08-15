import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function ProductCard({ product }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={product.image} style={styles.image} />
        <View style={styles.badges}>
          {product.tags?.map((tag) => (
            <View
              key={tag}
              style={[
                styles.badge,
                tag === "New" ? styles.newBadge : styles.organicBadge,
              ]}
            >
              <Text style={styles.badgeText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₩{product.price.toLocaleString()}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {product.description}
        </Text>
        <Text style={styles.origin}>{product.origin}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Feather name="shopping-cart" size={16} color="#fff" />
        <Text style={styles.buttonText}> 장바구니에 추가</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%", // 기존: 200
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    overflow: "hidden",
  },

  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  badges: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    gap: 6,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  newBadge: {
    backgroundColor: "#FDD835",
  },
  organicBadge: {
    backgroundColor: "#29B6F6",
  },
  badgeText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    color: "#2E7D32",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  origin: {
    fontSize: 12,
    color: "#666",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#2E7D32",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
});
