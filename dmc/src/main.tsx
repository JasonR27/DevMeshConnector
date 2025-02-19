// import reportWebVitals from './reportWebVitals';
// import * as serviceWorker from './serviceWorker';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ParticlesComp from './components/Particles';
import { AuthProvider } from './context/Auth';
import './styles/Global.css';
import { MutationsProvider } from './services/MutationsProvider';
import { ThemeProviderContext } from './context/ThemeContext';

const container = document.getElementById('root');

if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

const queryClient = new QueryClient();

const theme = createTheme({
  // Customize your theme here
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProviderContext>
        {/* <ThemeProvider theme={theme}> */}
          <CssBaseline />
          <AuthProvider>
            <MutationsProvider>
              <ParticlesComp  />
              <App style={{  position: 'relative' }}/>
            </MutationsProvider>
          </AuthProvider>
        {/* </ThemeProvider> */}
      </ThemeProviderContext>
    </QueryClientProvider>
  </React.StrictMode>
);
