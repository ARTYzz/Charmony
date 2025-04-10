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
      color: "#FF0000",
      name: "Red",
      description: "Helps enhance confidence and positive energy.",
    },
    {
      color: "#FFB500",
      name: "Orange",
      description: "Helps enhance creativity and fortune.",
    },
    {
      color: "#aa2a54",
      name: "Deep Pink",
      description: "Helps enhance love and personal charm.",
    },
    {
      color: "#33FF57",
      name: "Light Green",
      description: "Helps enhance health and inner peace.",
    },
    {
      color: "#3357FF",
      name: "Blue",
      description: "Helps enhance wisdom and intelligence.",
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
    color: "white", 
    fontWeight: "bold", 
    fontSize: 14 
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});