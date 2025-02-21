import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Cookies from 'js-cookie';

interface ThemeContextProps {
  mode: boolean;
  toggleMode: () => void;
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
  const [mode, setMode] = useState(true);

  useEffect(() => {
    const cookieTheme = Cookies.get('theme')
    console.log('cookieTheme: ', cookieTheme);
    if (cookieTheme) {
      if (cookieTheme === 'dark') {
        setMode(true);
      } else {
        setMode(false)
      }
    }


  }, []);

  const theme = mode ? darkTheme : lightTheme;

  const toggleMode = () => {
    setMode((prevMode: boolean) => {
      const newMode = !prevMode;

      // Validate the cookie before parsing
      // try {
      const cookieTheme = Cookies.get('theme')
      if (cookieTheme) {
        console.log(cookieTheme)
      } else {
        console.log('no theme cookie found')
      }

      let newTheme = '';

      if (newMode) {
        newTheme = 'dark'
      } else {
        newTheme = 'light'
      }

      Cookies.set('theme', newTheme)
      
      return newMode;
    });
  };


  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};