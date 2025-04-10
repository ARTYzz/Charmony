// LanguageContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create a Language Context
const LanguageContext = createContext();

// Custom hook to use Language Context
export function useLanguage() {
  return useContext(LanguageContext);
}

// Language Provider
export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  // Change language function that updates both i18n and context
  const changeLanguage = async (newLanguage) => {
    try {
      // Update i18n language
      await i18n.changeLanguage(newLanguage);
      // Update context state
      setLanguage(newLanguage);
      // Save to AsyncStorage
      await AsyncStorage.setItem("appLanguage", newLanguage);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  // Load saved language on mount
  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("appLanguage");
        if (savedLanguage && savedLanguage !== language) {
          changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error("Failed to load saved language:", error);
      }
    };
    
    loadSavedLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
} 