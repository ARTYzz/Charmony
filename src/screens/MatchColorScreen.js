import React from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import OtherHeader from "../components/OtherHeader";
import matchColors from "../data/matchColors.json";
import { useSelectedDay } from "../context/SelectedDayContext";
import Animated, { FadeIn } from "react-native-reanimated";
import { getFontFamily } from "../utils/fontUtils";

export default function MatchColorScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { theme, themeMode } = useTheme();
  const { selectedDay } = useSelectedDay();

  const todayLooks = matchColors[selectedDay] || {};

  // Get appropriate font family based on language
  const regularFont = getFontFamily(language, 'regular');
  const mediumFont = getFontFamily(language, 'medium');
  const boldFont = getFontFamily(language, 'bold');

  // Colors for different looks
  const lookOptions = [
    { 
      key: "confident", 
      color: "#E67E22",
      data: todayLooks.Confident || { colors: [], names: [] }
    },
    { 
      key: "health", 
      color: "#2ECC71",
      data: todayLooks.Health || { colors: [], names: [] }
    },
    { 
      key: "creative", 
      color: "#9B59B6",
      data: todayLooks.Creative || { colors: [], names: [] }
    },
    { 
      key: "charm", 
      color: "#E74C3C",
      data: todayLooks.Charm || { colors: [], names: [] }
    },
  ];

  // Helper to get suitable text color based on background
  const getTextColor = (bgColor) => {
    if (!bgColor) return "#000000";
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#222222" : "#FFFFFF";
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <OtherHeader title={t("Match Color")} theme={theme} />
      
      <Animated.View 
        style={[
          styles.headerDescription,
          { 
            backgroundColor: themeMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(106, 76, 147, 0.04)',
            borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(106, 76, 147, 0.1)'
          }
        ]}
        entering={FadeIn.duration(600)}
      >
        <View style={styles.headerIconContainer}>
          <View style={[
            styles.iconCircle,
            { 
              backgroundColor: themeMode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(106, 76, 147, 0.12)',
              borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(106, 76, 147, 0.2)'
            }
          ]}>
            <Text style={styles.iconText}>👕</Text>
          </View>
        </View>
        <Text style={[
          styles.descriptionText,
          {
            color: themeMode === 'dark' ? '#C5C5C5' : theme.textSecondary,
            fontFamily: regularFont
          }
        ]}>
          {t("matchColorHeader", "Dress with harmony — align your outfit with lucky colors to boost energy, balance emotions, and bring luck your way.")}
        </Text>
      </Animated.View>
      
      <ScrollView
        style={[styles.mainContent, { backgroundColor: theme.backgroundColor }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.looksContainer}>
            {lookOptions.map((look, index) => (
              <Animated.View 
                key={look.key} 
                style={styles.lookSection}
                entering={FadeIn.duration(400).delay(index * 100)}
              >
                <View style={[
                  styles.lookHeader,
                  { borderColor: look.color }
                ]}>
                  <Text style={[
                    styles.lookTitle, 
                    { 
                      color: theme.textColor,
                      fontFamily: boldFont,
                      borderLeftColor: look.color
                    }
                  ]}>
                    {t(`look.${look.key}`)}
                  </Text>
                </View>
                
                <View style={[
                  styles.colorCombinationContainer,
                  { 
                    backgroundColor: theme.cardBackground,
                    borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)'
                  }
                ]}>
                  {look.data.colors && look.data.colors.length > 0 ? (
                    <View style={styles.colorsRow}>
                      {look.data.colors.map((color, idx) => (
                        <View 
                          key={idx} 
                          style={[
                            styles.colorBox, 
                            {
                              backgroundColor: color,
                              borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                            }
                          ]}
                        >
                          <Text 
                            style={[
                              styles.colorName, 
                              { 
                                color: getTextColor(color),
                                fontFamily: "Nunito-Bold"
                              }
                            ]}
                          >
                            {t(`colors.${look.data.names[idx]}`, look.data.names[idx])}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <Text style={[
                      styles.noColorsText,
                      {
                        color: theme.textSecondary,
                        fontFamily: regularFont
                      }
                    ]}>
                      {t("noColorsAvailable", "No colors available for this day")}
                    </Text>
                  )}
                </View>
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  headerDescription: {
    margin: 15,
    marginTop: 10,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  headerIconContainer: {
    alignItems: 'center',
    marginBottom: 7,
    marginTop: 10,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  iconText: {
    fontSize: 22,
  },
  descriptionText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20
  },
  mainContent: { 
    flex: 1
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 40
  },
  contentContainer: {
    paddingHorizontal: 16,
    marginBottom: 20
  },
  looksContainer: {
    marginBottom: 20
  },
  lookSection: {
    marginBottom: 20
  },
  lookHeader: {
    marginBottom: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent'
  },
  lookTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 3,
    borderLeftWidth: 3,
    paddingLeft: 8
  },
  colorCombinationContainer: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1
  },
  colorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  colorBox: {
    flex: 1,
    height: 65,
    borderRadius: 10,
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  colorName: {
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Nunito-Bold",
    fontSize: 15,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  noColorsText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    padding: 8
  }
});
