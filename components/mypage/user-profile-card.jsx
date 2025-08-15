import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Pencil } from "lucide-react-native";

// 더미 데이터
const userName = "류태현";
const userType = "저속노화형 라이프스타일";

export default function UserProfileCard() {
  return (
    <View style={styles.card}>
      {/* 프로필 영역 */}
      <View style={styles.profileRow}>
        {/* 프로필 원 */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{userName[0]}</Text>
        </View>

        {/* 이름 + 타입 */}
        <View>
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.type}>{userType}</Text>
        </View>
      </View>

      {/* 버튼 */}
      <TouchableOpacity style={styles.button}>
        <Pencil size={16} color="#4CAF50" style={{ marginRight: 6 }} />
        <Text style={styles.buttonText}>내 건강 정보 수정</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 12,
    width: "92%",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
  },
  name: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#333",
  },
  type: {
    fontSize: 15,
    color: "#777",
    marginTop: 2,
  },
  button: {
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center", // 가로 가운데
    alignItems: "center", // 세로 가운데
  },

  buttonText: {
    color: "#4CAF50",
    fontWeight: "bold",
    fontSize: 14,
  },
});
