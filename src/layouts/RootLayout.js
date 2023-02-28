import {
  Box,
  Toolbar,
  ThemeProvider,
  CssBaseline,
  createTheme,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppNavbar from './AppNavbar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const RootLayout = () => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppNavbar />
        <Box component='main' sx={{ p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default RootLayout;
