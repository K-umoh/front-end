// HealthSavedTimeCard.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Image, // ⬅️ 배경용
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// 배경 이미지 경로
import calendarBg from "../../assets/images/calendar.jpg";

// 표시할 목표값
const TARGET = { years: 1, months: 3, days: 13 };

// 30일→1개월, 12개월→1년 정규화
function normalize(y, m, d) {
  let years = y ?? 0,
    months = m ?? 0,
    days = d ?? 0;
  if (days >= 30) {
    months += Math.floor(days / 30);
    days %= 30;
  }
  if (months >= 12) {
    years += Math.floor(months / 12);
    months %= 12;
  }
  return { years, months, days };
}

/** 한 줄만 보이는 숫자 틱커 (아래 줄은 숨김) */
function TickerNumber({
  value,
  fontSize = 42,
  weight = "800",
  color = "#0F172A",
  perStep = 120,
  easing = Easing.out(Easing.cubic),
  resetSignal = 0,
}) {
  const lineH = Math.ceil(fontSize * 1.18);
  const safePad = Math.ceil(fontSize * 0.25);
  const slotH = lineH;

  const [display, setDisplay] = useState(0);
  const pending = useRef(0);
  const anim = useRef(false);
  const ty = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.current = false;
    pending.current = 0;
    ty.setValue(0);
    setDisplay(0);
    if (value > 0) {
      pending.current = value;
      kick();
    }
  }, [resetSignal]);

  useEffect(() => {
    const delta = value - (display + pending.current);
    if (delta > 0) {
      pending.current += delta;
      kick();
    } else if (delta < 0) {
      pending.current = 0;
      setDisplay(value);
      ty.setValue(0);
      anim.current = false;
    }
  }, [value]);

  const step = () => {
    Animated.timing(ty, {
      toValue: -lineH,
      duration: perStep,
      easing,
      useNativeDriver: true,
    }).start(() => {
      setDisplay((p) => p + 1);
      ty.setValue(0);
      pending.current -= 1;
      if (pending.current > 0) step();
      else anim.current = false;
    });
  };

  const kick = () => {
    if (!anim.current && pending.current > 0) {
      anim.current = true;
      step();
    }
  };

  return (
    <View style={[styles.numberSlot, { height: slotH, overflow: "hidden" }]}>
      <Animated.View
        style={{
          paddingTop: safePad,
          paddingBottom: safePad,
          transform: [{ translateY: ty }, { translateY: 10 }], // 숫자 살짝 아래로
        }}
      >
        <Text
          style={{
            fontSize,
            lineHeight: lineH,
            fontWeight: weight,
            color,
            includeFontPadding: false,
            textAlignVertical: "center",
          }}
          allowFontScaling={false}
        >
          {display}
        </Text>
        <Text
          style={{
            fontSize,
            lineHeight: lineH,
            fontWeight: weight,
            color,
            includeFontPadding: false,
            textAlignVertical: "center",
          }}
          allowFontScaling={false}
        >
          {display + 1}
        </Text>
      </Animated.View>
    </View>
  );
}

export default function HealthSavedTimeCard() {
  const target = normalize(TARGET.years, TARGET.months, TARGET.days);
  const [resetTick, setResetTick] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setResetTick((t) => t + 1);
    }, [])
  );

  return (
    <View style={styles.card}>
      {/* 배경: 축소 + 가운데 정렬 */}
      <View style={styles.bgWrap}>
        <Image source={calendarBg} style={styles.bgImage} />
        <View style={styles.overlay} />
      </View>

      {/* 내용 */}
      <View style={styles.content}>
        <Text style={styles.title}>지금까지 노화로부터 지켜낸 시간</Text>

        <View style={styles.rowNumbers}>
          <View style={styles.pair}>
            <TickerNumber value={target.years} resetSignal={resetTick} />
            <Text style={styles.unit}>년</Text>
          </View>
          <View style={{ width: 24 }} />
          <View style={styles.pair}>
            <TickerNumber value={target.months} resetSignal={resetTick} />
            <Text style={styles.unit}>개월</Text>
          </View>
          <View style={{ width: 24 }} />
          <View style={styles.pair}>
            <TickerNumber value={target.days} resetSignal={resetTick} />
            <Text style={styles.unit}>일</Text>
          </View>
        </View>

        <Text style={styles.caption}>
          “당신의 지금, 원래보다 더 늦게 나이 들고 있어요.”
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 카드 컨테이너(크기/모양)
  card: {
    width: "92%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#E6E9ED",
    borderRadius: 16,
    overflow: "hidden",
    paddingVertical: 24,
    paddingHorizontal: 18,
    position: "relative",
    backgroundColor: "#fff",
  },

  /* 배경을 가운데 두는 래퍼 */
  bgWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },

  /* ✅ 실제 축소·가운데 정렬되는 배경 이미지 */
  bgImage: {
    width: "70%", // 배경 크기 비율(원하면 조정)
    resizeMode: "contain",
    opacity: 0.16, // 은은함 정도
    alignSelf: "center",
  },

  /* 더 흐리게 하고 싶으면 alpha 올리기 */
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.0)",
  },

  // 내용
  content: { position: "relative" },

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#222",
    marginBottom: 36,
    textAlign: "center",
  },

  rowNumbers: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 28,
  },

  pair: { flexDirection: "row", alignItems: "flex-end" },

  numberSlot: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 48,
  },

  unit: {
    marginLeft: 1,
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },

  caption: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 13,
    marginTop: 20,
  },
});
