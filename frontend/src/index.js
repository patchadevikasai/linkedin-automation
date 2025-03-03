import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme(); // You can customize this later
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>  
    <CssBaseline /> 
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
