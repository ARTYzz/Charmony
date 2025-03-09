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
import { Ionicons } from "@expo/vector-icons";
const colorData = require("./data/color.json");

export default function HomeScreen() {
  const [warningVisible, setWarningVisible] = useState(true);
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [luckyColors, setLuckyColors] = useState([]);
  const [unluckyColors, setUnluckyColors] = useState([]);

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
    return days[new Date().getDay()]; // Get current day name automatically
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

      {/* Header with CHROMANCY title */}
      <View style={styles.headerBar}>
        <Text style={styles.logo}>CHROMANCY</Text>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.mainContent}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {/* Weekday Selector */}
        <View style={styles.weekContainer}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => {
              const fullDayName = getFullDayName(day);
              const today = getCurrentDay(); // Get today's full day name
              const isSelected =
                selectedDay === fullDayName || today === fullDayName;

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
                </TouchableOpacity>
              );
            }
          )}
        </View>

        {/* Lucky Colors Section */}
        <View style={styles.colorContainer}>
          <Text style={styles.sectionTitle}>Lucky Color</Text>
          <View style={styles.colorRow}>
            {luckyColors.map((color, index) => (
              <View
                key={index}
                style={[styles.colorBox, { backgroundColor: color }]}
              >
                <Text style={styles.colorText}>{color}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Unlucky Colors Section */}
        <View style={styles.colorContainer}>
          <Text style={styles.sectionTitle}>Unlucky Color</Text>
          <View style={styles.colorRow}>
            {unluckyColors.map((color, index) => (
              <View
                key={index}
                style={[styles.colorBox, { backgroundColor: color }]}
              >
                <Text style={styles.colorText}>{color}</Text>
              </View>
            ))}
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

// Styles (Updated for Figma Design)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  /* MODAL */
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

  /* HEADER */
  headerBar: {
    width: "100%",
    height: 140,
    backgroundColor: "#FFFFFF", // White background
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Android shadow effect
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6C63FF", // Blue color from Figma
    textAlign: "center",
    letterSpacing: 1.5,
    fontFamily: "Poppins-Bold",
  },

  /* WEEKDAY SELECTOR */
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
    elevation: 3, // Android shadow effect
  },
  dayBox: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  selectedDay: {
    backgroundColor: "#E0E7FF", // Light blue for selected day
    borderRadius: 15,
  },
  dayText: { fontSize: 14, fontWeight: "500", color: "#1F2940" },
  selectedDayText: { fontWeight: "bold", color: "#1F2940" },

  /* COLOR SECTIONS */
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
  colorText: { fontSize: 16, fontWeight: "bold", color: "white" },
});
