import { AuthContextProvider } from "./store/oil-context";
import { ThemeProvider } from "@mui/material/styles"; //mui 색깔 설정
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";
import { theme } from "../src/MUI/theme"; //mui 색깔 바꾸기
import reportWebVitals from "./reportWebVitals";
import React from "react";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));
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
