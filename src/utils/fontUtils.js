/**
 * Utility functions for font selection based on language
 */

/**
 * Determines the appropriate font family based on language and weight
 * @param {string} language - The current language (e.g., 'en', 'th')
 * @param {string} weight - Font weight ('regular', 'bold', 'light')
 * @returns {string} The font family name to use
 */
export const getFontFamily = (language, weight = 'regular') => {
  // Thai language uses NotoSansThai fonts
  if (language === 'th') {
    switch(weight) {
      case 'bold':
        return 'NotoSansThai-Bold';
      case 'light':
        return 'NotoSansThai-Light';
      default:
        return 'NotoSansThai';
    }
  }
  
  // Default/English uses Nunito fonts
  switch(weight) {
    case 'bold':
      return 'Nunito-Bold';
    case 'light':
      return 'Nunito-Light';
    default:
      return 'Nunito';
  }
};

/**
 * Creates a style object with the appropriate font family
 * @param {string} language - The current language (e.g., 'en', 'th')
 * @param {string} weight - Font weight ('regular', 'bold', 'light')
 * @returns {object} Style object with fontFamily property
 */
export const getFontStyle = (language, weight = 'regular') => {
  return {
    fontFamily: getFontFamily(language, weight)
  };
}; 