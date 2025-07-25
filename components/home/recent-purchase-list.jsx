import { View, Text, StyleSheet } from "react-native";
import RecentPurchaseCard from "./recent-purchase-card";
import products from "../../app/db";

export default function RecentPurchaseList() {
  const limitedProducts = products.slice(0, 3);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>최근 구매 상품</Text>
      <View style={styles.divider} />
      <View style={styles.list}>
        {limitedProducts.map((item) => (
          <RecentPurchaseCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "92%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0", // ✅ 테두리 색상
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginBottom: 12,
  },
  list: {
    marginTop: 2,
    marginBottom: -10,
    gap: 16, // 카드 사이 간격
  },
});
