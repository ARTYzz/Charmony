// LanguageContext.js
import React, { createContext, useState, useContext } from "react";

// Create a Language Context
const LanguageContext = createContext();

// Custom hook to use Language Context
export function useLanguage() {
  return useContext(LanguageContext);
}

// Language Provider
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("English"); // Default to English

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
