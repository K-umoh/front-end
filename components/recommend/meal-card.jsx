// MealCard.jsx
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function MealCard({ meal, onToggleLike, onPressRecipe }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={meal.image} style={styles.image} />
        <TouchableOpacity
          style={styles.likeIcon}
          onPress={() => onToggleLike(meal.id)}
        >
          <AntDesign
            name={meal.isLiked ? "heart" : "hearto"}
            size={22}
            color={meal.isLiked ? "#E53935" : "#ccc"}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{meal.title}</Text>

      <View style={styles.tags}>
        {meal.tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>주요 저속 노화 재료:</Text>
        {meal.ingredients.map((item) => (
          <View key={item.name} style={styles.ingredientRow}>
            <Text style={styles.ingredientName}>{item.name}</Text>

            {item.isLocal && <View style={styles.dottedLine} />}
            <Text style={styles.ingredientNote}>
              {item.isLocal ? "(지역 특산물)" : ""}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onPressRecipe(meal.id)}
      >
        <Text style={styles.buttonText}>레시피 확인하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 7,
  },
  likeIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    borderRadius: 16,
    padding: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 17,
    marginLeft: 5,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 17,
  },
  tag: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: "#2E7D32",
  },
  section: {
    marginBottom: 12,
    marginLeft: 7,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 6,
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
  },

  ingredientName: {
    width: 70, // 고정 너비
    fontSize: 13,
    color: "#8c8d8b",
  },

  dottedLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    marginHorizontal: 6,
  },

  ingredientNote: {
    width: 80, // 고정 너비
    fontSize: 12,
    color: "#70b277",
    textAlign: "right",
  },

  button: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#2E7D32",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#2E7D32",
    fontWeight: "600",
  },
});
