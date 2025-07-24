import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { FontAwesome5 } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";
import { interpolate } from "react-native-reanimated";

// ✅ Animated SVG Circle 생성
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function WeeklyAgingScore({ score = 50 }) {
  const radius = 80;
  const strokeWidth = 10;
  const size = radius * 2 + strokeWidth * 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  const [msg, setMsg] = useState("");

  // ✅ 애니메이션 값
  const animatedProgress = useSharedValue(0);

  // ✅ SVG의 strokeDashoffset에 애니메이션 적용
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset:
        circumference - (animatedProgress.value / 100) * circumference,
    };
  });

  useEffect(() => {
    if (score >= 80) {
      setMsg("매우 좋음");
    } else if (score >= 60) {
      setMsg("보통");
    } else if (score >= 40) {
      setMsg("주의 필요");
    } else {
      setMsg("위험");
    }

    // ✅ 애니메이션 트리거
    animatedProgress.value = withTiming(score, { duration: 1000 });
  }, [score]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>주간 노화 점수</Text>

      <View style={styles.circleWrapper}>
        <Svg width={size} height={size}>
          {/* 배경 원 */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#D8EBD6"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* 진행 애니메이션 원 */}
          <AnimatedCircle
            cx={center}
            cy={center}
            r={radius}
            stroke="#70b277"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            strokeLinecap="round"
            fill="none"
            rotation="-90"
            origin={`${center}, ${center}`}
          />
        </Svg>

        <View style={styles.centerContent}>
          <FontAwesome5 name="balance-scale" size={24} color="#70b277" />
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.status}>{msg}</Text>
        </View>
      </View>

      <Text style={styles.footer}>개선된 식습관으로 활력을 되찾으세요.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "92%",
    marginTop: 10,
    backgroundColor: "#e3ede2",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#c9e0cB",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6,
  },
  circleWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  centerContent: {
    position: "absolute",
    alignItems: "center",
  },
  score: {
    fontSize: 32,
    fontWeight: "600",
    color: "#70b277",
    marginTop: 4,
  },
  status: {
    color: "#666",
    marginTop: 2,
    fontSize: 12,
  },
  footer: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
