import React from 'react';
import { Box, ThemeProvider } from "@mui/material";
import MainAppBar from './components/MainAppBar';
import { Outlet } from 'react-router'
import Footer from './components/Footer';
import { themeSettings } from './theme';
import { AuthProvider } from './context/AuthProvider';

window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  const theme = themeSettings();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider >
        <Box height='100vh' overflow='auto' bgcolor={theme.palette.background.default} boxSizing='border-box'>
          <MainAppBar />
          <Outlet />
          <Footer />
        </Box>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App