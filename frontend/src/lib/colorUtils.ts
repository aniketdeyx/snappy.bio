/**
 * Color utility functions for determining contrast and generating dynamic styles
 */

export interface InputStyles {
  backgroundColor: string;
  color: string;
  borderColor: string;
  placeholderColor: string;
  labelColor: string;
}

export interface ButtonColors {
  backgroundColor: string;
  color: string;
  borderColor: string;
  hoverBackgroundColor: string;
  hoverColor: string;
}

export interface TextColors {
  primary: string;
  secondary: string;
}

/**
 * Determines if a color is light or dark based on luminance
 * @param color - Hex color string (e.g., "#ffffff")
 * @returns true if the color is light, false if dark
 */
export const isLightColor = (color: string): boolean => {
  if (!color || color === "#ffffff") return true;
  
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance using the relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

/**
 * Generates input styles based on background color for optimal contrast
 * @param backgroundColor - The background color to generate styles for
 * @returns InputStyles object with appropriate colors
 */
export const getInputStyles = (backgroundColor: string): InputStyles => {
  const isLight = isLightColor(backgroundColor);
  
  if (isLight) {
    return {
      backgroundColor: "#ffffff",
      color: "#1f2937",
      borderColor: "#d1d5db",
      placeholderColor: "#9ca3af",
      labelColor: "#1f2937"
    };
  } else {
    return {
      backgroundColor: "#f9fafb",
      color: "#111827", 
      borderColor: "#6b7280",
      placeholderColor: "#6b7280",
      labelColor: "#f9fafb"
    };
  }
};

/**
 * Generates button colors for preview/action buttons based on background color
 * @param backgroundColor - The background color to generate button styles for
 * @returns ButtonColors object with appropriate colors and hover states
 */
export const getPreviewButtonColors = (backgroundColor: string): ButtonColors => {
  const isLight = isLightColor(backgroundColor);
  
  if (isLight) {
    return {
      backgroundColor: "transparent",
      color: "#1f2937",
      borderColor: "#1f2937",
      hoverBackgroundColor: "#1f2937",
      hoverColor: "#ffffff"
    };
  } else {
    return {
      backgroundColor: "transparent",
      color: "#f9fafb",
      borderColor: "#f9fafb",
      hoverBackgroundColor: "#f9fafb",
      hoverColor: "#1f2937"
    };
  }
};

/**
 * Generates text colors for content based on background color
 * @param backgroundColor - The background color to generate text styles for
 * @returns TextColors object with primary and secondary text colors
 */
export const getTextColors = (backgroundColor: string): TextColors => {
  const isLight = isLightColor(backgroundColor);
  
  if (isLight) {
    return {
      primary: "#1f2937", // Dark text for light backgrounds
      secondary: "#6b7280" // Medium gray for secondary text
    };
  } else {
    return {
      primary: "#f9fafb", // Light text for dark backgrounds
      secondary: "#d1d5db" // Light gray for secondary text
    };
  }
};

/**
 * Generates suitable button colors for links/actions based on background
 * @param backgroundColor - The background color to generate button styles for
 * @returns Object with primary and hover colors for buttons
 */
export const getButtonColors = (backgroundColor: string): { primary: string; hover: string } => {
  if (!backgroundColor || backgroundColor === "#ffffff") {
    // Default colors for white/light backgrounds
    return {
      primary: "#3b82f6", // Blue
      hover: "#2563eb"
    };
  }

  const isLight = isLightColor(backgroundColor);
  
  if (isLight) {
    // For light backgrounds, use darker colors
    return {
      primary: "#1f2937", // Dark gray
      hover: "#111827"
    };
  } else {
    // For dark backgrounds, use lighter colors
    return {
      primary: "#f3f4f6", // Light gray
      hover: "#e5e7eb"
    };
  }
};

/**
 * Gets border color for profile images based on background
 * @param backgroundColor - The background color to generate border color for
 * @returns Hex color string for image borders
 */
export const getImageBorderColor = (backgroundColor: string): string => {
  const isLight = isLightColor(backgroundColor);
  return isLight ? "#d1d5db" : "#6b7280"; // Light gray for light bg, medium gray for dark bg
};

/**
 * Generates validation error styles (red borders) while maintaining contrast
 * @param backgroundColor - The background color context
 * @returns CSS color value for error borders
 */
export const getErrorBorderColor = (): string => {
  return "#ef4444"; // Red-500 for error states
};

/**
 * Determines if text should be dark or light based on button background
 * @param buttonBackgroundColor - The button's background color
 * @returns CSS color value for button text
 */
export const getButtonTextColor = (buttonBackgroundColor: string): string => {
  return isLightColor(buttonBackgroundColor) ? "#1f2937" : "#ffffff";
};
