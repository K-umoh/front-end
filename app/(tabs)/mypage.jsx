import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import UserProfileCard from "../../components/mypage/user-profile-card";
import HealthMetrics from "../../components/mypage/metric-card";
import HealthSavedTimeCard from "../../components/mypage/health-saved-time-card";

export default function MyPage() {
  // const { accessToken } = useLocalSearchParams();
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://www.googleapis.com/oauth2/v3/userinfo",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );
  //       const data = await res.json();
  //       setUser(data);
  //     } catch (err) {
  //       console.error("유저 정보 요청 실패:", err);
  //     }
  //   };

  //   getUserInfo();
  // }, []);

  // if (!user) {
  //   return (
  //     <View style={styles.loading}>
  //       <ActivityIndicator size="large" color="#2E7D32" />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        {/* <Image source={{ uri: user.picture }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text> */}
        <UserProfileCard />
        <HealthSavedTimeCard />
        <HealthMetrics />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollBody: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 28,
    rowGap: 16, // RN 0.73+; 오래된 RN이면 대신 margin으로 간격 조절
  },
  loading: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#555",
  },
});
