import React, { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

WebBrowser.maybeCompleteAuthSession();

// 1️⃣ 여기서 URI를 먼저 만든다
const redirectUri = AuthSession.makeRedirectUri({
  native: "longlive://redirect",
  useProxy: true,
});

console.log("✅ [디버깅] redirectUri 확인:", redirectUri);

export default function GoogleLoginButton({ onSuccess }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "434501824287-cfeomi7bkcmhdqci4c3p17hvqs1eigmn.apps.googleusercontent.com",
    iosClientId:
      "434501824287-iuqvqqcs5uil5fu2r4i71mp6h3qn9us4.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    redirectUri, // 2️⃣ 미리 만든 값 사용
  });

  useEffect(() => {
    if (response?.type === "success") {
      console.log(
        "🟢 로그인 성공! accessToken:",
        response.authentication.accessToken
      );
      onSuccess(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        console.log("🟡 구글 로그인 버튼 눌림");
        promptAsync();
      }}
    >
      <Image
        source={require("../assets/images/Logo-google-icon.png")}
        style={styles.icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f5f5f5",
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 26,
    height: 26,
  },
});
