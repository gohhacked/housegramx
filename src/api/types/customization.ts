export interface CustomTheme {
  id: string;
  name: string;
  type: 'preset' | 'custom';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent: string;
    error: string;
    success: string;
    warning: string;
  };
  chatBackground?: ChatBackground;
  font?: string;
  compactMode?: boolean;
  focusMode?: boolean;
}

export interface ChatBackground {
  type: 'color' | 'gradient' | 'image' | 'animated' | 'live';
  value: string | string[] | BackgroundAnimation;
  blur?: number;
  opacity?: number;
}

export interface BackgroundAnimation {
  type: 'gradient' | 'particles' | 'waves' | 'matrix' | 'stars';
  colors: string[];
  speed?: number;
  intensity?: number;
}

export interface CustomizationSettings {
  activeTheme: string;
  customThemes: CustomTheme[];
  font: string;
  compactMode: boolean;
  focusMode: boolean;
}

export const PRESET_THEMES: CustomTheme[] = [
  {
    id: 'ocean',
    name: 'Океан',
    type: 'preset',
    colors: {
      primary: '#0088cc',
      secondary: '#00a8e8',
      background: '#0a1929',
      surface: '#1a2332',
      text: '#ffffff',
      textSecondary: '#b0bec5',
      accent: '#00d4ff',
      error: '#ff5252',
      success: '#4caf50',
      warning: '#ff9800',
    },
    chatBackground: {
      type: 'animated',
      value: {
        type: 'waves',
        colors: ['#0088cc', '#00a8e8', '#00d4ff'],
        speed: 1,
        intensity: 0.5,
      },
    },
  },
  {
    id: 'sunset',
    name: 'Закат',
    type: 'preset',
    colors: {
      primary: '#ff6b6b',
      secondary: '#ff8e53',
      background: '#1a1a2e',
      surface: '#16213e',
      text: '#ffffff',
      textSecondary: '#e0e0e0',
      accent: '#ffa500',
      error: '#ff5252',
      success: '#4caf50',
      warning: '#ff9800',
    },
    chatBackground: {
      type: 'gradient',
      value: ['#ff6b6b', '#ff8e53', '#ffa500', '#ffb347'],
    },
  },
  {
    id: 'forest',
    name: 'Лес',
    type: 'preset',
    colors: {
      primary: '#2ecc71',
      secondary: '#27ae60',
      background: '#0d1b0e',
      surface: '#1a2f1b',
      text: '#ffffff',
      textSecondary: '#a8d5ba',
      accent: '#52c77a',
      error: '#ff5252',
      success: '#4caf50',
      warning: '#ff9800',
    },
    chatBackground: {
      type: 'animated',
      value: {
        type: 'particles',
        colors: ['#2ecc71', '#27ae60', '#52c77a'],
        speed: 0.5,
        intensity: 0.3,
      },
    },
  },
  {
    id: 'midnight',
    name: 'Полночь',
    type: 'preset',
    colors: {
      primary: '#9b59b6',
      secondary: '#8e44ad',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#b0b0b0',
      accent: '#c39bd3',
      error: '#ff5252',
      success: '#4caf50',
      warning: '#ff9800',
    },
    chatBackground: {
      type: 'animated',
      value: {
        type: 'stars',
        colors: ['#9b59b6', '#8e44ad', '#c39bd3'],
        speed: 0.3,
        intensity: 0.8,
      },
    },
  },
  {
    id: 'cyberpunk',
    name: 'Киберпанк',
    type: 'preset',
    colors: {
      primary: '#ff00ff',
      secondary: '#00ffff',
      background: '#0a0014',
      surface: '#1a0028',
      text: '#00ffff',
      textSecondary: '#ff00ff',
      accent: '#ff00aa',
      error: '#ff0055',
      success: '#00ff88',
      warning: '#ffaa00',
    },
    chatBackground: {
      type: 'animated',
      value: {
        type: 'matrix',
        colors: ['#ff00ff', '#00ffff', '#ff00aa'],
        speed: 2,
        intensity: 1,
      },
    },
  },
];

export const AVAILABLE_FONTS = [
  { id: 'default', name: 'По умолчанию', value: 'Roboto, sans-serif' },
  { id: 'inter', name: 'Inter', value: 'Inter, sans-serif' },
  { id: 'poppins', name: 'Poppins', value: 'Poppins, sans-serif' },
  { id: 'montserrat', name: 'Montserrat', value: 'Montserrat, sans-serif' },
  { id: 'opensans', name: 'Open Sans', value: '"Open Sans", sans-serif' },
  { id: 'lato', name: 'Lato', value: 'Lato, sans-serif' },
  { id: 'raleway', name: 'Raleway', value: 'Raleway, sans-serif' },
  { id: 'nunito', name: 'Nunito', value: 'Nunito, sans-serif' },
];
