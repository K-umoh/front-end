// MealList.jsx
import { ScrollView } from "react-native";
import MealCard from "./meal-card";
import { useState } from "react";
import { dummyMeals } from "../../app/meals-db";

export default function MealList() {
  const [meals, setMeals] = useState(dummyMeals);

  const toggleLike = (id) => {
    setMeals((prev) =>
      prev.map((meal) =>
        meal.id === id ? { ...meal, isLiked: !meal.isLiked } : meal
      )
    );
  };

  const handlePressRecipe = (id) => {
    console.log("레시피 확인 ID:", id);
    // navigation or modal 처리 가능
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 32,
      }}
    >
      {meals.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
          onToggleLike={toggleLike}
          onPressRecipe={handlePressRecipe}
        />
      ))}
    </ScrollView>
  );
}
