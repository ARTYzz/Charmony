import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import OtherHeader from "../components/OtherHeader";

export default function DetailColorScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const colorsOfTheDay = [
    {
      color: "#e8413c",
      name: "Red",
      description: "Helps enhance confidence and positive energy.",
    },
    {
      color: "#E67E22",
      name: "Orange",
      description: "Helps enhance creativity and fortune.",
    },
    {
      color: "#C71585",
      name: "Deep Pink",
      description: "Helps enhance love and personal charm.",
    },
    {
      color: "#FFB6C1",
      name: "Light Pink",
      description: "Helps enhance tenderness and affection.",
    },
    {
      color: "#C4E1C1",
      name: "Green",
      description: "Helps enhance growth and harmony.",
    },
    {
      color: "#006400",
      name: "Deep Green",
      description: "Helps enhance stability and grounding.",
    },
    {
      color: "#A8D5BA",
      name: "Light Green",
      description: "Helps enhance health and inner peace.",
    },
    {
      color: "#ADD8E6",
      name: "Light Blue",
      description: "Helps enhance tranquility and clarity.",
    },
    {
      color: "#5BC0DE",
      name: "Blue",
      description: "Helps enhance wisdom and intelligence.",
    },
    {
      color: "#FFFF00",
      name: "Yellow",
      description: "Helps enhance optimism and creativity.",
    },
    {
      color: "#BEBEBE",
      name: "Gray",
      description: "Helps enhance balance and neutrality.",
    },
    {
      color: "#FFFFFF",
      name: "White",
      description: "Helps enhance purity and clarity.",
    },
    {
      color: "#000000",
      name: "Black",
      description: "Helps enhance sophistication and strength.",
    },
    {
      color: "#800080",
      name: "Purple",
      description: "Helps enhance spirituality and ambition.",
    },
    {
      color: "#D8B7DD",
      name: "Light Purple",
      description: "Helps enhance calmness and creativity.",
    },
    {
      color: "#6A0DAD",
      name: "Deep Purple",
      description: "Helps enhance wisdom and intuition.",
    },
    {
      color: "#FFD700",
      name: "Gold",
      description: "Helps enhance success and luxury.",
    },
    {
      color: "#FFF5E1",
      name: "Cream",
      description: "Helps enhance warmth and comfort.",
    },
    {
      color: "#8B4513",
      name: "Brown",
      description: "Helps enhance stability and security.",
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <OtherHeader 
        title={t("colorDetails")} 
        theme={theme} 
      />
      <ScrollView
        style={[styles.mainContent, { backgroundColor: theme.backgroundColor }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.colorContainer}>
          {colorsOfTheDay.map((item, index) => (
            <View key={index} style={styles.colorSection}>
              <View style={[styles.colorBox, { backgroundColor: item.color }]}>
                <Text style={styles.colorName}>{item.name}</Text>
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
    marginBottom: 110,
  },
  colorContainer: { 
    marginTop: 5
  },
  colorSection: { 
    marginBottom: 20, 
    alignItems: "center" 
  },
  colorBox: {
    width: "90%",
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  colorName: { 
    color: 'white',
    fontWeight: "bold", 
    fontSize: 14 
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});