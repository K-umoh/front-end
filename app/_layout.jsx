import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView } from "react-native";
import "react-native-reanimated";
import CustomHeader from "../components/custom-header";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(tabs)"
          options={{
            header: () => (
              <SafeAreaView
                style={{
                  backgroundColor: "#fff", // 헤더 배경색
                  paddingTop: Platform.OS === "android" ? 25 : 0, // Android 상태바 대응
                }}
              >
                <CustomHeader />
              </SafeAreaView>
            ),
            title: "",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="camera-result"
          options={{
            title: "식단 분석 결과",
            headerBackTitleVisible: false,
            headerTintColor: "#2E7D32", // 아이콘 색
            headerTitleAlign: "center",

            tabBarStyle: { display: "none" }, // 탭바 숨김
          }}
        />

        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
