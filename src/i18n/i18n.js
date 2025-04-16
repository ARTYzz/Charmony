import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const resources = {
  en: {
    translation: {// Inside both `en.translation` and `th.translation`
      colors: {
        Red: "Red",
        Blue: "Blue",
        Green: "Green",
        Yellow: "Yellow",
        Pink: "Pink",
        Purple: "Purple",
        Black: "Black",
        White: "White",
        Gray: "Gray",
        Orange: "Orange",
        Gold: "Gold",
        Cream: "Cream",
        Brown: "Brown",
        "Light Blue": "Light Blue",
        Peach: "Peach",
      },
      colorDescriptions: {
        Red: "Represents power, passion, love, courage, and confidence. In some cultures like China, red symbolizes luck and celebration.",
        Pink: "Symbolizes gentleness, romance, and innocence. It often evokes feelings of nurturing and comfort.",
        White: "Stands for purity, cleanliness, simplicity, and new beginnings.",
        Gray: "Represents neutrality, calmness, stability, and sophistication.",
        Black: "Represents mystery, authority, elegance, and sometimes grief.",
        Green: "Symbolizes nature, freshness, balance, and growth.",
        "Light Green": "Associated with softness, youthfulness, and new beginnings.",
        Gold: "Represents wealth, luxury, and prestige.",
        Orange: "Symbolizes fun, enthusiasm, creativity, and energy.",
        Yellow: "Associated with happiness, brightness, positivity, and intellect.",
        Cream: "Represents warmth, calmness, and simplicity.",
        Brown: "Symbolizes stability, nature, and reliability.",
        Blue: "Represents calmness, confidence, intelligence, and trust.",
        "Light Blue": "Symbolizes lightness, relaxation, and openness.",
        "Navy Blue": "Associated with depth, authority, and reliability.",
        Purple: "Symbolizes mystery, creativity, luxury, and spirituality."
      },
      

      
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
      DailyColorForecast: "Daily Color Forecast",
      viewAll: "View All",
      TodayUnluckyColor: "Today Unlucky Colors",
      TodayLuckyColor: "Today Lucky Colors",
      
      
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
    translation: {// Thai
      colors: {
        Red: "สีแดง",
        Blue: "สีน้ำเงิน",
        Green: "สีเขียว",
        Yellow: "สีเหลือง",
        Pink: "สีชมพู",
        Purple: "สีม่วง",
        Black: "สีดำ",
        White: "สีขาว",
        Gray: "สีเทา",
        Orange: "สีส้ม",
        Gold: "สีทอง",
        Cream: "สีครีม",
        Brown: "สีน้ำตาล",
        "Light Blue": "สีฟ้า"
      },
      colorDescriptions: {
        Red: "เป็นสัญลักษณ์ของพลัง ความหลงใหล ความรัก ความกล้าหาญ และความมั่นใจ สีแดงในบางวัฒนธรรม เช่น จีน หมายถึง ความโชคดีและการเฉลิมฉลอง",
        Pink: "เป็นสัญลักษณ์ของความอ่อนโยน ความโรแมนติก และความไร้เดียงสา มักกระตุ้นให้เกิดความรู้สึกของการเอาใจใส่และปลอบโยน",
        White: "หมายถึง ความบริสุทธิ์ ความสะอาด ความเรียบง่าย และการเริ่มต้นใหม่",
        Gray: "เป็นตัวแทนของความเป็นกลาง ความสงบ ความมั่นคง และความซับซ้อน",
        Black: "เป็นสัญลักษณ์ของความลึกลับ อำนาจ ความสง่างาม และบางครั้งหมายถึงความโศกเศร้า",
        Green: "เป็นตัวแทนของธรรมชาติ ความสดชื่น ความสมดุล และการเติบโต",
        "Light Green": "เชื่อมโยงกับความอ่อนโยน ความเยาว์วัย และการเริ่มต้นใหม่",
        Gold: "เป็นสัญลักษณ์ของความมั่งคั่ง ความหรูหรา และศักดิ์ศรี",
        Orange: "หมายถึง ความสนุก ความกระตือรือร้น ความคิดสร้างสรรค์ และพลังงาน",
        Yellow: "เกี่ยวข้องกับความสุข ความสดใส ความคิดบวก และสติปัญญา",
        Cream: "เป็นสัญลักษณ์ของความอบอุ่น ความสงบ และความเรียบง่าย",
        Brown: "เป็นตัวแทนของความมั่นคง ธรรมชาติ และความน่าเชื่อถือ",
        Blue: "เป็นสัญลักษณ์ของความสงบ ความมั่นใจ สติปัญญา และความไว้วางใจ",
        "Light Blue": "หมายถึง ความเบา ความผ่อนคลาย และความเปิดเผย",
        "Navy Blue": "เชื่อมโยงกับความลึก อำนาจ และความน่าเชื่อถือ",
        Purple: "เป็นสัญลักษณ์ของความลึกลับ ความคิดสร้างสรรค์ ความหรูหรา และจิตวิญญาณ"
      },

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
      personalizedColors: "สีที่เหมาะกับคุณ",
      DailyColorForecast: "ทำนายสีมงคลประจำวัน",
      viewAll: "ดูทั้งหมด",
      TodayUnluckyColor: "สีอัปมงคลประจำวัน",
      TodayLuckyColor: "สีมงคลประจำวันนี้",
      
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