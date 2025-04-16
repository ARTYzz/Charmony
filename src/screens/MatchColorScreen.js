// screens/MatchColorScreen.js
import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import OtherHeader from "../components/OtherHeader";
import matchColors from "../data/matchColors.json";

const fullDayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
const todayLooks = matchColors[fullDayName];

export default function MatchColorScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const looks = [
    {
      ...todayLooks.Confident,
      key: "confident",
    },
    {
      ...todayLooks.Health,
      key: "health",
    },
    {
      ...todayLooks.Creative,
      key: "creative",
    },
    {
      ...todayLooks.Charm,
      key: "charm",
    },
  ];
  

  const formattedDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
          {formattedDate}
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
                {look.colors.map((color, idx) => (
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
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    textAlign: "left",
    marginTop: 5,
  },
});
