import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import ConfettiCannon from "react-native-confetti-cannon";

export default function TodayMission() {
  const [title, setTitle] = useState("녹황색 채소 포함하기");
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onMissionComplete = () => {
    if (completed) return;

    // ✅ 체크 애니메이션
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCompleted(true);
      setTitle("오늘의 미션을 완료하였습니다.");
      setShowConfetti(true);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <MaterialCommunityIcons
          name="leaf"
          size={24}
          color="#6AA26F"
          style={styles.icon}
        />
        <View>
          <Text style={styles.subtitle}>오늘의 식습관 미션</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onMissionComplete}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <MaterialCommunityIcons
            name={completed ? "check-circle" : "check-circle-outline"}
            size={28}
            color={completed ? "#6AA26F" : "#333"}
          />
        </Animated.View>
      </TouchableOpacity>

      {showConfetti && (
        <ConfettiCannon
          count={50}
          origin={{ x: 200, y: 0 }}
          fadeOut={true}
          explosionSpeed={1000}
          fallSpeed={2500}
          onAnimationEnd={() => setShowConfetti(false)} // 다시 초기화해서 다음날 가능
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "92%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    overflow: "visible",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  subtitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
});
