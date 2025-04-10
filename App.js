import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";

// Import i18n config
import "./src/i18n/i18n";

// Import contexts
import { LanguageProvider } from "./src/context/LanguageContext";
import { ThemeProvider } from "./src/context/ThemeContext"; 

// Import MainNavigator
import MainNavigator from "./src/navigation/MainNavigator";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize app
    const initApp = async () => {
      // Add small delay for better UI experience
      setTimeout(() => setLoading(false), 500);
    };
    initApp();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5B3E90" />
      </View>
    );
  }

  return (
    <LanguageProvider>
      <ThemeProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </LanguageProvider>
  );
}
