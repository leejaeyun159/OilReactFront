import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@mui/material/styles";//mui 색깔 설정
import { theme } from '../src/MUI/theme' //mui 색깔 바꾸기
import { AuthContextProvider } from './store/oil-context';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

const root = createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </CookiesProvider>
  </AuthContextProvider>
);

reportWebVitals();
