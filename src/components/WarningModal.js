import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { getFontFamily } from "../utils/fontUtils";

const { width } = Dimensions.get('window');

// Welcome Modal Component
const WarningModal = ({ visible, onClose }) => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  // Get appropriate fonts based on language
  const regularFont = getFontFamily(language, 'regular');
  const boldFont = getFontFamily(language, 'bold');
  
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="alert-circle" size={36} color="#6845A3" />
            </View>
            <Text style={[styles.warningText, { fontFamily: boldFont }]}>
              {t("Welcome to Charmony", "Welcome to Charmony")}
            </Text>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={[styles.warningTextDescription, { fontFamily: regularFont }]}>
            {t("This is an auspicious color app. The colors and their meanings are intended to enhance various aspects of your life based on traditional beliefs.", 
              "This is an auspicious color app. The colors and their meanings are intended to enhance various aspects of your life based on traditional beliefs.")}
          </Text>
          
          <View style={styles.colorSampleContainer}>
            {['#FF6B6B', '#48DBFB', '#1DD1A1', '#FECA57', '#6C5CE7'].map((color, index) => (
              <View key={index} style={[styles.colorSample, { backgroundColor: color }]} />
            ))}
          </View>
          
          <TouchableOpacity 
            style={styles.okButton} 
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={[styles.okButtonText, { fontFamily: boldFont }]}>
              {t("I understand", "I understand")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 20,
  },
  modalBox: {
    width: '92%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 15,
  },
  headerSection: {
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(104, 69, 163, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  warningText: {
    fontSize: 22,
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 15,
  },
  warningTextDescription: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  colorSampleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  colorSample: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginHorizontal: 5,
  },
  okButton: {
    backgroundColor: "#6845A3",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 5,
    minWidth: '70%',
  },
  okButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default WarningModal; 