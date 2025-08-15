import { View, StyleSheet } from "react-native";
import SearchBar from "../../components/market/search-bar";
import CategoryTabs from "../../components/market/category-tabs";
import DailyProductList from "../../components/market/daily-product-list";

export default function MarketPage() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <DailyProductList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
