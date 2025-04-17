import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View, Text } from "react-native";

// Import i18n config
import "./src/i18n/i18n";

// Import contexts
import { LanguageProvider } from "./src/context/LanguageContext";
import { ThemeProvider } from "./src/context/ThemeContext";

// Import MainNavigator
import MainNavigator from "./src/navigation/MainNavigator";
import { SelectedDayProvider } from "./src/context/SelectedDayContext";

// Notification-related
import * as Notifications from "expo-notifications";
import { scheduleDailyLuckyColorNotification } from "./src/utils/notificationScheduler";
import luckyColorData from "./src/data/color.json";

// ✅ Handle foreground notifications (must have for Expo Go)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize app
    const initApp = async () => {
      setTimeout(() => setLoading(false), 500);
    };
    initApp();
  }, []);

  useEffect(() => {
    scheduleDailyLuckyColorNotification(luckyColorData);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SelectedDayProvider>
          {/* ✅ must wrap your app here */}
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </SelectedDayProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
