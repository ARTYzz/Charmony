import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Ensure this is imported
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import "./screens/lan/i18n";
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

  if (loading) return null;

  return (
    <LanguageProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              switch (route.name) {
                case t("home"):
                  iconName = "home";
                  break;
                case t("matchColor"):
                  iconName = "shirt"; // 👕 Correct icon for "Match Color"
                  break;
                case t("luckyColorBoost"):
                  iconName = "sparkles"; // ✨ Icon for lucky color boost
                  break;
                case t("detailColor"):
                  iconName = "color-palette"; // 🎨 Correct icon
                  break;
                case t("settings"):
                  iconName = "settings"; // ⚙️ Settings icon
                  break;
                default:
                  iconName = "help-circle"; // ❓ Default icon
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarStyle: {
              backgroundColor: "#f8f9fa",
              paddingBottom: 5,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "bold",
            },
            tabBarActiveTintColor: "#5B3E90",
            tabBarInactiveTintColor: "gray",
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
