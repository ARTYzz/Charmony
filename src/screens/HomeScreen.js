import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { LinearGradient } from 'expo-linear-gradient';
// ต้องอัปเดต path ของ colorData เมื่อย้ายไฟล์ data
import colorData from "../data/color.json";
import HomeHeader from '../components/HomeHeader.js';
import WarningModal from '../components/WarningModal';
import ColorCalendar from '../components/ColorCalendar';

const { width } = Dimensions.get('window');

// =============================================
// Color Mapping (HEX codes for color names)
// =============================================
const COLOR_MAP = {
  Red: "#FF0000",
  Orange: "#FFA500",
  Gray: "#808080",
  Green: "#008000",
  "Light Blue": "#00BFFF",
  Blue: "#0000FF",
  Yellow: "#FFFF00",
  White: "#FFFFFF",
  Purple: "#800080",
  Black: "#000000",
  Gold: "#FFD700",
  Pink: "#FFC0CB",
  Cream: "#FFF5E1",
  Brown: "#8B4513",
};

/**
 * หน้าจอหลักของแอพ
 */
export default function HomeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme, themeMode } = useTheme();
  
  // State
  const [warningVisible, setWarningVisible] = useState(true);
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const [luckyColors, setLuckyColors] = useState([]);
  const [unluckyColors, setUnluckyColors] = useState([]);
  
  // Animation state
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30)); // สำหรับการเลื่อนขึ้น

  // =============================================
  // Helper Functions
  // =============================================
  
  // Function to determine text color based on background color brightness
  function getTextColor(hex) {
    if (!hex) return "#000";
    const rgb = parseInt(hex.substring(1), 16);
    const r = (rgb >> 16) & 255, g = (rgb >> 8) & 255, b = rgb & 255;
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000" : "#FFF";
  }

  // Function to get the current weekday (e.g., "Sunday")
  function getCurrentDay() {
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", 
      "Thursday", "Friday", "Saturday"
    ];
    return days[new Date().getDay()];
  }

  // Handle day selection from calendar
  function handleDaySelect(dayName) {
    setSelectedDay(dayName);
    
    // เริ่ม animation เมื่อเปลี่ยนวัน
    Animated.parallel([
      // Fade out
      Animated.timing(fadeAnim, { 
        toValue: 0, 
        duration: 150, 
        useNativeDriver: true 
      }),
      // Slide down (เตรียมเลื่อนขึ้น)
      Animated.timing(slideAnim, { 
        toValue: 50, 
        duration: 150, 
        useNativeDriver: true 
      })
    ]).start(() => {
      // หลังจาก fade out และ slide down แล้ว ทำ fade in และ slide up
      Animated.parallel([
        // Fade in
        Animated.timing(fadeAnim, { 
          toValue: 1, 
          duration: 400, 
          useNativeDriver: true 
        }),
        // Slide up
        Animated.timing(slideAnim, { 
          toValue: 0, 
          duration: 400, 
          useNativeDriver: true 
        })
      ]).start();
    });
  }

  // =============================================
  // Effects
  // =============================================
  
  // Load colors from JSON when selected day changes
  useEffect(() => {
    const colors = colorData[selectedDay] || { lucky: [], unlucky: [] };
    setLuckyColors(colors.lucky || []);
    setUnluckyColors(colors.unlucky || []);
  }, [selectedDay]);
  
  // animation เมื่อโหลดหน้าจอ
  useEffect(() => {
    // เริ่มต้นให้กล่องสีเลื่อนขึ้นมาเมื่อโหลด
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // สร้างกล่องสี
  function renderColorBox(color, isLucky) {
    const colorHex = COLOR_MAP[color] || "#D3D3D3";
    return (
      <View
        key={color}
        style={[styles.colorBox, { backgroundColor: colorHex }]}
      >
        <View style={styles.colorBoxInner}>
          <Text style={[styles.colorText, { color: getTextColor(colorHex) }]}>
            {color}
          </Text>
        </View>
      </View>
    );
  }

  // Animation style ที่ใช้กับ Animated.View
  const animationStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: slideAnim }]
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Modal เตือน */}
      <WarningModal 
        visible={warningVisible} 
        onClose={() => setWarningVisible(false)} 
        theme={theme} 
      />

      {/* Header */}
      <HomeHeader theme={theme} />

      {/* เนื้อหาหลัก */}
      <ScrollView
        style={styles.mainContent}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* แสดงวันที่เลือก */}
        <View style={[styles.selectedDayContainer, { backgroundColor: theme.cardBackground }]}>
          <MaterialCommunityIcons 
            name="calendar-star" 
            size={22} 
            color={theme.primaryColor} 
            style={styles.calendarIcon} 
          />
          <Text style={[styles.selectedDayTitle, { color: theme.textColor }]}>
            {t("SelectedDay")} : <Text style={styles.dayNameText}>{selectedDay}</Text>
          </Text>
        </View>
 
        {/* ปฏิทิน */}
        <View style={styles.calendarWrapper}>
          <ColorCalendar onSelectDay={handleDaySelect} />
        </View>

        {/* หัวข้อสีของวัน */}
        <View style={styles.colorHighlightContainer}>
          <Text style={[styles.highlightHeader, { color: theme.textColor }]}>
            <Ionicons name="sparkles" size={20} color={theme.primaryColor} /> {t(" Daily Color Forecast")}
          </Text>
          
          {/* Lucky Colors พร้อม Animation */}
          <Animated.View style={[{ marginBottom: 20 }, animationStyle]}>
            <View style={[styles.colorContainer, { backgroundColor: theme.cardBackground }]}>
              {/* หัวข้อสีมงคล */}
              <View style={styles.colorHeaderRow}>
                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                  {t("dailyLuckyColor")}
                </Text>
                <View style={styles.colorIndicator}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.indicatorText}>{t("lucky")}</Text>
                </View>
              </View>
              
              {/* แสดงสีมงคล */}
              <View style={styles.colorRow}>
                {luckyColors.length > 0 ? (
                  luckyColors.map(color => renderColorBox(color, true))
                ) : (
                  <Text style={[styles.noColorText, { color: theme.textColor }]}>
                    {t("noLuckyColors")}
                  </Text>
                )}
              </View>
              
              {/* ปุ่มดูเพิ่มเติม */}
              {luckyColors.length > 0 && (
                <TouchableOpacity 
                  style={styles.seeMoreContainer}
                  onPress={() => navigation.navigate("luckyColorBoost")}
                >
                  <Text style={[styles.seeMoreText, { color: theme.primaryColor }]}>
                    {t("See More")}
                  </Text>
                  <Ionicons name="chevron-forward" size={14} color={theme.primaryColor} />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>

          {/* Unlucky Colors พร้อม Animation (delay เล็กน้อย) */}
          <Animated.View style={[animationStyle]}>
            <View style={[styles.colorContainer, { backgroundColor: theme.cardBackground }]}>
              {/* หัวข้อสีอัปมงคล */}
              <View style={styles.colorHeaderRow}>
                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                  {t("Daily Unlucky Color")}
                </Text>
                <View style={[styles.colorIndicator, styles.unluckyIndicator]}>
                  <Ionicons name="alert-circle" size={16} color="#FF6B6B" />
                  <Text style={[styles.indicatorText, styles.unluckyText]}>{t("avoid")}</Text>
                </View>
              </View>
              
              {/* แสดงสีอัปมงคล */}
              <View style={styles.colorRow}>
                {unluckyColors.length > 0 ? (
                  unluckyColors.map(color => renderColorBox(color, false))
                ) : (
                  <Text style={[styles.noColorText, { color: theme.textColor }]}>
                    {t("noUnluckyColors")}
                  </Text>
                )}
              </View>
              
              {/* ปุ่มดูเพิ่มเติม */}
              {unluckyColors.length > 0 && (
                <TouchableOpacity 
                  style={styles.seeMoreContainer}
                  onPress={() => navigation.navigate("luckyColorBoost")}
                >
                  <Text style={[styles.seeMoreText, { color: theme.primaryColor }]}>
                    {t("See More")}
                  </Text>
                  <Ionicons name="chevron-forward" size={14} color={theme.primaryColor} />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// =============================================
// Styles
// =============================================
const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  calendarWrapper: {
    marginVertical: 10,
  },
  colorHighlightContainer: {
    marginTop: 1,
    marginBottom: 15,
  },
  
  // Selected Day Styles
  selectedDayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    marginHorizontal: 8,
    marginTop: 16,
    marginBottom: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    width: '95%',
    alignSelf: 'center',
  },
  calendarIcon: {
    marginRight: 10,
    opacity: 0.9,
  },
  selectedDayTitle: {
    fontSize: 17,
    fontFamily: 'Nunito-SemiBold',
  },
  dayNameText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 17,
    color: '#FF8C00',
  },
  
  // Section Header
  highlightHeader: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    marginVertical: 10,
    marginLeft: 10,
    opacity: 0.9,
  },
  
  // Color Section Styles
  colorContainer: {
    borderRadius: 16,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  
  // Icon Container
  colorHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: 'Nunito-Bold',
  },
  
  // Badge Styles
  colorIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  unluckyIndicator: {
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
  },
  indicatorText: {
    fontSize: 13,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFD700',
    marginLeft: 5,
  },
  unluckyText: {
    color: '#FF6B6B',
  },
  
  // Color Grid Styles
  colorRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 10,
  },
  colorBox: {
    width: 95,
    height: 95,
    margin: 8,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  colorBoxInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  colorText: {
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
  },
  noColorText: {
    fontFamily: 'Nunito-Italic',
    fontSize: 14,
    fontStyle: 'italic',
    opacity: 0.6,
    padding: 16,
  },
  
  // See More Styles
  seeMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  seeMoreText: {
    fontSize: 13,
    fontFamily: 'Nunito-SemiBold',
    marginRight: 3,
  },
}); 