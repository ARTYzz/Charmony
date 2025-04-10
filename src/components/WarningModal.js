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

const { width } = Dimensions.get('window');

// Welcome Modal Component
const WarningModal = ({ visible, onClose }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalBox}>
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="alert-circle" size={36} color="#6845A3" />
          </View>
          <Text style={styles.warningText}>Welcome to Charmony</Text>
        </View>
        
        <View style={styles.divider} />
        
        <Text style={styles.warningTextDescription}>
          This is an auspicious color app. The colors and their meanings are intended to enhance various aspects of your life based on traditional beliefs.
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
          <Text style={styles.okButtonText}>I understand</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

// Styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalBox: {
    width: width * 0.85,
    maxWidth: 340,
    backgroundColor: "#FFFFFF",
    padding: 0,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  headerSection: {
    width: '100%',
    padding: 20,
    paddingBottom: 15,
    alignItems: 'center',
    backgroundColor: '#F8F5FF',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#6845A3",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  warningText: {
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
    color: "#6845A3",
    textAlign: "center",
  },
  divider: {
    height: 1,
    width: '90%',
    backgroundColor: '#F0F0F0',
    marginVertical: 5,
  },
  warningTextDescription: { 
    textAlign: "center", 
    color: "#555555",
    lineHeight: 24,
    marginTop: 15,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Nunito',
    paddingHorizontal: 25,
  },
  colorSampleContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    justifyContent: 'center',
    width: '100%',
  },
  colorSample: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  okButton: {
    backgroundColor: '#6845A3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#6845A3",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  okButtonText: {
    color: 'white',
    fontFamily: 'Nunito-Bold',
    fontSize: 17,
  },
});

export default WarningModal; 