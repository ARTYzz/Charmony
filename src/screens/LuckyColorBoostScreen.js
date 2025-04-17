import React from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import OtherHeader from "../components/OtherHeader";
import luckyColorData from "../data/luckyColors.json";
import colorData from "../data/color.json";
import { useSelectedDay } from "../context/SelectedDayContext";
import Animated, { FadeIn } from "react-native-reanimated";
import { getFontFamily } from "../utils/fontUtils";

export default function LuckyColorBoostScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { theme, themeMode } = useTheme();
  const { selectedDay } = useSelectedDay();

  const todayData = luckyColorData[selectedDay];
  const dayColorData = colorData[selectedDay] || { unlucky: [] };

  const sections = [
    { key: "career", title: t("luckySections.career"), icon: "briefcase", color: '#6A5ACD' },
    { key: "finance", title: t("luckySections.finance"), icon: "cash", color: '#2E8B57' },
    { key: "luck", title: t("luckySections.luck"), icon: "star", color: '#DAA520' },
    { key: "love", title: t("luckySections.love"), icon: "heart", color: '#DB7093' },
  ];
  
  // Color mapping for unlucky colors
  const COLOR_MAP = {
    Red: "#FF0000",
    Orange: "#FFA500",
    Gray: "#808080",
    Green: "#008000",
    "Light Blue": "#ADD8E6",
    Blue: "#0000FF",
    Yellow: "#FFFF00",
    White: "#FFFFFF",
    Purple: "#800080",
    Black: "#000000",
    Gold: "#FFD700",
    Pink: "#FFC0CB",
    Cream: "#FFF5E1",
    Brown: "#8B4513",
    "Navy Blue": "#000080",
    "Light Green": "#90EE90"
  };
  
  const getTextColor = (bgColor) => {
    if (!bgColor) return "black";
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#222222" : "#FFFFFF";
  };

  // Get appropriate font family based on language
  const regularFont = getFontFamily(language, 'regular');
  const mediumFont = getFontFamily(language, 'medium');
  const boldFont = getFontFamily(language, 'bold');

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <OtherHeader title={t("LuckyColorBoost")} theme={theme} />
      
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
            <Text style={styles.iconText}>✨</Text>
          </View>
        </View>
        <Text style={[
          styles.descriptionText,
          {
            color: themeMode === 'dark' ? '#C5C5C5' : theme.textSecondary,
            fontFamily: regularFont
          }
        ]}>
          {t("luckyColorDescription", "Discover your lucky colors for the day — each one enhancing different aspects of your life, while also being mindful of the unlucky colors to avoid.")}
        </Text>
      </Animated.View>
      
      <ScrollView
        style={[styles.mainContent, { backgroundColor: theme.backgroundColor }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.colorContainer}>
            {sections.map((section, index) => {
              const item = todayData[section.key] || [];
              return (
                <Animated.View 
                  key={section.key} 
                  style={styles.sectionContainer}
                  entering={FadeIn.duration(400).delay(index * 100)}
                >
                  <View style={styles.sectionHeader}>
                    <View style={[
                      styles.sectionIconContainer,
                      { backgroundColor: section.color }
                    ]}>
                      <Ionicons
                        name={section.icon}
                        size={18}
                        color="white"
                      />
                    </View>
                    
                    <Text style={[
                      styles.sectionTitle, 
                      { 
                        color: theme.textColor,
                        fontFamily: boldFont
                      }
                    ]}>
                      {section.title}
                    </Text>
                  </View>
                  
                  <View
                    style={[
                      styles.colorBoxContainer,
                      { 
                        backgroundColor: theme.cardBackground,
                        borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)'
                      },
                    ]}
                  >
                    {item.length > 0 ? (
                      <View>
                        {Array.from({ length: Math.ceil(item.length / 3) }).map((_, rowIndex) => (
                          <View key={`row-${rowIndex}`} style={styles.colorBoxesWrapper}>
                            {item.slice(rowIndex * 3, rowIndex * 3 + 3).map((colorItem, idx) => (
                              <View
                                key={idx}
                                style={[
                                  styles.colorBox,
                                  { 
                                    backgroundColor: colorItem.color,
                                    borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                                  },
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.colorText,
                                    { 
                                      color: getTextColor(colorItem.color),
                                      fontFamily: "Nunito-Bold"
                                    }
                                  ]}
                                >
                                  {t(`colors.${colorItem.name}`, colorItem.name)}
                                </Text>
                              </View>
                            ))}
                          </View>
                        ))}
                      </View>
                    ) : (
                      <Text style={[
                        styles.noColorText, 
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
              );
            })}
          </View>
          
          {/* Divider between lucky and unlucky sections */}
          <View style={styles.dividerContainer}>
            <View style={[
              styles.divider,
              { backgroundColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
            ]} />
          </View>
          
          {/* Unlucky Colors Section with more emphasis */}
          {dayColorData.unlucky && dayColorData.unlucky.length > 0 && (
            <Animated.View 
              style={styles.avoidSectionContainer}
              entering={FadeIn.duration(400).delay(450)}
            >
              <View style={styles.sectionHeader}>
                <View style={[
                  styles.sectionIconContainer,
                  { backgroundColor: '#E74C3C' }
                ]}>
                  <Ionicons
                    name="close-circle"
                    size={18}
                    color="white"
                  />
                </View>
                
                <Text style={[
                  styles.sectionTitle, 
                  { 
                    color: theme.textColor,
                    fontFamily: boldFont
                  }
                ]}>
                  {t("unluckyColors", "Colors to Avoid")}
                </Text>
              </View>
              
              <View
                style={[
                  styles.avoidColorBoxContainer,
                  { 
                    backgroundColor: theme.cardBackground,
                    borderColor: '#E74C3C',
                    borderWidth: themeMode === 'dark' ? 1 : 2,
                    borderStyle: 'dashed'
                  },
                ]}
              >
                <View>
                  {Array.from({ length: Math.ceil(dayColorData.unlucky.length / 3) }).map((_, rowIndex) => (
                    <View key={`row-${rowIndex}`} style={styles.colorBoxesWrapper}>
                      {dayColorData.unlucky.slice(rowIndex * 3, rowIndex * 3 + 3).map((colorName, idx) => (
                        <View
                          key={idx}
                          style={[
                            styles.avoidColorBox,
                            { 
                              backgroundColor: COLOR_MAP[colorName] || "#D3D3D3",
                              borderColor: '#E74C3C'
                            },
                          ]}
                        >
                          <View style={styles.colorNameContainer}>
                            <Ionicons
                              name="close-circle"
                              size={14}
                              color={getTextColor(COLOR_MAP[colorName]) === '#FFFFFF' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)'}
                              style={styles.avoidIcon}
                            />
                            <Text
                              style={[
                                styles.colorText,
                                { 
                                  color: getTextColor(COLOR_MAP[colorName]),
                                  fontFamily: "Nunito-Bold"
                                }
                              ]}
                            >
                              {t(`colors.${colorName}`, colorName)}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            </Animated.View>
          )}
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
    paddingTop: 12,
    paddingBottom: 16,
    borderRadius: 14,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
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
    fontSize: 14.5,
    textAlign: 'center',
    lineHeight: 22
  },
  mainContent: { 
    flex: 1
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 40
  },
  contentContainer: {
    paddingHorizontal: 16
  },
  colorContainer: {
    marginBottom: 5
  },
  sectionContainer: {
    marginBottom: 20
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 4
  },
  sectionIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600'
  },
  colorBoxContainer: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1
  },
  colorBoxesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
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
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    padding: 8
  },
  dividerContainer: {
    alignItems: 'center',
    marginVertical: 15,
    paddingVertical: 5
  },
  divider: {
    height: 1,
    width: '80%'
  },
  avoidSectionContainer: {
    marginBottom: 20,
    marginTop: 5
  },
  avoidColorBoxContainer: {
    borderRadius: 12,
    marginBottom: 40,
    padding: 14
    
  },
  avoidColorBox: {
    flex: 1,
    height: 65,
    borderRadius: 10,
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2
  },
  colorNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avoidIcon: {
    marginRight: 5
  }
});
