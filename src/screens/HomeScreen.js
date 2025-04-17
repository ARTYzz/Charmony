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
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useSelectedDay } from "../context/SelectedDayContext";
// ต้องอัปเดต path ของ colorData เมื่อย้ายไฟล์ data
import colorData from "../data/color.json";
import HomeHeader from "../components/HomeHeader.js";
import WarningModal from "../components/WarningModal";
import ColorCalendar from "../components/ColorCalendar";

const { width } = Dimensions.get("window");

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
  const { selectedDay, setSelectedDay } = useSelectedDay();
  const [luckyColors, setLuckyColors] = useState([]);
  const [unluckyColors, setUnluckyColors] = useState([]);

  // Enhanced Animation states
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(40));
  const [scaleAnim] = useState(new Animated.Value(0.95));

  // =============================================
  // Helper Functions
  // =============================================

  // Function to determine text color based on background color brightness
  function getTextColor(hex) {
    if (!hex) return "#000";
    const rgb = parseInt(hex.substring(1), 16);
    const r = (rgb >> 16) & 255,
      g = (rgb >> 8) & 255,
      b = rgb & 255;
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000" : "#FFF";
  }

  // Function to get the current weekday (e.g., "Sunday")
  function getCurrentDay() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[new Date().getDay()];
  }

  // Handle day selection from calendar
  function handleDaySelect(dayName) {
    setSelectedDay(dayName);

    // Enhanced animation when changing day
    Animated.parallel([
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      // Slide down
      Animated.timing(slideAnim, {
        toValue: 60,
        duration: 200,
        useNativeDriver: true,
      }),
      // Scale down
      Animated.timing(scaleAnim, {
        toValue: 0.92,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After fade out and slide down, do fade in and slide up
      Animated.parallel([
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        // Slide up
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        // Scale up
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
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

  // Initial animation when screen loads
  useEffect(() => {
    // Staggered animation for initial load
    Animated.stagger(150, [
      // First animate the selected day container
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
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
            {t(`colors.${color}`)}
          </Text>
        </View>
      </View>
    );
  }

  // Animation style with improved effects
  const animationStyle = {
    opacity: fadeAnim,
    transform: [
      { translateY: slideAnim },
      { scale: scaleAnim }
    ],
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
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
        <Animated.View style={[animationStyle, { width: '100%' }]}>
          <View
            style={[
              styles.selectedDayContainer,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <MaterialCommunityIcons
              name="calendar-star"
              size={22}
              color={theme.primaryColor}
              style={styles.calendarIcon}
            />
            <Text style={[styles.selectedDayTitle, { color: theme.textColor }]}>
              {t("SelectedDay")} :{" "}
              <Text style={styles.dayNameText}>{t(selectedDay)}</Text>
            </Text>
          </View>
        </Animated.View>

        {/* ปฏิทิน */}
        <View style={styles.calendarWrapper}>
          <ColorCalendar onSelectDay={handleDaySelect} />
        </View>

        {/* หัวข้อสีของวัน */}
        <View style={styles.colorHighlightContainer}>
          <Text style={[styles.highlightHeader, { color: theme.textColor }]}>
            <Ionicons name="sparkles" size={20} color={theme.primaryColor} />{" "}
            {t("DailyColorForecast")}
          </Text>

          {/* Lucky Colors พร้อม Animation */}
          <Animated.View style={[{ marginBottom: 20 }, animationStyle]}>
            <View
              style={[
                styles.colorContainer,
                styles.luckyColorContainer,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              {/* หัวข้อสีมงคล */}
              <View style={styles.colorHeaderRow}>
                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                  {t("TodayLuckyColor")}
                </Text>
                <View style={styles.colorIndicator}>
                  <Ionicons name="star" size={18} color="#FFD700" />
                  <Text style={styles.indicatorText}>{t("lucky")}</Text>
                </View>
              </View>

              {/* แสดงสีมงคล */}
              <View style={styles.colorRow}>
                {luckyColors.length > 0 ? (
                  luckyColors.map((color) => renderColorBox(color, true))
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
                  onPress={() =>
                    navigation.navigate("luckyColorBoost", { day: selectedDay })
                  }
                >
                  <View style={styles.seeMoreButton}>
                    <Text
                      style={[styles.seeMoreText, { color: theme.primaryColor }]}
                    >
                      {t("See More")}
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color={theme.primaryColor}
                    />
                  </View>
                </TouchableOpacity>
              )}
              
              {/* Decorative elements */}
              <View style={[styles.decorCircle, styles.decorCircle1]} />
              <View style={[styles.decorCircle, styles.decorCircle2]} />
            </View>
          </Animated.View>

          {/* Unlucky Colors พร้อม Animation (delay เล็กน้อย) */}
          <Animated.View style={[animationStyle]}>
            <View
              style={[
                styles.colorContainer,
                styles.unluckyColorContainer,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              {/* หัวข้อสีอัปมงคล */}
              <View style={styles.colorHeaderRow}>
                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
                  {t("TodayUnluckyColor")}
                </Text>
                <View style={[styles.colorIndicator, styles.unluckyIndicator]}>
                  <Ionicons name="alert-circle" size={18} color="#FF6B6B" />
                  <Text style={[styles.indicatorText, styles.unluckyText]}>
                    {t("avoid")}
                  </Text>
                </View>
              </View>

              {/* แสดงสีอัปมงคล */}
              <View style={styles.colorRow}>
                {unluckyColors.length > 0 ? (
                  unluckyColors.map((color) => renderColorBox(color, false))
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
                  onPress={() =>
                    navigation.navigate("luckyColorBoost", { day: selectedDay })
                  }
                >
                  <View style={styles.seeMoreButton}>
                    <Text
                      style={[styles.seeMoreText, { color: theme.primaryColor }]}
                    >
                      {t("See More")}
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color={theme.primaryColor}
                    />
                  </View>
                </TouchableOpacity>
              )}
              
              {/* Decorative elements */}
              <View style={[styles.decorCircle, styles.decorCircle3]} />
              <View style={[styles.decorCircle, styles.decorCircle4]} />
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
    paddingHorizontal: 20,
  },
  calendarWrapper: {
    marginVertical: 15,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  colorHighlightContainer: {
    marginTop: 10,
    marginBottom: 20,
  },

  // Selected Day Styles
  selectedDayContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 18,
    marginHorizontal: 4,
    marginTop: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    width: "98%",
    alignSelf: "center",
  },
  calendarIcon: {
    marginRight: 12,
    opacity: 0.9,
  },
  selectedDayTitle: {
    fontSize: 17,
    fontFamily: "Nunito-SemiBold",
    letterSpacing: 0.3,
  },
  dayNameText: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    color: "#FF8C00",
  },

  // Section Header
  highlightHeader: {
    fontSize: 19,
    fontFamily: "Nunito-Bold",
    marginVertical: 14,
    marginLeft: 12,
    opacity: 0.9,
    letterSpacing: 0.5,
  },

  // Color Section Styles
  colorContainer: {
    borderRadius: 20,
    padding: 18,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)",
    position: 'relative',
    overflow: 'hidden',
  },
  luckyColorContainer: {
    borderLeftWidth: 4,
    borderLeftColor: "#FFD700",
  },
  unluckyColorContainer: {
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B6B",
  },

  // Icon Container
  colorHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Nunito-Bold",
    letterSpacing: 0.3,
  },

  // Badge Styles
  colorIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 215, 0, 0.18)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  unluckyIndicator: {
    backgroundColor: "rgba(255, 107, 107, 0.18)",
  },
  indicatorText: {
    fontSize: 13,
    fontFamily: "Nunito-Bold",
    color: "#FFD700",
    marginLeft: 5,
  },
  unluckyText: {
    color: "#FF6B6B",
  },

  // Color Grid Styles
  colorRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  colorBox: {
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  colorBoxInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  colorText: {
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Nunito-Bold",
    fontSize: 15,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  noColorText: {
    fontFamily: "Nunito-Italic",
    fontSize: 15,
    fontStyle: "italic",
    opacity: 0.7,
    padding: 20,
    textAlign: "center",
  },

  // See More Styles
  seeMoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  seeMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  seeMoreText: {
    fontSize: 14,
    fontFamily: "Nunito-Bold",
    marginRight: 4,
  },
  
  // Decorative elements
  decorCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.06,
  },
  decorCircle1: {
    backgroundColor: '#FFD700',
    top: -20,
    right: -20,
  },
  decorCircle2: {
    backgroundColor: '#FFD700',
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  decorCircle3: {
    backgroundColor: '#FF6B6B',
    top: -20,
    right: -20,
  },
  decorCircle4: {
    backgroundColor: '#FF6B6B',
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
