// DailyProductList.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ProductCard from "./product-card";
import localProducts from "../../shop-main-db";
import CategoryTabs from "./category-tabs";

export default function DailyProductList() {
  return (
    <FlatList
      data={localProducts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductCard product={item} />}
      numColumns={2}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      ListHeaderComponent={
        <View style={styles.headerWrap}>
          <View style={{ marginLeft: -14 }}>
            <CategoryTabs />
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>오늘의{"\n"}지역 농산물 특가</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 170,
  },

  headerWrap: {
    marginBottom: 12, // 탭과 카드 사이 간격
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30, // 탭 아래 여백
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAll: {
    color: "#2E7D32",
    fontWeight: "500",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
