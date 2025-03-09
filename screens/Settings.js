// screens/SettingsScreen.js
import React, { useState } from "react";
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

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [language, setLanguage] = useState("English");
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const toggleNotification = () =>
    setIsNotificationEnabled((previousState) => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.logo}>Settings</Text>
      </View>

      <View style={styles.settingContainer}>
        <View style={styles.settingItem}>
          <Ionicons name="color-palette-outline" size={24} color="black" />
          <Text style={styles.settingText}>Color Theme</Text>
          <View style={styles.settingRight}>
            <Text style={styles.settingValue}>Light</Text>
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
        <TouchableOpacity onPress={() => setLanguageModalVisible(true)} style={styles.settingItem}>
          <Ionicons name="language-outline" size={24} color="black" />
          <Text style={styles.settingText}>Language</Text>
          <View style={styles.settingRight}>
            <Text style={styles.settingValue}>{language}</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </View>
        </TouchableOpacity>
        </View>
        
        <View style={styles.settingItem}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Text style={styles.settingText}>Notification</Text>
          <Switch
            value={isNotificationEnabled}
            onValueChange={toggleNotification}
          />
        </View>
      </View>
      <Modal visible={isLanguageModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => { setLanguage("English"); setLanguageModalVisible(false); }}>
              <Text style={[styles.modalOption, language === "English" && styles.selectedOption]}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setLanguage("Thai"); setLanguageModalVisible(false); }}>
              <Text style={[styles.modalOption, language === "Thai" && styles.selectedOption]}>Thai</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguageModalVisible(false)}>
              <Text style={styles.cancelOption}>Cancel</Text>
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
  backButton: { position: "absolute", left: 10, justifyContent: "center", padding: 10 },
  logo: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center"
  },
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
  cancelOption: { color: "red", fontSize: 18, paddingVertical: 12, textAlign: "center" },
});


