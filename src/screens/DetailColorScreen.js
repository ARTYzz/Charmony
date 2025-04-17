import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  FlatList,
  StyleSheet, 
  SafeAreaView, 
  Dimensions
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import OtherHeader from "../components/OtherHeader";
import { getFontFamily } from "../utils/fontUtils";
import Animated, { FadeIn } from "react-native-reanimated";

// Import local JSON
import colorData from "../data/colorDetails.json";

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.92;

export default function DetailColorScreen() {
  const { t } = useTranslation();
  const { theme, themeMode } = useTheme();
  const { language } = useLanguage();
  const [colors, setColors] = useState([]);

  // Get appropriate fonts based on language
  const regularFont = getFontFamily(language, 'regular'); 
  const boldFont = getFontFamily(language, 'bold');
  const mediumFont = getFontFamily(language, 'medium');

  useEffect(() => {
    setColors(colorData); // Load data from JSON
  }, []);

  // Helper to get suitable text color based on background
  const getTextColor = (bgColor) => {
    if (!bgColor) return "black";
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#222222" : "#FFFFFF";
  };

  const renderColorItem = ({ item }) => (
    <View style={[
      styles.colorCard, 
      { 
        backgroundColor: theme.cardBackground,
        shadowColor: themeMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.15)',
        shadowOpacity: themeMode === 'dark' ? 0.1 : 0.15,
        borderWidth: themeMode === 'dark' ? 0 : 1,
        borderColor: themeMode === 'dark' ? 'transparent' : 'rgba(0,0,0,0.08)'
      }
    ]}>
      <View style={styles.colorPreviewContainer}>
        <View style={[
          styles.colorCircle,
          { 
            backgroundColor: item.color,
            borderWidth: 1,
            borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
          }
        ]} />
        
        <View style={styles.colorTextContainer}>
          <Text style={[
            styles.colorName, 
            { 
              color: themeMode === 'dark' ? '#DADADA' : theme.textColor,
              fontFamily: boldFont
            }
          ]}>
            {t(`colors.${item.name}`, item.name)}
          </Text>
          <Text style={[
            styles.hexCode, 
            { 
              color: themeMode === 'dark' ? '#B0B0B0' : theme.textSecondary,
              fontFamily: regularFont
            }
          ]}>
            {item.color}
          </Text>
        </View>
      </View>
      
      <View style={[
        styles.colorBar,
        { backgroundColor: item.color }
      ]} />
      
      <View style={styles.descriptionContainer}>
        <View style={styles.symbolismHeader}>
          <Text style={[
            styles.symbolIcon,
            { color: item.color }
          ]}>
            ✧
          </Text>
          <Text style={[
            styles.descriptionTitle, 
            { 
              color: themeMode === 'dark' ? '#DADADA' : theme.textColor,
              fontFamily: mediumFont
            }
          ]}>
            {t('symbolism', 'Symbolism')}
          </Text>
          <Text style={[
            styles.symbolIcon,
            { color: item.color }
          ]}>
            ✧
          </Text>
        </View>
        
        <View style={styles.symbolismContentContainer}>
          <View style={[
            styles.symbolismDivider,
            { backgroundColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)' }
          ]} />
          
          <View style={[
            styles.descriptionWrapper,
            { 
              backgroundColor: themeMode === 'dark' 
                ? 'rgba(255,255,255,0.03)' 
                : `${item.color}05`,
              borderColor: themeMode === 'dark'
                ? 'rgba(255,255,255,0.08)'
                : `${item.color}20`
            }
          ]}>
            <Text style={[
              styles.description, 
              { 
                color: themeMode === 'dark' ? '#B8B8B8' : theme.textColor,
                fontFamily: regularFont
              }
            ]}>
              {t(`colorDescriptions.${item.name}`, item.description)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <OtherHeader title={t("Color Details")} theme={theme} />
      
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
            <Text style={styles.iconText}>🎨</Text>
          </View>
        </View>
        <Text style={[
          styles.descriptionText,
          {
            color: themeMode === 'dark' ? '#C5C5C5' : theme.textSecondary,
            fontFamily: regularFont
          }
        ]}>
          {t("colorMeaningHeader", "Understand the meaning behind each color — not just in terms of luck, but also the emotions, feelings, and energy each shade conveys.")}
        </Text>
      </Animated.View>
      
      <FlatList
        data={colors}
        renderItem={renderColorItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  listContent: { 
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 100
  },
  colorCard: {
    width: CARD_WIDTH,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    alignSelf: 'center'
  },
  colorPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 18
  },
  colorCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 16
  },
  colorTextContainer: {
    flex: 1
  },
  colorName: {
    fontSize: 18,
    fontWeight: "700",
  },
  hexCode: {
    fontSize: 14,
    marginTop: 2,
    opacity: 0.7
  },
  colorBar: {
    height: 3,
    width: '100%'
  },
  descriptionContainer: {
    padding: 16,
    paddingTop: 16,
    paddingBottom: 18
  },
  symbolismHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  symbolIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "600"
  },
  symbolismContentContainer: {
    borderRadius: 12,
    overflow: 'hidden'
  },
  symbolismDivider: {
    height: 1,
    width: '100%',
    marginBottom: 12
  },
  descriptionWrapper: {
    borderRadius: 12,
    padding: 16,
    paddingTop: 15,
    paddingBottom: 18,
    borderWidth: 1,
    marginTop: 4
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "left"
  }
});
