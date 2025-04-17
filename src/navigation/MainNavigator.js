import React from "react";
import { Text, View, Platform, Dimensions, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { BlurView } from "expo-blur";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useSelectedDay } from "../context/SelectedDayContext";
import { getFontFamily } from "../utils/fontUtils";

import HomeScreen from "../screens/HomeScreen";
import MatchColorScreen from "../screens/MatchColorScreen";
import LuckyColorBoostScreen from "../screens/LuckyColorBoostScreen";
import DetailColorScreen from "../screens/DetailColorScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

// Custom tab label component that will re-render when language changes
function TabLabel({ labelKey, focused }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  // Get appropriate font based on language and focus state
  const fontFamily = getFontFamily(language, focused ? 'bold' : 'regular');
  
  return (
    <Text 
      style={{ 
        fontSize: 10, 
        fontWeight: focused ? "bold" : "normal", 
        color: focused ? theme.name === "dark" ? "#FFFFFF" : "#FFFFFF" : theme.name === "dark" ? "#A68ECC" : "#D7C3FF",
        marginTop: 2,
        fontFamily: fontFamily,
      }}
    >
      {t(labelKey)}
    </Text>
  );
}

// Custom tab icon with indicator
function TabIcon({ iconName, color, size, focused }) {
  const { theme } = useTheme();
  
  return (
    <View style={styles.iconContainer}>
      <Ionicons name={iconName} size={focused ? size + 3 : size} color={color} />
    </View>
  );
}

function MainNavigator() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { theme, themeMode } = useTheme();
  const { selectedDay } = useSelectedDay();
  
  // Set theme-specific colors
  const tabBarBgColor = themeMode === "dark" ? "#2D2252" : "#6845A3";
  const tabBarBorderColor = themeMode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.15)";
  const activeColor = "#FFFFFF";
  const inactiveColor = themeMode === "dark" ? "#A68ECC" : "#D7C3FF";
  
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          switch (route.name) {
            case "home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "matchColor":
              iconName = focused ? "shirt" : "shirt-outline"; 
              break;
            case "luckyColorBoost":
              iconName = focused ? "sparkles" : "sparkles-outline"; 
              break;
            case "detailColor":
              iconName = focused ? "color-palette" : "color-palette-outline"; 
              break;
            case "settings":
              iconName = focused ? "settings" : "settings-outline"; 
              break;
            default:
              iconName = "help-circle"; 
          }
          return <TabIcon iconName={iconName} color={color} size={size} focused={focused} />;
        },
        tabBarStyle: {
          backgroundColor: tabBarBgColor,
          height: 65,
          borderTopWidth: 0,
          borderRadius: 25,
          marginHorizontal: 20,
          marginBottom: 15,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
          paddingTop: 8,
          paddingBottom: 10,
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          borderWidth: 1.5,
          borderColor: tabBarBorderColor,
        },
        tabBarItemStyle: {
          paddingTop: 2,
        },
        tabBarLabelStyle: {
          fontFamily: 'Nunito-Regular',
          fontSize: 13,
          marginTop: 3,
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
      })}
    >
      <Tab.Screen 
        name="matchColor" 
        component={MatchColorScreen}
        key={`matchColor-${selectedDay}`}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => <TabLabel labelKey="matchColor" focused={focused} />,
        }}
      />
      <Tab.Screen 
        name="luckyColorBoost" 
        component={LuckyColorBoostScreen}
        key={`luckyColorBoost-${selectedDay}`}
        options={{ 
          headerShown: false,
          tabBarLabel: ({ focused }) => <TabLabel labelKey="luckyColorBoost" focused={focused} />,
        }}
      />
      <Tab.Screen 
        name="home" 
        component={HomeScreen}
        options={{ 
          headerShown: false,
          tabBarLabel: ({ focused }) => <TabLabel labelKey="home" focused={focused} />,
        }}
      />
      <Tab.Screen 
        name="detailColor" 
        component={DetailColorScreen}
        options={{ 
          headerShown: false,
          tabBarLabel: ({ focused }) => <TabLabel labelKey="detailColor" focused={focused} />,
        }}
      />
      <Tab.Screen 
        name="settings" 
        component={SettingsScreen}
        options={{ 
          headerShown: false,
          tabBarLabel: ({ focused }) => <TabLabel labelKey="settings" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  }
});

export default MainNavigator; 