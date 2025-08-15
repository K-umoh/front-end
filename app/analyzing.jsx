// app/analyzing.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Animated, Easing } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Analyzing() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const imageUri = params.imageUri ? String(params.imageUri) : "";
  const delay = useMemo(() => Number(params.delayMs ?? 1300), [params.delayMs]);

  // 진행 퍼센트
  const progress = useRef(new Animated.Value(0)).current;
  const [percent, setPercent] = useState(0);

  // 화면 테두리 네온 링 (회전 + 펄스)
  const edgeSpin = useRef(new Animated.Value(0)).current;
  const edgePulse = useRef(new Animated.Value(0)).current;

  // 로봇 맥박(스케일/투명도)
  const heartbeat = useRef(new Animated.Value(0)).current;

  // 로테이션 문구
  const tips = [
    "샐러드/콘 등 보조 반찬을 인식하고 있어요",
    "튀김류의 기름 양과 포화지방을 추정하고 있어요",
    "접시 전체에서 음식 면적을 분석하고 있어요",
  ];
  const [tipIndex, setTipIndex] = useState(0);
  const tipOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 진행바
    const id = progress.addListener(({ value }) =>
      setPercent(Math.round(value))
    );
    Animated.timing(progress, {
      toValue: 100,
      duration: delay,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

    // 테두리 네온 애니메이션
    Animated.loop(
      Animated.timing(edgeSpin, {
        toValue: 1,
        duration: 4500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(edgePulse, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(edgePulse, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 로봇 맥박
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartbeat, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(heartbeat, {
          toValue: 0,
          duration: 600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 문구 1.8초 주기 페이드 전환
    const cycleTip = () => {
      Animated.timing(tipOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start(() => {
        setTipIndex((i) => (i + 1) % tips.length);
        Animated.timing(tipOpacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }).start();
      });
    };
    const tipTimer = setInterval(cycleTip, 1800);

    // 강제 지연 후 결과 이동 (URI 인코딩)
    const t = setTimeout(() => {
      const encoded = encodeURIComponent(imageUri || "");
      router.replace({
        pathname: "/camera-result",
        params: { imageUri: encoded },
      });
    }, delay);

    return () => {
      progress.removeListener(id);
      clearTimeout(t);
      clearInterval(tipTimer);
    };
  }, [
    delay,
    imageUri,
    progress,
    router,
    tipOpacity,
    tips.length,
    edgePulse,
    edgeSpin,
    heartbeat,
  ]);

  // 애니메이션 값
  const progressWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });
  const edgeRotate = edgeSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const edgeOpacity = edgePulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.75],
  });
  const robotScale = heartbeat.interpolate({
    inputRange: [0, 1],
    outputRange: [0.94, 1.06],
  });
  const robotOpacity = heartbeat.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });
  const glowOpacity = heartbeat.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.45],
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 헤더 숨김 */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* 화면 테두리 네온 */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.edgeRing,
          { transform: [{ rotate: edgeRotate }], opacity: edgeOpacity },
        ]}
      >
        <LinearGradient
          colors={["#A7F3D0", "#34D399", "#16A34A", "#059669", "#34D399"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <View pointerEvents="none" style={styles.edgeMask} />

      {/* 콘텐츠 */}
      <View style={[styles.container, { paddingTop: insets.top + 14 }]}>
        <Text style={styles.title}>AI가 식단을 분석 중이에요</Text>
        <Text style={styles.sub}>
          정확한 영양 성분과 음식 구성을 계산하고 있습니다…
        </Text>

        {!!imageUri && (
          <View style={styles.previewWrap}>
            <Image source={{ uri: imageUri }} style={styles.preview} />
          </View>
        )}

        {/* 큰 그라데이션 로봇 (맥박) */}
        <View style={styles.robotWrap}>
          {/* 은은한 그린 글로우 */}
          <Animated.View style={[styles.robotGlow, { opacity: glowOpacity }]} />
          <Animated.View
            style={{
              transform: [{ scale: robotScale }],
              opacity: robotOpacity,
            }}
          >
            <GradientRobot size={140} />
          </Animated.View>
        </View>

        {/* 진행 바 */}
        <View style={styles.barTrack}>
          <Animated.View style={[styles.barFillWrap, { width: progressWidth }]}>
            <LinearGradient
              colors={["#34D399", "#059669", "#2563EB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.barFill}
            />
          </Animated.View>
        </View>
        <Text style={styles.percent}>{percent}%</Text>

        {/* 로테이션 문구 (페이드) */}
        <View style={styles.tipBox}>
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={18}
            color="#2E7D32"
          />
          <Animated.Text style={[styles.tipText, { opacity: tipOpacity }]}>
            {tips[tipIndex]}
          </Animated.Text>
        </View>

        <Text style={styles.footNote}>
          분석이 완료되면 결과 화면으로 자동 이동합니다.
        </Text>
      </View>
    </View>
  );
}

function GradientRobot({ size = 140 }) {
  return (
    <MaskedView
      style={{ width: size, height: size }}
      maskElement={
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <MaterialCommunityIcons
            name="robot-excited-outline"
            size={size}
            color="black"
          />
        </View>
      }
    >
      <LinearGradient
        colors={["#A7F3D0", "#34D399", "#16A34A", "#059669", "#34D399"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
}

const EDGE_MARGIN = 8;

const styles = StyleSheet.create({
  edgeRing: {
    ...StyleSheet.absoluteFillObject,
  },
  edgeMask: {
    ...StyleSheet.absoluteFillObject,
    margin: EDGE_MARGIN,
    borderRadius: 28,
    backgroundColor: "#fff",
  },

  container: { flex: 1, paddingHorizontal: 20, paddingBottom: 16 },
  title: { fontSize: 20, fontWeight: "800", color: "#1b3b1e" },
  sub: { color: "#58725e", marginTop: 6 },

  previewWrap: {
    marginTop: 14,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  preview: { width: "100%", height: 220, backgroundColor: "#f2f2f2" },

  robotWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 6,
    minHeight: 160,
  },
  robotGlow: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 999,
    backgroundColor: "#A7F3D0",
    shadowColor: "#34D399",
    shadowOpacity: 0.7,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
  },

  barTrack: {
    height: 12,
    backgroundColor: "#e4efe7",
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 12,
  },
  barFillWrap: { height: "100%" },
  barFill: { height: "100%" },

  percent: { marginTop: 8, fontWeight: "700", color: "#2E7D32" },

  tipBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E8F3EA",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 14,
  },
  tipText: { color: "#1b3b1e", fontWeight: "600" },

  footNote: { marginTop: 6, color: "#666" },
});
