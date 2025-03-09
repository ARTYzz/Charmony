import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import "./screens/lan/i18n"; // Import i18n configuration
import HomeScreen from "./screens/HomeScreen";
import MatchColorScreen from "./screens/MatchColorScreen";
import LuckyColorBoostScreen from "./screens/LuckyColorBoostScreen";
import DetailColorScreen from "./screens/Detail";
import SettingsScreen from "./screens/Settings";
import { LanguageProvider } from "./screens/context/LanguageContext";

const Tab = createBottomTabNavigator();

export default function App() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("appLanguage");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
      setLoading(false);
    };
    loadLanguage();
  }, []);

  if (loading) return null; // Prevent rendering before language is loaded

  return (
    <LanguageProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              switch (route.name) {
                case "Home":
                  iconName = "home";
                  break;
                case "MatchColor":
                  iconName = "color-palette";
                  break;
                case "LuckyColorBoost":
                  iconName = "star";
                  break;
                case "DetailColor":
                  iconName = "eye";
                  break;
                case "Settings":
                  iconName = "settings";
                  break;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name={t("home")} component={HomeScreen} />
          <Tab.Screen name={t("matchColor")} component={MatchColorScreen} />
          <Tab.Screen
            name={t("luckyColorBoost")}
            component={LuckyColorBoostScreen}
          />
          <Tab.Screen name={t("detailColor")} component={DetailColorScreen} />
          <Tab.Screen name={t("settings")} component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}
