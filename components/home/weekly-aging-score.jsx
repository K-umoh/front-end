import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";

// ✅ Animated SVG Circle 생성
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function WeeklyAgingScore({ score = 50 }) {
  const radius = 80;
  const strokeWidth = 10;
  const size = radius * 2 + strokeWidth * 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  const [msg, setMsg] = useState("");
  const [footerMsg, setFooterMsg] = useState("");

  // ✅ 애니메이션 값
  const animatedProgress = useSharedValue(0);

  // 1. 애니메이션 적용 (이건 그대로)
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset:
        circumference - (animatedProgress.value / 100) * circumference,
    };
  });

  useEffect(() => {
    //TODO: 주 초기화 시 처리 필요 (ex: 식단을 등록하여 점수를 확인하세요.)
    if (score >= 80) {
      setMsg("매우 좋음");
      setFooterMsg("지금처럼만 유지하세요!");
    } else if (score >= 60) {
      setMsg("보통");
      setFooterMsg("약간의 개선이 필요해요.");
    } else if (score >= 40) {
      setMsg("주의 필요");
      setFooterMsg("식습관 개선이 필요해요!");
    } else {
      setMsg("위험");
      setFooterMsg("지금 당장 바꾸는 게 좋아요!");
    }
  }, [score]);

  // 3. 포커스될 때 애니메이션 트리거 (useFocusEffect는 useEffect 밖에서 사용)
  useFocusEffect(
    useCallback(() => {
      animatedProgress.value = 0;
      animatedProgress.value = withTiming(score, { duration: 1000 });
    }, [score])
  );

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

      <Text style={styles.footer}>{footerMsg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "92%",
    marginTop: -10,
    backgroundColor: "#e3ede2",
    padding: 18,
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
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
