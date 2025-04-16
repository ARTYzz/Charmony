import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import OtherHeader from "../components/OtherHeader";

// Import lucky color data
import luckyColorData from "../data/luckyColors.json";

export default function LuckyColorBoostScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  // Get today's full day name
  const fullDayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
  const todayData = luckyColorData[fullDayName];

  const sections = [
    { key: "career", title: "Career", icon: "briefcase" },
    { key: "finance", title: "Finance & Wealth", icon: "cash" },
    { key: "luck", title: "Luck & Fortune", icon: "star" },
    { key: "love", title: "Charm & Relationships", icon: "heart" },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <OtherHeader title={t("boostYourLuck")} theme={theme} />
      <ScrollView
        style={[styles.mainContent, { backgroundColor: theme.backgroundColor }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.dateText, { color: theme.textColor }]}>
          {fullDayName},{" "}
          {new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Text>
        <View style={styles.colorContainer}>
          {sections.map((section, index) => {
            const item = todayData[section.key];
            return (
              <View key={index} style={styles.colorSection}>
                <View style={styles.colorHeader}>
                  <Ionicons
                    name={section.icon}
                    size={24}
                    color={theme.textColor}
                  />
                  <Text
                    style={[styles.sectionTitle, { color: theme.textColor }]}
                  >
                    {section.title}
                  </Text>
                </View>
                <View
                  style={[
                    styles.colorBoxContainer,
                    { backgroundColor: theme.secondaryColor },
                  ]}
                >
                  <View
                    style={[styles.colorBox, { backgroundColor: item.color }]}
                  >
                    <Text style={styles.colorText}>{item.name}</Text>
                  </View>
                </View>
                <Text style={[styles.description, { color: theme.textColor }]}>
                  {item.description}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainContent: { flex: 1, padding: 20, paddingTop: 23 },
  dateText: { fontSize: 15, fontWeight: "medium", marginTop: 2 },
  colorContainer: { marginTop: 5 },
  colorSection: { marginBottom: 20 },
  colorHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },
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
    paddingLeft: 10,
  },
  description: { fontSize: 14 },
});
