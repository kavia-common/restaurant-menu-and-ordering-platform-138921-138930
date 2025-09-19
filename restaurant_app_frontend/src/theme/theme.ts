export const theme = {
  colors: {
    primary: '#2563EB',    // Ocean blue
    secondary: '#F59E0B',  // Amber accent
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    muted: '#6b7280',
    border: '#e5e7eb',
    cardShadow: 'rgba(0, 0, 0, 0.08)',
  },
  radius: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18
  },
  spacing: (n: number) => n * 8,
  shadows: {
    card: {
      shadowColor: 'rgba(0,0,0,0.12)',
      shadowOpacity: 0.12,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3
    }
  }
};
