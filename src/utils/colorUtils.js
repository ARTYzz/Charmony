/**
 * Color utility functions
 */

/**
 * Converts hex color to RGB object
 * @param {string} hex - Hex color code (e.g. "#FF5733")
 * @returns {Object} RGB object with r, g, b properties
 */
export const hexToRgb = (hex) => {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return { r, g, b };
};

/**
 * Converts RGB object to hex color string
 * @param {Object} rgb - RGB object with r, g, b properties
 * @returns {string} Hex color code
 */
export const rgbToHex = ({ r, g, b }) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

/**
 * Generates a list of complementary colors for the given color
 * @param {string} hex - Hex color code
 * @returns {Array} Array of hex color codes
 */
export const getComplementaryColors = (hex) => {
  const { r, g, b } = hexToRgb(hex);
  
  // Generate complementary color
  const complementary = rgbToHex({
    r: 255 - r,
    g: 255 - g,
    b: 255 - b
  });
  
  // Generate analogous colors (colors that are next to each other on the color wheel)
  const hue = rgbToHsl(r, g, b).h;
  const analogous1 = hslToHex({ h: (hue + 30) % 360, s: 100, l: 50 });
  const analogous2 = hslToHex({ h: (hue + 60) % 360, s: 100, l: 50 });
  
  return [hex, complementary, analogous1, analogous2];
};

/**
 * Converts RGB to HSL
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {Object} HSL object with h, s, l properties
 */
export const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }
  
  return { h: h * 360, s: s * 100, l: l * 100 };
};

/**
 * Converts HSL to Hex
 * @param {Object} hsl - HSL object with h, s, l properties
 * @returns {string} Hex color code
 */
export const hslToHex = ({ h, s, l }) => {
  h /= 360;
  s /= 100;
  l /= 100;
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return rgbToHex({
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  });
}; 