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
          }}
        />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
