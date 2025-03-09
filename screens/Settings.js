import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const loadLanguage = async () => {
      const lang = await AsyncStorage.getItem("appLanguage");
      if (lang) setLanguage(lang);
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lang) => {
    await AsyncStorage.setItem("appLanguage", lang);
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setLanguageModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.logo}>{t("settings")}</Text>
      </View>

      <View style={styles.settingContainer}>
        <View style={styles.settingItem}>
          <Ionicons name="color-palette-outline" size={24} color="black" />
          <Text style={styles.settingText}>{t("theme")}</Text>
          <View style={styles.settingRight}>
            <Text style={styles.settingValue}>{t("light")}</Text>
            <TouchableOpacity>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingItem}>
          <TouchableOpacity
            onPress={() => setLanguageModalVisible(true)}
            style={styles.settingItem}
          >
            <Ionicons name="language-outline" size={24} color="black" />
            <Text style={styles.settingText}>{t("language")}</Text>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{t(language)}</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.settingItem}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Text style={styles.settingText}>{t("notification")}</Text>
          <Switch
            value={isNotificationEnabled}
            onValueChange={() => setIsNotificationEnabled((prev) => !prev)}
          />
        </View>
      </View>

      <Modal visible={isLanguageModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => changeLanguage("en")}>
              <Text
                style={[
                  styles.modalOption,
                  language === "en" && styles.selectedOption,
                ]}
              >
                {t("english")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguage("th")}>
              <Text
                style={[
                  styles.modalOption,
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerBar: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 100,
    backgroundColor: "#5B3E90",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: { position: "absolute", left: 10, padding: 10 },
  logo: { color: "white", fontSize: 24, fontWeight: "bold" },
  settingContainer: { marginTop: 100, padding: 20 },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingText: { fontSize: 18, flex: 1, marginLeft: 10 },
  settingRight: { flexDirection: "row", alignItems: "center" },
  settingValue: { fontSize: 16, marginRight: 10, color: "gray" },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
  },
  modalOption: {
    fontSize: 18,
    paddingVertical: 12,
    color: "#000",
    width: "100%",
    textAlign: "center",
  },
  selectedOption: { fontWeight: "bold", textDecorationLine: "underline" },
  cancelOption: {
    color: "red",
    fontSize: 18,
    paddingVertical: 12,
    textAlign: "center",
  },
});
