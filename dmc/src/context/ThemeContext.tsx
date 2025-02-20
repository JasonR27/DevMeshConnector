import React, { createContext, useState, useContext, ReactNode } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

interface ThemeContextProps {
  mode: boolean;
  themeParticleColor: string;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

ThemeContext.mode = true; // replace with load theme from setting s cookie code 
// ThemeContext.particleColor = '#008b8b';
ThemeContext.themeParticleColor = 'yellow';

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
  const [mode, setMode] = useState(false);
  const [themeParticleColor, setThemeParticleColor] = useState<string>("red");

  const theme = mode ? darkTheme : lightTheme;

  if (mode == darkTheme) {
    if (themeParticleColor === "#0000ff") {
      setThemeParticleColor("#008b8b");
    } else {
      setThemeParticleColor("#0000ff");
    }
  }

  const toggleMode = () => {
    setMode((prevMode: boolean) => !prevMode);

    // Retrieve the existing settings cookie
    const storedSettingsString = document.cookie.split(';').find(row => row.trim().startsWith('settings='))?.split('=')[1];
    let settings: SettingsProps | null = storedSettingsString ? JSON.parse(storedSettingsString) : null;

    if (settings) {
      // Update the theme property
      settings.theme = settings.theme === 'dark' ? 'light' : 'dark';

      // Set the updated settings cookie back to the document
      // const BASE_URL = import.meta.env.VITE_BACKEND_URL;
      const updatedSettingsString = JSON.stringify(settings);
      document.cookie = `settings=${updatedSettingsString}; httpOnly=false; secure=${import.meta.env.NODE_ENV === 'production'}; sameSite=strict; maxAge=3600*10000`;
    } else {
      // If no settings cookie exists, do nothing
      console.warn('No settings cookie found');
    }

    // if (themeParticleColor == 'red') {
    //   setThemeParticleColor('blue');
    // } else {
    //   setThemeParticleColor('red');
    // }
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, themeParticleColor }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
