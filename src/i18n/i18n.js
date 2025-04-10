import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      matchColor: "Match Color",
      luckyColorBoost: "Lucky Color",
      detailColor: "Color Detail",
      settings: "Settings",
      
      // Settings screen
      language: "Language",
      theme: "Color Theme",
      notification: "Notification",
      english: "English",
      thai: "Thai",
      cancel: "Cancel",
      light: "Light",
      dark: "Dark",
      
      // Home screen
      welcome: "Welcome",
      discover: "Discover Your Color",
      todayColor: "Today's Color",
      personalizedColors: "Personalized Colors",
      viewAll: "View All",
      
      // Match color screen
      findYourMatch: "Find Your Match",
      selectColor: "Select Color",
      match: "Match",
      results: "Results",
      
      // Lucky color screen
      boostYourLuck: "Boost Your Luck",
      dailyLuckyColor: "Daily Lucky Color",
      weeklyForecast: "Weekly Forecast",
      
      // Detail screen
      colorDetails: "Color Details",
      meaning: "Meaning",
      harmonies: "Harmonies",
      usage: "Usage",
      
      // Common
      save: "Save",
      reset: "Reset",
      apply: "Apply",
      loading: "Loading",
    },
  },
  th: {
    translation: {
      // Navigation
      home: "หน้าหลัก",
      matchColor: "จับคู่สี",
      luckyColorBoost: "สีมงคล",
      detailColor: "รายละเอียดสี",
      settings: "การตั้งค่า",
      
      // Settings screen
      language: "ภาษา",
      theme: "ธีมสี",
      notification: "การแจ้งเตือน",
      english: "อังกฤษ",
      thai: "ไทย",
      cancel: "ยกเลิก",
      light: "สว่าง",
      dark: "มืด",
      
      // Home screen
      welcome: "ยินดีต้อนรับ",
      discover: "ค้นพบสีของคุณ",
      todayColor: "สีประจำวันนี้",
      personalizedColors: "สีที่เหมาะกับคุณ",
      viewAll: "ดูทั้งหมด",
      
      // Match color screen
      findYourMatch: "ค้นหาสีที่เข้ากัน",
      selectColor: "เลือกสี",
      match: "จับคู่",
      results: "ผลลัพธ์",
      
      // Lucky color screen
      boostYourLuck: "เสริมดวงด้วยสี",
      dailyLuckyColor: "สีมงคลประจำวัน",
      weeklyForecast: "พยากรณ์รายสัปดาห์",
      
      // Detail screen
      colorDetails: "รายละเอียดสี",
      meaning: "ความหมาย",
      harmonies: "ความกลมกลืน",
      usage: "การใช้งาน",
      
      // Common
      save: "บันทึก",
      reset: "รีเซ็ต",
      apply: "นำไปใช้",
      loading: "กำลังโหลด",
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