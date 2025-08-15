// components/meal-analysis/meal-item-card.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MealItemCard({ item, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(item);

  const number = (n) =>
    new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 }).format(n || 0);

  const Row = ({ label, value, unit = "" }) => (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>
        {value}
        {unit}
      </Text>
    </View>
  );

  const Input = ({ label, field, keyboardType = "numeric" }) => (
    <View style={styles.inputRow}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={String(draft[field] ?? "")}
        onChangeText={(t) =>
          setDraft((d) => ({
            ...d,
            [field]: t.replace(/[^0-9.]/g, ""),
          }))
        }
        keyboardType={keyboardType}
        placeholder="0"
      />
    </View>
  );

  const save = () => {
    // 숫자 변환
    const fields = [
      "grams",
      "kcal",
      "carb",
      "protein",
      "fat",
      "sugar",
      "sodium",
    ];
    const normalized = { ...draft };
    fields.forEach((f) => (normalized[f] = parseFloat(normalized[f]) || 0));
    onUpdate && onUpdate(normalized);
    setOpen(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          {item.thumbUri ? (
            <Image source={{ uri: item.thumbUri }} style={styles.thumb} />
          ) : (
            <View style={[styles.thumb, styles.thumbPlaceholder]}>
              <MaterialCommunityIcons
                name="silverware-fork-knife"
                size={18}
                color="#2E7D32"
              />
            </View>
          )}
          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subTitle}>대략 {item.grams} g</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.editBtn}
          >
            <Text style={styles.editText}>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete && onDelete(item.id)}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={20}
              color="#B00020"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <Row label="칼로리" value={number(item.kcal)} unit=" kcal" />
        <Row label="탄수화물" value={number(item.carb)} unit=" g" />
        <Row label="단백질" value={number(item.protein)} unit=" g" />
        <Row label="지방" value={number(item.fat)} unit=" g" />
        <Row label="당류" value={number(item.sugar)} unit=" g" />
        <Row label="나트륨" value={number(item.sodium)} unit=" mg" />
      </View>

      {/* 수정 모달 */}
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>값 수정</Text>
            <Input label="이름" field="name" keyboardType="default" />
            <Input label="양 (g)" field="grams" />
            <Input label="칼로리 (kcal)" field="kcal" />
            <Input label="탄수화물 (g)" field="carb" />
            <Input label="단백질 (g)" field="protein" />
            <Input label="지방 (g)" field="fat" />
            <Input label="당류 (g)" field="sugar" />
            <Input label="나트륨 (mg)" field="sodium" />
            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={[styles.btn, styles.cancel]}
                onPress={() => setOpen(false)}
              >
                <Text style={styles.btnText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, styles.save]}
                onPress={save}
              >
                <Text style={[styles.btnText, styles.saveText]}>저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleWrap: { flexDirection: "row", alignItems: "center" },
  thumb: { width: 40, height: 40, borderRadius: 10, marginRight: 10 },
  thumbPlaceholder: {
    backgroundColor: "#E8F3EA",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontWeight: "700", fontSize: 16, color: "#222" },
  subTitle: { fontSize: 12, color: "#666", marginTop: 2 },
  actions: { flexDirection: "row", alignItems: "center" },
  editBtn: {
    backgroundColor: "#E8F3EA",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  editText: { color: "#2E7D32", fontWeight: "700", fontSize: 12 },
  body: { marginTop: 8 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  rowLabel: { color: "#333" },
  rowValue: { color: "#111", fontWeight: "600" },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10 },
  inputRow: { marginBottom: 10 },
  inputLabel: { fontSize: 12, color: "#666", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  modalBtns: { flexDirection: "row", justifyContent: "flex-end", marginTop: 8 },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginLeft: 8,
  },
  cancel: { backgroundColor: "#f2f2f2" },
  save: { backgroundColor: "#2E7D32" },
  btnText: { fontWeight: "700" },
  saveText: { color: "#fff" },
});
