import React, { createContext, useState, useContext, ReactNode } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

interface ThemeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Customize your primary color
    },
    text: {
      primary: '#000000', // Set font color for light mode
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      color: '#1976d2', // Customize font color for headings
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Customize your primary color
    },
    text: {
      primary: '#ffffff', // Set font color for dark mode
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      color: '#90caf9', // Customize font color for headings
    },
  },
});

export const ThemeProviderContext = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [particleColor, setParticleColor] = useState("#0000ff");

  const theme = darkMode ? darkTheme : lightTheme;

  // if (darkMode) {
  //   if (particleColor === "#0000ff") {
  //     setParticleColor("#008b8b");
  //   } else {
  //     setParticleColor("#0000ff");
  //   }
  // }



  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
