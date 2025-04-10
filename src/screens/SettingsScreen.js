import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
  Modal,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import { useTheme, themes } from "../context/ThemeContext";
import OtherHeader from "../components/OtherHeader";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { theme, themeMode, changeTheme } = useTheme();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [isThemeModalVisible, setThemeModalVisible] = useState(false);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setLanguageModalVisible(false);
  };

  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme);
    setThemeModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <OtherHeader 
        title={t("settings")} 
        theme={theme} 
      />

      <ScrollView
        style={styles.settingContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.settingItem}>
          <TouchableOpacity
            onPress={() => setThemeModalVisible(true)}
            style={[styles.settingItem, { borderBottomColor: theme.secondaryColor }]}
          >
            <Ionicons name="color-palette-outline" size={24} color={theme.textColor} />
            <Text style={[styles.settingText, { color: theme.textColor }]}>{t("theme")}</Text>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, { color: theme.textColor }]}>{t(themeMode)}</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={theme.textColor}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.settingItem, { borderBottomColor: theme.secondaryColor }]}>
          <TouchableOpacity
            onPress={() => setLanguageModalVisible(true)}
            style={styles.settingItem}
          >
            <Ionicons name="language-outline" size={24} color={theme.textColor} />
            <Text style={[styles.settingText, { color: theme.textColor }]}>{t("language")}</Text>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, { color: theme.textColor }]}>{t(language)}</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={theme.textColor}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.settingItem, { borderBottomColor: theme.secondaryColor }]}>
          <Ionicons name="notifications-outline" size={24} color={theme.textColor} />
          <Text style={[styles.settingText, { color: theme.textColor }]}>{t("notification")}</Text>
          <Switch
            value={isNotificationEnabled}
            onValueChange={() => setIsNotificationEnabled((prev) => !prev)}
            trackColor={{ false: "#767577", true: theme.primaryColor }}
          />
        </View>
      </ScrollView>

      {/* Language Modal */}
      <Modal visible={isLanguageModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <TouchableOpacity onPress={() => handleLanguageChange("en")}>
              <Text
                style={[
                  styles.modalOption,
                  { color: theme.textColor },
                  language === "en" && styles.selectedOption,
                ]}
              >
                {t("english")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange("th")}>
              <Text
                style={[
                  styles.modalOption,
                  { color: theme.textColor },
                  language === "th" && styles.selectedOption,
                ]}
              >
                {t("thai")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguageModalVisible(false)}>
              <Text style={styles.cancelOption}>{t("cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Theme Modal */}
      <Modal visible={isThemeModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <TouchableOpacity onPress={() => handleThemeChange("light")}>
              <Text
                style={[
                  styles.modalOption,
                  { color: theme.textColor },
                  themeMode === "light" && styles.selectedOption,
                ]}
              >
                {t("light")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleThemeChange("dark")}>
              <Text
                style={[
                  styles.modalOption,
                  { color: theme.textColor },
                  themeMode === "dark" && styles.selectedOption,
                ]}
              >
                {t("dark")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setThemeModalVisible(false)}>
              <Text style={styles.cancelOption}>{t("cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  settingContainer: { 
    flex: 1,
    padding: 20,
    paddingTop: 23,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  settingText: { 
    fontSize: 18, 
    flex: 1, 
    marginLeft: 10 
  },
  settingRight: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  settingValue: { 
    fontSize: 16, 
    marginRight: 10 
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    paddingVertical: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
  },
  modalOption: {
    fontSize: 18,
    paddingVertical: 12,
    width: "100%",
    textAlign: "center",
  },
  selectedOption: { 
    fontWeight: "bold", 
    textDecorationLine: "underline" 
  },
  cancelOption: {
    color: "red",
    fontSize: 18,
    paddingVertical: 12,
    textAlign: "center",
  },
}); 