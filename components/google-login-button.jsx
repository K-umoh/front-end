import React, { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

WebBrowser.maybeCompleteAuthSession();

// 1️⃣ 여기서 URI를 먼저 만든다
// const redirectUri = AuthSession.makeRedirectUri({
//   native: "longlive://redirect",
//   useProxy: true,
// });
const redirectUri = "https://auth.expo.io/@aryu1217/Long-Live";

console.log("✅ [디버깅] redirectUri 확인:", redirectUri);

export default function GoogleLoginButton({ onSuccess }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "434501824287-cfeomi7bkcmhdqci4c3p17hvqs1eigmn.apps.googleusercontent.com",
    iosClientId:
      "434501824287-n2pg3ildkd77a8jt3qupd1qsugsepnfa.apps.googleusercontent.com",
    redirectUri,
    //////////
    // clientId:
    //   "434501824287-cfeomi7bkcmhdqci4c3p17hvqs1eigmn.apps.googleusercontent.com", // 👈 webClientId 하나만
    // redirectUri: "https://auth.expo.io/@aryu1217/Long-Live",
    // scopes: ["profile", "email"],
  });

  useEffect(() => {
    console.log("📦 Full response object:", response);

    if (response?.type === "success") {
      console.log("✅ accessToken:", response.authentication.accessToken);
      onSuccess(response.authentication.accessToken);
    } else if (response?.type === "error") {
      console.log("❌ OAuth error:", response.error);
    } else if (response) {
      console.log("⚠️ OAuth response received, but not success:", response);
    }
  }, [response]);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
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
