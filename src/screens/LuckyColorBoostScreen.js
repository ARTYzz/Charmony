import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import OtherHeader from "../components/OtherHeader";
import luckyColorData from "../data/luckyColors.json";
import { useSelectedDay } from "../context/SelectedDayContext"; // ✅ context

export default function LuckyColorBoostScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { selectedDay } = useSelectedDay(); // ✅ current day

  const todayData = luckyColorData[selectedDay];

  const sections = [
    { key: "career", title: t("luckySections.career"), icon: "briefcase" },
    { key: "finance", title: t("luckySections.finance"), icon: "cash" },
    { key: "luck", title: t("luckySections.luck"), icon: "star" },
    { key: "love", title: t("luckySections.love"), icon: "heart" },
  ];

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
      <OtherHeader title={t("boostYourLuck")} theme={theme} />
      <ScrollView
        style={[styles.mainContent, { backgroundColor: theme.backgroundColor }]}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.dateText, { color: theme.textColor }]}>
          {t(`days.${selectedDay}`, selectedDay)}
        </Text>
        <View style={styles.colorContainer}>
          {sections.map((section, index) => {
            const item = todayData[section.key] || [];
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
                  {item.map((colorItem, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.colorBox,
                        { backgroundColor: colorItem.color },
                      ]}
                    >
                      <Text
                        style={[
                          styles.colorText,
                          { color: getTextColor(colorItem.color) },
                        ]}
                      >
                        {t(`colors.${colorItem.name}`, colorItem.name)}
                      </Text>
                    </View>
                  ))}
                </View>
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
