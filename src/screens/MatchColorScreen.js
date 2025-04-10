// screens/MatchColorScreen.js
import React, { useState } from "react";
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

export default function MatchColorScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();


  const looks = [
    {
      title: "Look 1: Confident",
      colors: ["#e8413c", "#E67E22", "#5CB85C"],
      names: ["Red", "Orange", "Green"],
      descriptions: ["Help enhance confidence and positive energy."],
    },
    {
      title: "Look 2: Health",
      colors: ["#A8D5BA", "#3B7A57", "#87CEEB"],
      names: ["Light Green", "Deep Green", "Light Blue"],
      descriptions: ["Help enhance health and peace of mind."],
    },
    {
      title: "Look 3: Creative",
      colors: ["#5BC0DE", "#673AB7", "#D1B3C4"],
      names: ["Blue", "Deep Purple", "Light Purple"],
      descriptions: ["Help enhance creativity and inspiration."],
    },
    {
      title: "Look 4: Charm",
      colors: ["#EBA6B9", "#C71585", "#F8C8DC"],
      names: ["Pink", "Deep Pink", "Light Pink"],
      descriptions: ["Help enhance love and personal charm."],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <OtherHeader 
        title={t("matchColor")} 
        theme={theme} 
      />

      <ScrollView
        style={[styles.mainContent, { backgroundColor: theme.backgroundColor }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.dateText, { color: theme.textColor }]}>Sunday, 9 March 2025</Text>
        <View style={styles.colorContainer}>
          {looks.map((look, index) => (
            <View key={index} style={styles.colorSection}>
              <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{look.title}</Text>
              <View style={[styles.colorBoxContainer, { backgroundColor: theme.secondaryColor }]}>
                {look.colors.map((color, idx) => (
                  <View
                    key={idx}
                    style={[styles.colorBox, { backgroundColor: color }]}
                  >
                    <Text style={styles.colorName}>{look.names[idx]}</Text>
                  </View>
                ))}
              </View>
              {look.descriptions.map((desc, idx) => (
                <Text key={idx} style={[styles.description, { color: theme.textColor }]}>
                  {desc}
                </Text>
              ))}
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
    fontSize: 16, 
    fontWeight: "medium",
    marginTop: 2,
  },
  colorContainer: { 
    marginTop: 5
  },
  colorSection: { 
    marginBottom: 20 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  colorBoxContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },
  colorBox: {
    flex: 1,
    height: 60,
    borderRadius: 8,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  colorName: { 
    color: "white", 
    fontWeight: "bold" 
  },
  description: {
    fontSize: 14,
    textAlign: "left",
    marginTop: 5,
  },
}); 