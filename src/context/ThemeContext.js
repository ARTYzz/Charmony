// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "react-native";

// Available themes
export const themes = {
  light: {
    name: "light",
    backgroundColor: "#FFFFFF",
    textColor: "#333333",
    primaryColor: "#6845A3", // Purple
    secondaryColor: "#f8f9fa",
    accentColor: "#FF6B6B",
    cardBackground: "#FFFFFF",
    cardShadow: "#DDDDDD",
    tabBarBackground: "#6845A3",
    headerBackground: "#6845A3",
    dividerColor: "#EEEEEE",
    buttonBackground: "#6845A3",
    buttonText: "#FFFFFF",
    inputBackground: "#F5F5F5",
    inputBorder: "#E0E0E0",
    inputText: "#333333",
    statusBarStyle: "dark-content",
    navigationBarColor: "#FFFFFF",
  },
  dark: {
    name: "dark",
    backgroundColor: "#121212",
    textColor: "#FFFFFF",
    primaryColor: "#9370DB", // Light Purple
    secondaryColor: "#2D2252", // Dark Purple
    accentColor: "#FF6B6B",
    cardBackground: "#1E1E1E",
    cardShadow: "#000000",
    tabBarBackground: "#2D2252",
    headerBackground: "#2D2252",
    dividerColor: "#333333",
    buttonBackground: "#9370DB",
    buttonText: "#FFFFFF",
    inputBackground: "#2A2A2A",
    inputBorder: "#444444",
    inputText: "#FFFFFF",
    statusBarStyle: "light-content",
    navigationBarColor: "#121212",
  },
};

// Create a Theme Context
const ThemeContext = createContext();

// Custom hook to use Theme Context
export function useTheme() {
  return useContext(ThemeContext);
}

// Theme Provider
export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState("light");
  const [theme, setTheme] = useState(themes.light);

  // Change theme function
  const changeTheme = async (newThemeMode) => {
    try {
      // Update theme state
      const newTheme = themes[newThemeMode] || themes.light;
      setThemeMode(newThemeMode);
      setTheme(newTheme);
      
      // Update StatusBar style
      StatusBar.setBarStyle(newTheme.statusBarStyle);
      
      // Save to AsyncStorage
      await AsyncStorage.setItem("appTheme", newThemeMode);
    } catch (error) {
      console.error("Failed to change theme:", error);
    }
  };

  // Load saved theme on mount
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("appTheme");
        if (savedTheme && savedTheme !== themeMode) {
          changeTheme(savedTheme);
        } else {
          // Set default StatusBar style
          StatusBar.setBarStyle(theme.statusBarStyle);
        }
      } catch (error) {
        console.error("Failed to load saved theme:", error);
      }
    };
    
    loadSavedTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeMode, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
} 