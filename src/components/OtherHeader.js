import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../context/LanguageContext";
import { getFontFamily } from "../utils/fontUtils";

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = Math.min(SCREEN_HEIGHT * 0.14, 120); // ลดความสูงจาก 16% เป็น 14% และจากสูงสุด 140px เป็น 120px

const OtherHeader = ({ title, theme, showBackButton = true, customAction }) => {
  const navigation = useNavigation();
  const { language } = useLanguage();
  
  // Get the appropriate font based on language
  const boldFont = getFontFamily(language, 'bold');
  
  const handleBackPress = () => {
    navigation.navigate('home');
  };
  
  // Generate gradient colors based on theme
  const gradientColors = [
    theme.primaryColor,
    `${theme.primaryColor}E6`, // Adding transparency
  ];
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient 
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerBar, { height: HEADER_HEIGHT }]}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.decorContainer}>
            <View style={[styles.decorCircle, { left: 15, top: '40%' }]} />
            <View style={[styles.decorCircle, { right: 15, top: '40%' }]} />
          </View>

          <View style={styles.headerContent}>
            {showBackButton && (
              <TouchableOpacity
                onPress={handleBackPress}
                style={styles.backButton}
                activeOpacity={0.6}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            )}
            
            <View style={styles.titleContainer}>
              <Text style={[styles.logo, { fontFamily: boldFont }]}>
                {title.toUpperCase()}
              </Text>
              <View style={styles.decorUnderline}>
                <View style={styles.underlineLine} />
                <View style={styles.underlineDot} />
                <View style={styles.underlineLine} />
              </View>
            </View>
            
            {/* ช่องว่างด้านขวาเพื่อความสมดุล */}
            {showBackButton ? (
              <View style={styles.balancer}>
                {/* Optional icon or decoration */}
              </View>
            ) : (
              <View style={styles.emptyBalancer} />
            )}
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

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
    position: 'relative',
    justifyContent: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255,255,255,0.28)',
    width: 44,
    height: 44,
    borderRadius: 22,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    left : 22
  },
  balancer: {
    width: 44,
    height: 44,
  },
  emptyBalancer: {
    width: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    paddingHorizontal: 8,
  },
  decorUnderline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    width: '60%',
  },
  underlineLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 1,
  },
  underlineDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginHorizontal: 4,
  },
  decorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  decorCircle: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
});

export default OtherHeader;