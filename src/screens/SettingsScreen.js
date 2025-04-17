import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import { useTheme, themes } from "../context/ThemeContext";
import OtherHeader from "../components/OtherHeader";
import * as Notifications from "expo-notifications";
import luckyColorData from "../data/color.json";
import { scheduleDailyLuckyColorNotification } from "../utils/notificationScheduler";
import { getFontFamily } from "../utils/fontUtils";

const { width } = Dimensions.get('window');

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { theme, themeMode, changeTheme } = useTheme();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [isThemeModalVisible, setThemeModalVisible] = useState(false);

  // Get appropriate fonts based on language
  const regularFont = getFontFamily(language, 'regular');
  const boldFont = getFontFamily(language, 'bold');

  // ตรวจสอบสถานะการแจ้งเตือนเมื่อโหลดหน้าจอ
  useEffect(() => {
    checkNotificationStatus();
  }, []);

  // ตรวจสอบและอัปเดตสถานะการแจ้งเตือน
  const checkNotificationStatus = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      setIsNotificationEnabled(status === "granted");
    } catch (error) {
      console.error("Failed to check notification status:", error);
      setIsNotificationEnabled(false);
    }
  };

  // จัดการการเปลี่ยนภาษา
  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
    setLanguageModalVisible(false);
  };

  // จัดการการเปลี่ยนธีม
  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme);
    setThemeModalVisible(false);
  };

  // จัดการการเปลี่ยนสถานะการแจ้งเตือน
  const handleNotificationToggle = async (value) => {
    try {
      if (value) {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === "granted") {
          await scheduleDailyLuckyColorNotification(luckyColorData);
          setIsNotificationEnabled(true);
        } else {
          setIsNotificationEnabled(false);
        }
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
        setIsNotificationEnabled(false);
      }
    } catch (error) {
      console.error("Failed to toggle notifications:", error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <OtherHeader title={t("settings")} theme={theme} />
      <ScrollView
        style={[styles.scrollContent, { backgroundColor: theme.backgroundColor }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[
          styles.sectionTitle, 
          { 
            color: theme.primaryColor,
            fontFamily: boldFont
          }
        ]}>
          {t("appearance")}
        </Text>

        <View style={[styles.settingGroup, { backgroundColor: theme.cardBackground }]}>
          <TouchableOpacity
            onPress={() => setThemeModalVisible(true)}
            style={styles.settingItem}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: themeMode === 'dark' ? '#554388' : '#E5D8FF' }]}>
                <Ionicons
                  name="color-palette-outline"
                  size={20}
                  color={themeMode === 'dark' ? '#BFA8FF' : '#6845A3'}
                />
              </View>
              <Text style={[
                styles.settingText, 
                { 
                  color: theme.textColor,
                  fontFamily: regularFont
                }
              ]}>
                {t("theme")}
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[
                styles.settingValue, 
                { 
                  color: theme.textColor,
                  fontFamily: regularFont
                }
              ]}>
                {themeMode === "dark" ? t("dark") : t("light")}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.textColor}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setLanguageModalVisible(true)}
            style={styles.settingItem}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: themeMode === 'dark' ? '#554388' : '#E5D8FF' }]}>
                <Ionicons
                  name="language"
                  size={20}
                  color={themeMode === 'dark' ? '#BFA8FF' : '#6845A3'}
                />
              </View>
              <Text style={[
                styles.settingText, 
                { 
                  color: theme.textColor,
                  fontFamily: regularFont
                }
              ]}>
                {t("language")}
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[
                styles.settingValue, 
                { 
                  color: theme.textColor,
                  fontFamily: regularFont
                }
              ]}>
                {language === "th" ? t("thai") : t("english")}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.textColor}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={[
          styles.sectionTitle, 
          { 
            color: theme.primaryColor, 
            marginTop: 25,
            fontFamily: boldFont
          }
        ]}>
          {t("notifications")}
        </Text>

        <View style={[styles.settingGroup, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: themeMode === 'dark' ? '#554388' : '#E5D8FF' }]}>
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color={themeMode === 'dark' ? '#BFA8FF' : '#6845A3'}
                />
              </View>
              <Text style={[
                styles.settingText, 
                { 
                  color: theme.textColor,
                  fontFamily: regularFont
                }
              ]}>
                {t("notification")}
              </Text>
            </View>
            <Switch
              trackColor={{
                false: themeMode === 'dark' ? "#3A3A3C" : "#D1D1D6",
                true: themeMode === 'dark' ? "#8A59FF" : "#A67CFF",
              }}
              thumbColor={isNotificationEnabled ? "#FFFFFF" : "#F4F3F4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleNotificationToggle}
              value={isNotificationEnabled}
            />
          </View>
        </View>
      </ScrollView>

      {/* Language Modal */}
      <Modal visible={isLanguageModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[
                styles.modalTitle, 
                { 
                  color: theme.textColor,
                  fontFamily: boldFont
                }
              ]}>
                {t("language")}
              </Text>
              <View style={styles.modalDragHandle} />
            </View>
            
            <TouchableOpacity 
              onPress={() => handleLanguageChange("en")}
              style={[
                styles.modalOptionContainer,
                language === "en" && { backgroundColor: themeMode === 'dark' ? '#554388' : '#EFE5FF' }
              ]}
            >
              <Text
                style={[
                  styles.modalOption,
                  { 
                    color: theme.textColor,
                    fontFamily: regularFont
                  },
                  language === "en" && styles.selectedOption,
                ]}
              >
                {t("english")}
              </Text>
              {language === "en" && (
                <Ionicons name="checkmark" size={22} color={theme.primaryColor} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => handleLanguageChange("th")}
              style={[
                styles.modalOptionContainer,
                language === "th" && { backgroundColor: themeMode === 'dark' ? '#554388' : '#EFE5FF' }
              ]}
            >
              <Text
                style={[
                  styles.modalOption,
                  { 
                    color: theme.textColor,
                    fontFamily: regularFont
                  },
                  language === "th" && styles.selectedOption,
                ]}
              >
                {t("thai")}
              </Text>
              {language === "th" && (
                <Ionicons name="checkmark" size={22} color={theme.primaryColor} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setLanguageModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={[
                styles.cancelText,
                { fontFamily: boldFont }
              ]}>
                {t("cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Theme Modal */}
      <Modal visible={isThemeModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[
                styles.modalTitle, 
                { 
                  color: theme.textColor,
                  fontFamily: boldFont
                }
              ]}>
                {t("theme")}
              </Text>
              <View style={styles.modalDragHandle} />
            </View>
            
            <TouchableOpacity 
              onPress={() => handleThemeChange("light")}
              style={[
                styles.modalOptionContainer,
                themeMode === "light" && { backgroundColor: themeMode === 'dark' ? '#554388' : '#EFE5FF' }
              ]}
            >
              <Text
                style={[
                  styles.modalOption,
                  { 
                    color: theme.textColor,
                    fontFamily: regularFont
                  },
                  themeMode === "light" && styles.selectedOption,
                ]}
              >
                {t("light")}
              </Text>
              {themeMode === "light" && (
                <Ionicons name="checkmark" size={22} color={theme.primaryColor} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => handleThemeChange("dark")}
              style={[
                styles.modalOptionContainer,
                themeMode === "dark" && { backgroundColor: themeMode === 'dark' ? '#554388' : '#EFE5FF' }
              ]}
            >
              <Text
                style={[
                  styles.modalOption,
                  { 
                    color: theme.textColor,
                    fontFamily: regularFont
                  },
                  themeMode === "dark" && styles.selectedOption,
                ]}
              >
                {t("dark")}
              </Text>
              {themeMode === "dark" && (
                <Ionicons name="checkmark" size={22} color={theme.primaryColor} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setThemeModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={[
                styles.cancelText,
                { fontFamily: boldFont }
              ]}>
                {t("cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    paddingLeft: 5,
    textTransform: 'uppercase',
  },
  settingGroup: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 14,
    fontWeight: "500",
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValue: {
    fontSize: 14,
    marginRight: 8,
    opacity: 0.8,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 30,
    opacity: 0.6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    paddingTop: 15,
    paddingBottom: 25,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  modalDragHandle: {
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#DDDDDD',
    position: 'absolute',
    top: -10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  modalOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 22,
    marginVertical: 2,
  },
  modalOption: {
    fontSize: 16,
  },
  selectedOption: {
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 15,
    alignItems: 'center',
    paddingVertical: 14,
    marginHorizontal: 22,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  cancelText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: "600",
  },
  notificationInfo: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    paddingLeft: 60,
  },
  notificationInfoText: {
    fontSize: 13,
    opacity: 0.7,
  },
});
