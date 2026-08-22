import React, { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  cardBgClass: string;
  textPrimaryClass: string;
  textSecondaryClass: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const cardBgClass = isDark
    ? 'bg-slate-900 border-slate-800 shadow-none'
    : 'bg-white border-slate-100 shadow-sm';
  const textPrimaryClass = isDark ? 'text-white' : 'text-slate-900';
  const textSecondaryClass = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        cardBgClass,
        textPrimaryClass,
        textSecondaryClass,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
