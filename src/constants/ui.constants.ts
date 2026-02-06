export const THEMES = {
  light: {
    primary: '#3B82F6',
    primaryHover: '#2563EB',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
      muted: '#94A3B8',
    },
    border: '#E2E8F0',
    success: '#10B981',
    danger: '#EF4444',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  dark: {
    primary: '#60A5FA', // Lighter blue for dark mode
    primaryHover: '#3B82F6',
    background: '#0F172A', // Slate 900
    surface: '#1E293B', // Slate 800
    text: {
      primary: '#F8FAFC', // Slate 50
      secondary: '#94A3B8', // Slate 400
      muted: '#64748B', // Slate 500
    },
    border: '#334155', // Slate 700
    success: '#34D399',
    danger: '#F87171',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
};

// Backward compatibility helper or type
export type ThemeType = typeof THEMES.light;


export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  card: '0px 2px 4px rgba(0, 0, 0, 0.05)',
  cardHover: '0px 8px 16px rgba(0, 0, 0, 0.1)',
};

export const BORDER_RADIUS = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px',
};

export const TRANSITIONS = {
  default: 'all 0.2s ease-in-out',
};
