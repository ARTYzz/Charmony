import React from "react";
import { View, Text, StyleSheet, Platform, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = Math.min(SCREEN_HEIGHT * 0.20, 160); // ลดความสูงจาก 23% เป็น 20% และจากสูงสุด 180px เป็น 160px

// Header Component
const HomeHeader = ({ theme }) => {
  // Generate gradient colors based on theme or use default purple
  const primaryColor = theme?.primaryColor || "#5B3E90";
  const gradientColors = [
    primaryColor,
    `${primaryColor}E6`, // Adding transparency
    `${primaryColor}99`, // More transparency
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerBar, { height: HEADER_HEIGHT }]}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>CHARMONY</Text>
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Ionicons name="color-palette-outline" size={16} color="rgba(255,255,255,0.9)" />
                <View style={styles.dividerLine} />
              </View>
            </View>
            <Text style={styles.subtitle}>Your Daily Color Guide</Text>
            
            <View style={styles.decorContainer}>
              <View style={[styles.decorDot, { left: '15%', top: '40%' }]} />
              <View style={[styles.decorDot, { right: '15%', top: '40%' }]} />
              <View style={[styles.decorDot, { left: '25%', bottom: '30%' }]} />
              <View style={[styles.decorDot, { right: '25%', bottom: '30%' }]} />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 5,
    position: 'relative',
    marginBottom: 0, // ลดจาก 5 เป็น 0
  },
  headerBar: {
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 10, // ลดจาก 15 เป็น 10
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 8, // ลดจาก 10 เป็น 8
  },
  logo: {
    fontSize: Math.min(SCREEN_WIDTH * 0.09, 36), // Responsive font size based on screen width
    fontFamily: 'Nunito-Bold',
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6, // ลดจาก 8 เป็น 6
    marginBottom: 6, // ลดจาก 8 เป็น 6
    width: '70%',
  },
  dividerLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 1,
  },
  subtitle: {
    fontSize: Math.min(SCREEN_WIDTH * 0.045, 18), // Responsive font size
    fontFamily: 'Nunito',
    color: "#FFFFFF",
    opacity: 0.9,
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  decorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  decorDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});

export default HomeHeader; 