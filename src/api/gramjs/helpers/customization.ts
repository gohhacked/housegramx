import type { CustomTheme, CustomizationSettings, ChatBackground } from '../../types/customization';
import { PRESET_THEMES } from '../../types/customization';

const CUSTOMIZATION_STORAGE_KEY = 'housegramx_customization';

export function getCustomizationSettings(): CustomizationSettings {
  try {
    const stored = localStorage.getItem(CUSTOMIZATION_STORAGE_KEY);
    if (!stored) {
      return {
        activeTheme: 'ocean',
        customThemes: [],
        font: 'default',
        compactMode: false,
        focusMode: false,
      };
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading customization settings:', error);
    return {
      activeTheme: 'ocean',
      customThemes: [],
      font: 'default',
      compactMode: false,
      focusMode: false,
    };
  }
}

export function saveCustomizationSettings(settings: CustomizationSettings): void {
  try {
    localStorage.setItem(CUSTOMIZATION_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving customization settings:', error);
  }
}

export function getActiveTheme(): CustomTheme | undefined {
  const settings = getCustomizationSettings();
  const preset = PRESET_THEMES.find((t) => t.id === settings.activeTheme);
  if (preset) return preset;
  
  return settings.customThemes.find((t) => t.id === settings.activeTheme);
}

export function setActiveTheme(themeId: string): void {
  const settings = getCustomizationSettings();
  settings.activeTheme = themeId;
  saveCustomizationSettings(settings);
  applyTheme(themeId);
}

export function createCustomTheme(theme: Omit<CustomTheme, 'id' | 'type'>): string {
  const settings = getCustomizationSettings();
  const id = `custom_${Date.now()}`;
  const newTheme: CustomTheme = {
    ...theme,
    id,
    type: 'custom',
  };
  settings.customThemes.push(newTheme);
  saveCustomizationSettings(settings);
  return id;
}

export function updateCustomTheme(id: string, theme: Partial<CustomTheme>): void {
  const settings = getCustomizationSettings();
  const index = settings.customThemes.findIndex((t) => t.id === id);
  if (index !== -1) {
    settings.customThemes[index] = { ...settings.customThemes[index], ...theme };
    saveCustomizationSettings(settings);
    if (settings.activeTheme === id) {
      applyTheme(id);
    }
  }
}

export function deleteCustomTheme(id: string): void {
  const settings = getCustomizationSettings();
  settings.customThemes = settings.customThemes.filter((t) => t.id !== id);
  if (settings.activeTheme === id) {
    settings.activeTheme = 'ocean';
  }
  saveCustomizationSettings(settings);
}

export function applyTheme(themeId: string): void {
  const theme = PRESET_THEMES.find((t) => t.id === themeId) 
    || getCustomizationSettings().customThemes.find((t) => t.id === themeId);
  
  if (!theme) return;

  const root = document.documentElement;
  
  // Apply colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });

  // Apply chat background
  if (theme.chatBackground) {
    applyChatBackground(theme.chatBackground);
  }
}

export function applyChatBackground(background: ChatBackground): void {
  const chatBg = document.querySelector('.chat-background') as HTMLElement;
  if (!chatBg) return;

  chatBg.className = 'chat-background';
  chatBg.style.cssText = '';

  switch (background.type) {
    case 'color':
      chatBg.style.background = background.value as string;
      break;
    case 'gradient':
      const colors = background.value as string[];
      chatBg.style.background = `linear-gradient(135deg, ${colors.join(', ')})`;
      break;
    case 'image':
      chatBg.style.backgroundImage = `url(${background.value})`;
      chatBg.style.backgroundSize = 'cover';
      chatBg.style.backgroundPosition = 'center';
      break;
    case 'animated':
    case 'live':
      chatBg.classList.add('animated-background');
      chatBg.dataset.animation = JSON.stringify(background.value);
      break;
  }

  if (background.blur) {
    chatBg.style.filter = `blur(${background.blur}px)`;
  }
  if (background.opacity) {
    chatBg.style.opacity = background.opacity.toString();
  }
}

export function setFont(fontId: string): void {
  const settings = getCustomizationSettings();
  settings.font = fontId;
  saveCustomizationSettings(settings);
  
  const root = document.documentElement;
  const fontValue = getFontValue(fontId);
  root.style.setProperty('--font-family', fontValue);
}

export function setCompactMode(enabled: boolean): void {
  const settings = getCustomizationSettings();
  settings.compactMode = enabled;
  saveCustomizationSettings(settings);
  
  document.body.classList.toggle('compact-mode', enabled);
}

export function setFocusMode(enabled: boolean): void {
  const settings = getCustomizationSettings();
  settings.focusMode = enabled;
  saveCustomizationSettings(settings);
  
  document.body.classList.toggle('focus-mode', enabled);
}

function getFontValue(fontId: string): string {
  const fonts: Record<string, string> = {
    default: 'Roboto, sans-serif',
    inter: 'Inter, sans-serif',
    poppins: 'Poppins, sans-serif',
    montserrat: 'Montserrat, sans-serif',
    opensans: '"Open Sans", sans-serif',
    lato: 'Lato, sans-serif',
    raleway: 'Raleway, sans-serif',
    nunito: 'Nunito, sans-serif',
  };
  return fonts[fontId] || fonts.default;
}

export async function uploadCustomBackground(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      resolve(dataUrl);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
