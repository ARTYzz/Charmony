import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // <-- Use this for navigation

export default function LuckyColorBoostScreen() {
  const navigation = useNavigation(); // <-- Use navigation hook

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.logo}>🎨 Lucky Colors Boost</Text>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.mainContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.dateText}>Sunday, 9 March 2025</Text>
        <View style={styles.colorContainer}>
          {[
            {
              title: "Career",
              icon: "briefcase",
              color: "#FF0000",
              name: "Red",
              description:
                "Red enhances confidence and credibility in the workplace.",
            },
            {
              title: "Finance & Wealth",
              icon: "cash",
              color: "#FFA500",
              name: "Orange",
              description: "Orange enhances luck and opportunities in life.",
            },
            {
              title: "Luck & Fortune",
              icon: "star",
              color: "#808080",
              name: "Gray",
              description: "Gray enhances fortune and financial stability.",
            },
            {
              title: "Charm & Relationships",
              icon: "heart",
              color: "#008000",
              name: "Green",
              description: "Green enhances charm and positive relationships.",
            },
          ].map((item, index) => (
            <View key={index} style={styles.colorSection}>
              <View style={styles.colorHeader}>
                <Ionicons name={item.icon} size={24} color="#1F2940" />
                <Text style={styles.sectionTitle}>{item.title}</Text>
              </View>
              <View style={styles.colorBoxContainer}>
                <View
                  style={[styles.colorBox, { backgroundColor: item.color }]}
                >
                  <Text style={styles.colorText}>{item.name}</Text>
                </View>
              </View>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerBar: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 100,
    backgroundColor: "#5B3E90",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 10,
    justifyContent: "center",
    padding: 10,
  },

  logo: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  mainContent: { marginTop: 100, padding: 20, backgroundColor: "#fff" },
  dateText: { fontSize: 15, fontWeight: "medium", color: "#1F2940" },
  colorContainer: { marginTop: 20 },
  colorSection: { marginBottom: 20 },
  colorHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#1F2940",
  },

  colorBoxContainer: {
    marginBottom: 5,
    backgroundColor: "#eee9f8",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  colorBox: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    paddingLeft: 10,
    borderRadius: 8,
  },
  colorText: { color: "white", fontWeight: "bold", paddingLeft: 10 },
  description: { fontSize: 14, color: "#5B3E90" },
});
