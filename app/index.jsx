import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import GoogleLoginButton from "../components/google-login-button";

export default function LoginScreen() {
  const router = useRouter();

  // ✅ 구글 로그인 성공 시 accessToken 받아 처리
  const handleGoogleLogin = async (accessToken) => {
    try {
      const response = await fetch(
        "http://39.117.181.160:8081/oauth/authenticated",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken }),
        }
      );

      if (!response.ok) throw new Error("로그인 실패");

      const data = await response.json();
      // await AsyncStorage.setItem("jwt", data.accessToken); // 필요 시 저장
      router.replace("/tabs"); // 로그인 후 탭 네비게이션으로 이동
    } catch (err) {
      Alert.alert("구글 로그인 실패", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오래살장</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="이메일 주소"
        placeholderTextColor="#999"
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#999"
        secureTextEntry
      />

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgot}>
        <Text style={styles.forgotText}>비밀번호를 잊으셨나요?</Text>
      </TouchableOpacity>

      {/* Log In Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.replace("/home")}
      >
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.or}>또는</Text>
        <View style={styles.line} />
      </View>

      {/* Social Buttons - Dummy UI */}
      <View style={styles.socialRow}>
        <GoogleLoginButton onSuccess={handleGoogleLogin} />

        <TouchableOpacity
          style={[styles.socialBox, { backgroundColor: "#FFEB00" }]}
        >
          <Image
            source={require("../assets/images/KakaoTalk_logo.svg.png")}
            style={styles.socialIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialBox, { backgroundColor: "#03c73c" }]}
        >
          <Image
            source={require("../assets/images/pngwing.com.png")}
            style={styles.socialIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Sign Up */}
      <View style={styles.signupContainer}>
        <Text style={{ color: "#555" }}>계정이 없으신가요? </Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signupText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  forgot: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotText: {
    color: "#2E7D32",
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  or: {
    marginHorizontal: 8,
    color: "#aaa",
    fontSize: 14,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 70,
    marginBottom: 12,
    marginTop: 10,
  },
  socialBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {
    width: 26,
    height: 26,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signupText: {
    color: "#2E7D32",
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
});
