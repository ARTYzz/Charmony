import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const resources = {
  en: {
    translation: {
      // Inside both `en.translation` and `th.translation`
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
        "Navy Blue":"Navy Blue",
        "Light Green": "Light Green",
      },
      colorDescriptions: {
        Red: "Represents power, passion, love, courage, and confidence. In some cultures like China, red symbolizes luck and celebration.",
        Pink: "Symbolizes gentleness, romance, and innocence. It often evokes feelings of nurturing and comfort.",
        White: "Stands for purity, cleanliness, simplicity, and new beginnings.",
        Gray: "Represents neutrality, calmness, stability, and sophistication.",
        Black: "Represents mystery, authority, elegance, and sometimes grief.",
        Green: "Symbolizes nature, freshness, balance, and growth.",
        "Light Green" : "Associated with softness, youthfulness, and new beginnings.",
        Gold: "Represents wealth, luxury, and prestige.",
        Orange: "Symbolizes fun, enthusiasm, creativity, and energy.",
        Yellow: "Associated with happiness, brightness, positivity, and intellect.",
        Cream: "Represents warmth, calmness, and simplicity.",
        Brown: "Symbolizes stability, nature, and reliability.",
        Blue: "Represents calmness, confidence, intelligence, and trust.",
        "Light Blue": "Symbolizes lightness, relaxation, and openness.",
        "Navy Blue": "Associated with depth, authority, and reliability.",
        Purple: "Symbolizes mystery, creativity, luxury, and spirituality.",
      },
      

      // Navigation
      home: "Home",
      matchColor: "Match Color",
      "Match Color": "Match Color",
      luckyColorBoost: "Lucky Color",
      "LuckyColorBoost": "Lucky Color",
      detailColor: "Color Detail",
      colorDetails: "Color Details",
      "Color Details": "Color Details",
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
      TodayLuckyColor: "Today Lucky Color",
      TodayUnluckyColor:"Today Unlucky Color",
      SeeMore:"See More",
      "SelectedDay": "Selected Day",
      
      // วันในสัปดาห์
      "Sunday": "Sunday",
      "Monday": "Monday",
      "Tuesday": "Tuesday",
      "Wednesday": "Wednesday",
      "Thursday": "Thursday",
      "Friday": "Friday",
      "Saturday": "Saturday",

      // Match color screen
      findYourMatch: "Find Your Match",
      selectColor: "Select Color",
      match: "Match",
      results: "Results",

      look: {
        confident: "Look 1: Confident",
        health: "Look 2: Health",
        creative: "Look 3: Creative",
        charm: "Look 4: Charm"
      },

      // Lucky color screen
      boostYourLuck: "Boost Your Luck",
      dailyLuckyColor: "Daily Lucky Color",
      weeklyForecast: "Weekly Forecast",
      luckySections: {
        career: "Career",
        finance: "Finance & Wealth",
        luck: "Luck & Fortune",
        love: "Charm & Relationships"
      },
      

      // Detail screen
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
      // Thai
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
        "Light Blue": "สีฟ้า",
        "Navy Blue":"สีน้ำเงินเข้ม",
        "Light Green": "สีเขียวอ่อน",
        "Hot Pink" : "สีชมพูอัมพฤกษ์",
        "Light Pink" : "สีชมพูอ่อน",
        "Deep Purple" : "สีม่วงเข้ม",
        "Baby Pink" : "สีชมพูอ่อน"
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
        Orange:"หมายถึง ความสนุก ความกระตือรือร้น ความคิดสร้างสรรค์ และพลังงาน",
        Yellow: "เกี่ยวข้องกับความสุข ความสดใส ความคิดบวก และสติปัญญา",
        Cream: "เป็นสัญลักษณ์ของความอบอุ่น ความสงบ และความเรียบง่าย",
        Brown: "เป็นตัวแทนของความมั่นคง ธรรมชาติ และความน่าเชื่อถือ",
        Blue: "เป็นสัญลักษณ์ของความสงบ ความมั่นใจ สติปัญญา และความไว้วางใจ",
        "Light Blue": "หมายถึง ความเบา ความผ่อนคลาย และความเปิดเผย",
        "Navy Blue": "เชื่อมโยงกับความลึก อำนาจ และความน่าเชื่อถือ",
        Purple: "เป็นสัญลักษณ์ของความลึกลับ ความคิดสร้างสรรค์ ความหรูหรา และจิตวิญญาณ",
      },

      // Navigation
      home: "หน้าหลัก",
      matchColor: "จับคู่สี",
      "Match Color": "จับคู่สี",
      luckyColorBoost: "สีมงคล",
      "LuckyColorBoost": "สีมงคล",
      detailColor: "รายละเอียดสี",
      colorDetails: "รายละเอียดสี",
      "Color Details": "รายละเอียดสี",
      settings: "การตั้งค่า",

      // Settings screen
      language: "ภาษา",
      theme: "ธีมสี",
      notifications : "การแจ้งเตือน",
      notification : "การแจ้งเตือน",
      english: "อังกฤษ",
      thai: "ไทย",
      cancel: "ยกเลิก",
      light: "สว่าง",
      dark: "มืด",
      appearance: "รูปแบบการแสดงผล",

      // Home screen
      welcome: "ยินดีต้อนรับ",
      discover: "ค้นพบสีของคุณ",
      personalizedColors: "สีที่เหมาะกับคุณ",
      DailyColorForecast: "ทำนายสีมงคลประจำวัน",
      viewAll: "ดูทั้งหมด",
      TodayLuckyColor: "สีมงคลประจำวัน",
      TodayUnluckyColor: "สีอัปมงคลประจำวัน",
      "See More":"ดูเพิ่มเติม",
      "SelectedDay": "วันที่เลือก",
      lucky : "โชคดี !",
      avoid : "หลีกเลี่ยง !",
      
      // วันในสัปดาห์
      "Sunday": "วันอาทิตย์",
      "Monday": "วันจันทร์",
      "Tuesday": "วันอังคาร",
      "Wednesday": "วันพุธ",
      "Thursday": "วันพฤหัสบดี",
      "Friday": "วันศุกร์",
      "Saturday": "วันเสาร์",

      // Match color screen
      findYourMatch: "ค้นหาสีที่เข้ากัน",
      selectColor: "เลือกสี",
      match: "จับคู่",
      results: "ผลลัพธ์",
      "matchColorHeader" : "จับคู่สีสำหรับการแต่งกาย  — เพื่อสร้างความสมดุลทั้งด้านอารมณ์และพลังชีวิต โดยอิงจากสีมงคลของวันนั้น ช่วยเสริมความมั่นใจและนำพาโชคดีในแบบที่เป็นคุณ",

      look: {
      confident: "ลุคที่ 1: มั่นใจ",
      health: "ลุคที่ 2: สุขภาพ",
      creative: "ลุคที่ 3: สร้างสรรค์",
      charm: "ลุคที่ 4: เสน่ห์"
      },
      

      // Lucky color screen
      "luckyColorDescription" : "ค้นพบสีมงคลประจำวัน — ที่ช่วยเสริมพลังในแต่ละด้านพร้อมกับระวัง สีอัปมงคล ที่ควรหลีกเลี่ยง",
      boostYourLuck: "เสริมดวงด้วยสี",
      dailyLuckyColor: "สีมงคลประจำวัน",
      weeklyForecast: "พยากรณ์รายสัปดาห์",
      "unluckyColors" : "สีที่ควรหลีกเลี่ยง",
      luckySections: {
      career: "การงาน",
      finance: "การเงินและความมั่งคั่ง",
      luck: "โชคลาภ",
      love: "เสน่ห์และความรัก",
      },
      

      // Detail screen
      meaning: "ความหมาย",
      harmonies: "ความกลมกลืน",
      usage: "การใช้งาน",
      "colorMeaningHeader" : "ทำความเข้าใจความหมายของสีแต่ละสี — ไม่ใช่แค่ในแง่ความโชคดี แต่รวมถึงอารมณ์ความรู้สึกและพลังที่แฝงอยู่ในแต่ละเฉดสี",

      // Common
      save: "บันทึก",
      reset: "รีเซ็ต",
      apply: "นำไปใช้",
      loading: "กำลังโหลด",
      "Today" : "วันนี้",
      'symbolism' : "ความหมาย",
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
