import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import OtherHeader from "../components/OtherHeader";

// Import local JSON
import colorData from "../data/colorDetails.json";

export default function DetailColorScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [colors, setColors] = useState([]);

  useEffect(() => {
    setColors(colorData); // Load data from JSON
  }, []);

  // Helper to get suitable text color based on background
  const getTextColor = (bgColor) => {
    if (!bgColor) return "black";
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "black" : "white";
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <OtherHeader title={t("colorDetails")} theme={theme} />
      <ScrollView
        style={[styles.mainContent, { backgroundColor: theme.backgroundColor }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.colorContainer}>
          {colors.map((item, index) => (
            <View key={index} style={styles.colorSection}>
              <View
                style={[
                  styles.colorBox,
                  {
                    backgroundColor: item.color,
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.1)",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.colorName,
                    { color: getTextColor(item.color) },
                  ]}
                > 
                  {t(`colors.${item.name}`, item.name)}
                </Text>
              </View>
              <Text style={[styles.description, { color: theme.textColor }]}>
                {t(`colorDescriptions.${item.name}`)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainContent: { flex: 1, padding: 20, paddingTop: 23, marginBottom: 100 },
  colorContainer: { marginTop: 5 },
  colorSection: { marginBottom: 20, alignItems: "center" },
  colorBox: {
    width: "90%",
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  colorName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});
