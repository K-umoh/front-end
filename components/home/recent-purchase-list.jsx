// RecentPurchaseList.jsx
import { View, Text, FlatList } from "react-native";
import RecentPurchaseCard from "./recent-purchase-card";

export default function RecentPurchaseList({ items }) {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 12 }}>
        최근 구매 상품
      </Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecentPurchaseCard item={item} />}
      />
    </View>
  );
}
