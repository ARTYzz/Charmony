import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import OtherHeader from "../components/OtherHeader";
import matchColors from "../data/matchColors.json";
import { useSelectedDay } from "../context/SelectedDayContext";

export default function MatchColorScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { selectedDay } = useSelectedDay(); // ✅ get day from context

  const todayLooks = matchColors[selectedDay] || {};

  const looks = [
    { ...todayLooks.Confident, key: "confident" },
    { ...todayLooks.Health, key: "health" },
    { ...todayLooks.Creative, key: "creative" },
    { ...todayLooks.Charm, key: "charm" },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <OtherHeader title={t("matchColor")} theme={theme} />
      <ScrollView
        style={[styles.mainContent, { backgroundColor: theme.backgroundColor }]}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.dateText, { color: theme.textColor }]}>
          {selectedDay}
        </Text>
        <View style={styles.colorContainer}>
          {looks.map((look, index) => (
            <View key={index} style={styles.colorSection}>
              <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                {t(`look.${look.key}`)}
              </Text>
              <View
                style={[
                  styles.colorBoxContainer,
                  { backgroundColor: theme.secondaryColor },
                ]}
              >
                {look?.colors?.map((color, idx) => (
                  <View
                    key={idx}
                    style={[styles.colorBox, { backgroundColor: color }]}
                  >
                    <Text style={styles.colorName}>
                      {t(`colors.${look.names[idx]}`, look.names[idx])}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainContent: { flex: 1, padding: 20, paddingTop: 23 },
  dateText: { fontSize: 16, fontWeight: "medium", marginTop: 2 },
  colorContainer: { marginTop: 5 },
  colorSection: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
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
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    textAlign: "left",
    marginTop: 5,
  },
});
