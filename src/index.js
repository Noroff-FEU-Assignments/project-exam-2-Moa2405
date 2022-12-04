import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContextProvider, useThemeMode } from './context/themeContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { light, dark } from './theme/theme';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const Root = () => {
  const { darkMode } = useThemeMode();
  let theme = useMemo(() => {
    return createTheme(darkMode ? dark : light)
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeContextProvider>
          <Root />
        </ThemeContextProvider>
      </BrowserRouter>
      {/* <ReactQueryDevtoolsPanel style={{ zIndex: "3000" }} /> */}
    </QueryClientProvider>
  </React.StrictMode>
);