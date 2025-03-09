import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import colorData from "./data/color.json"; // ✅ Load local JSON

export default function HomeScreen() {
  const navigation = useNavigation();
  const [warningVisible, setWarningVisible] = useState(true);
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [luckyColors, setLuckyColors] = useState([]);
  const [unluckyColors, setUnluckyColors] = useState([]);

  // Mapping of Thai color names to HEX codes
  const colorMap = {
    Red: "#FF0000",
    Orange: "#FFA500",
    Gray: "#808080",
    Green: "#008000",
    "Light Blue": "#00BFFF",
    Blue: "#0000FF",
    Yellow: "#FFFF00",
    White: "#FFFFFF",
    Purple: "#800080",
    Black: "#000000",
    Gold: "#FFD700",
    Pink: "#FFC0CB",
    Cream: "#FFF5E1",
    Brown: "#8B4513",
  };

  // Function to determine text color based on brightness (Black for light colors, White for dark colors)
  const getTextColor = (hex) => {
    if (!hex) return "#000"; // Default to black
    const rgb = parseInt(hex.substring(1), 16);
    const r = (rgb >> 16) & 255,
      g = (rgb >> 8) & 255,
      b = rgb & 255;
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000" : "#FFF"; // Contrast formula
  };

  // Function to get the current weekday (e.g., "Sunday")
  function getCurrentDay() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[new Date().getDay()];
  }

  // ✅ Load colors from JSON dynamically
  useEffect(() => {
    const colors = colorData[selectedDay] || { lucky: [], unlucky: [] };
    setLuckyColors(colors.lucky);
    setUnluckyColors(colors.unlucky);
  }, [selectedDay]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Warning Modal */}
      <Modal visible={warningVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.warningText}>Warning</Text>
            <Text style={styles.warningTextDescription}>
              This is an auspicious color app. The colors and their meanings are
              intended to enhance various aspects of your life based on
              traditional beliefs.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setWarningVisible(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.headerBar}>
        <Text style={styles.logo}>CHROMANCY</Text>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.mainContent}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {/* Weekday Selector with Dates */}
        <View style={styles.weekContainer}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => {
              const today = new Date();
              const firstDayOfWeek = new Date(
                today.setDate(today.getDate() - today.getDay())
              );
              const currentDate = new Date(
                firstDayOfWeek.setDate(firstDayOfWeek.getDate() + index)
              );
              const dayNumber = currentDate.getDate(); // Get numeric date
              const fullDayName = getFullDayName(day);
              const isSelected = selectedDay === fullDayName;

              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.dayBox, isSelected && styles.selectedDay]}
                  onPress={() => setSelectedDay(fullDayName)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isSelected && styles.selectedDayText,
                    ]}
                  >
                    {day}
                  </Text>
                  <Text
                    style={[
                      styles.dayNumber,
                      isSelected && styles.selectedDayText,
                    ]}
                  >
                    {dayNumber}
                  </Text>
                </TouchableOpacity>
              );
            }
          )}
        </View>

        {/* Lucky Colors Section */}
        <TouchableOpacity
          style={styles.colorContainer}
          onPress={() => navigation.navigate("luckyColorBoost")} // ✅ Navigate on Click
        >
          <Text style={styles.sectionTitle}>Lucky Color</Text>
          <View style={styles.colorRow}>
            {luckyColors.map((color, index) => {
              const bgColor = colorMap[color] || "#D3D3D3"; // Default to light gray if not found
              return (
                <View
                  key={index}
                  style={[styles.colorBox, { backgroundColor: bgColor }]}
                >
                  <Text
                    style={[styles.colorText, { color: getTextColor(bgColor) }]}
                  >
                    {color}
                  </Text>
                </View>
              );
            })}
          </View>
        </TouchableOpacity>

        {/* Unlucky Colors Section */}
        <View style={styles.colorContainer}>
          <Text style={styles.sectionTitle}>Unlucky Color</Text>
          <View style={styles.colorRow}>
            {unluckyColors.map((color, index) => {
              const bgColor = colorMap[color] || "#D3D3D3"; // Default to light gray if not found
              return (
                <View
                  key={index}
                  style={[styles.colorBox, { backgroundColor: bgColor }]}
                >
                  <Text
                    style={[styles.colorText, { color: getTextColor(bgColor) }]}
                  >
                    {color}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Function to map abbreviated day names to full names
function getFullDayName(shortDay) {
  const mapping = {
    Sun: "Sunday",
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
  };
  return mapping[shortDay];
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: 300,
    backgroundColor: "#eee9f8",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  warningText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  warningTextDescription: { textAlign: "center", color: "#1F2940" },
  closeButton: { position: "absolute", top: 10, right: 10 },

  headerBar: {
    width: "100%",
    height: 140,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6C63FF",
    textAlign: "center",
    letterSpacing: 1.5,
    fontFamily: "Poppins-Bold",
  },

  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dayBox: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  selectedDay: {
    backgroundColor: "#E0E7FF",
    borderRadius: 15,
  },
  dayText: { fontSize: 14, fontWeight: "500", color: "#1F2940" },
  selectedDayText: { fontWeight: "bold", color: "#1F2940" },

  colorContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 10,
    width: "90%",
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  colorRow: { flexDirection: "row", justifyContent: "space-between" },
  colorBox: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 12,
  },
  colorText: { fontSize: 16, fontWeight: "bold", color: "black" },
  dayNumber: {
    fontSize: 12,
    fontWeight: "400",
    color: "#1F2940",
    marginTop: 2, // Space between day text and number
  },
});
