// components/meal-analysis/meal-analysis-list.jsx
import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MealItemCard from "./meal-item.card";

export default function MealAnalysisList({ imageUri }) {
  // 돈가스 사진 기준 추정치 (하드코딩)
  const [items, setItems] = useState([
    {
      id: "cutlet",
      name: "돈가스",
      grams: 230,
      kcal: 750,
      carb: 50,
      protein: 35,
      fat: 45,
      sugar: 8,
      sodium: 1200,
    },
    {
      id: "sausage",
      name: "소시지",
      grams: 90,
      kcal: 270,
      carb: 10,
      protein: 12,
      fat: 20,
      sugar: 2,
      sodium: 650,
    },
    {
      id: "shrimp-fry",
      name: "새우튀김(2개)",
      grams: 60,
      kcal: 180,
      carb: 16,
      protein: 7,
      fat: 10,
      sugar: 1,
      sodium: 340,
    },
    {
      id: "rice",
      name: "백미밥",
      grams: 150,
      kcal: 230,
      carb: 52,
      protein: 4,
      fat: 0.5,
      sugar: 0,
      sodium: 3,
    },
    {
      id: "corn",
      name: "옥수수콘",
      grams: 60,
      kcal: 90,
      carb: 17,
      protein: 3,
      fat: 1.5,
      sugar: 5,
      sodium: 120,
    },
    {
      id: "slaw",
      name: "양배추 샐러드(드레싱)",
      grams: 50,
      kcal: 85,
      carb: 6,
      protein: 1,
      fat: 6,
      sugar: 3,
      sodium: 160,
    },
    {
      id: "fries",
      name: "감자튀김",
      grams: 120,
      kcal: 360,
      carb: 40,
      protein: 5,
      fat: 20,
      sugar: 1,
      sodium: 360,
    },
  ]);

  const totals = useMemo(() => {
    const sum = (k) => items.reduce((acc, cur) => acc + (cur[k] || 0), 0);
    return {
      kcal: sum("kcal"),
      carb: sum("carb"),
      protein: sum("protein"),
      fat: sum("fat"),
      sugar: sum("sugar"),
      sodium: sum("sodium"),
    };
  }, [items]);

  const updateItem = (next) =>
    setItems((prev) => prev.map((it) => (it.id === next.id ? next : it)));
  const deleteItem = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const addItem = () => {
    const id = `custom-${Date.now()}`;
    setItems((prev) => [
      ...prev,
      {
        id,
        name: "새 음식",
        grams: 0,
        kcal: 0,
        carb: 0,
        protein: 0,
        fat: 0,
        sugar: 0,
        sodium: 0,
      },
    ]);
    Alert.alert(
      "음식 카드 추가",
      "새 카드가 추가되었습니다. '수정'을 눌러 값을 입력하세요."
    );
  };

  const Bar = ({ label, value, max, unit }) => {
    const width = Math.min(100, Math.round((value / max) * 100));
    return (
      <View style={{ marginBottom: 10 }}>
        <View style={styles.barRow}>
          <Text style={styles.barLabel}>{label}</Text>
          <Text style={styles.barValue}>
            {new Intl.NumberFormat("ko-KR").format(value)} {unit}
          </Text>
        </View>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${width}%` }]} />
        </View>
      </View>
    );
  };

  return (
    <View>
      {/* 상단 요약 */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>AI가 인식한 음식들</Text>
        <Text style={styles.summarySub}>
          필요 시 아래 카드에서 ‘수정’ 또는 ‘추가’하세요.
        </Text>

        <View style={styles.kcalRow}>
          <MaterialCommunityIcons name="fire" size={18} color="#2E7D32" />
          <Text style={styles.kcalText}>
            총 칼로리:{" "}
            <Text style={{ fontWeight: "800" }}>
              {new Intl.NumberFormat("ko-KR").format(totals.kcal)} kcal
            </Text>
          </Text>
        </View>

        {/* 대략적인 바 (하드 맥스치 예시) */}
        <Bar label="탄수화물" value={totals.carb} max={300} unit="g" />
        <Bar label="단백질" value={totals.protein} max={150} unit="g" />
        <Bar label="지방" value={totals.fat} max={120} unit="g" />
        <Bar label="나트륨" value={totals.sodium} max={2300} unit="mg" />
      </View>

      {/* 음식 카드 리스트 */}
      {items.map((it) => (
        <MealItemCard
          key={it.id}
          item={it}
          onUpdate={updateItem}
          onDelete={deleteItem}
        />
      ))}

      {/* 추가 버튼 */}
      <TouchableOpacity style={styles.addBtn} onPress={addItem}>
        <MaterialCommunityIcons name="plus" size={18} color="#fff" />
        <Text style={styles.addText}>음식 카드 추가</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: "#E8F3EA",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  summaryTitle: { fontWeight: "800", fontSize: 16, color: "#2E7D32" },
  summarySub: { fontSize: 12, color: "#2E7D32", opacity: 0.8, marginTop: 4 },
  kcalRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 6,
  },
  kcalText: { marginLeft: 6, color: "#1b3b1e" },

  barRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  barLabel: { color: "#2E7D32", fontWeight: "700" },
  barValue: { color: "#1b3b1e", fontWeight: "700" },
  barTrack: {
    height: 8,
    backgroundColor: "#cfe5d4",
    borderRadius: 999,
    overflow: "hidden",
  },
  barFill: { height: 8, backgroundColor: "#2E7D32" },

  addBtn: {
    marginTop: 4,
    backgroundColor: "#2E7D32",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  addText: { color: "#fff", fontWeight: "800" },
});
