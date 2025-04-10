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
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import OtherHeader from "../components/OtherHeader";

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
  return mapping[shortDay] || shortDay;
}

export default function LuckyColorBoostScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <OtherHeader 
        title={t("boostYourLuck")} 
        theme={theme} 
      />

      {/* Main Content */}
      <ScrollView
        style={[styles.mainContent, { backgroundColor: theme.backgroundColor }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.dateText, { color: theme.textColor }]}>Sunday, 9 March 2025</Text>
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
                <Ionicons name={item.icon} size={24} color={theme.textColor} />
                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{item.title}</Text>
              </View>
              <View style={[styles.colorBoxContainer, { backgroundColor: theme.secondaryColor }]}>
                <View
                  style={[styles.colorBox, { backgroundColor: item.color }]}
                >
                  <Text style={styles.colorText}>{item.name}</Text>
                </View>
              </View>
              <Text style={[styles.description, { color: theme.textColor }]}>{item.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  mainContent: { 
    flex: 1,
    padding: 20,
    paddingTop: 23,
  },
  dateText: { 
    fontSize: 15, 
    fontWeight: "medium",
    marginTop: 2,
  },
  colorContainer: { 
    marginTop: 5 
  },
  colorSection: { 
    marginBottom: 20 
  },
  colorHeader: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 10 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  colorBoxContainer: {
    marginBottom: 5,
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
  colorText: { 
    color: "white", 
    fontWeight: "bold", 
    paddingLeft: 10 
  },
  description: { 
    fontSize: 14 
  },
}); 