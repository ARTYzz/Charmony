import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const resources = {
  en: {
    translation: {
      settings: "Settings",
      language: "Language",
      theme: "Color Theme",
      notification: "Notification",
      english: "English",
      thai: "Thai",
      cancel: "Cancel",
      light: "Light",
    },
  },
  th: {
    translation: {
      settings: "การตั้งค่า",
      language: "ภาษา",
      theme: "ธีมสี",
      notification: "การแจ้งเตือน",
      english: "อังกฤษ",
      thai: "ไทย",
      cancel: "ยกเลิก",
      light: "สว่าง",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
