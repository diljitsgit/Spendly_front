import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './Navbar';
import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  // Create theme based on dark mode preference
  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: {
          main: '#00c853',
          light: '#5efc82',
          dark: '#009624',
        },
        secondary: {
          main: '#ff3d00',
          light: '#ff7539',
          dark: '#c30000',
        },
        background: {
          default: darkMode ? '#121212' : '#f5f5f5',
          paper: darkMode ? '#1e1e1e' : '#ffffff',
        },
        text: {
          primary: darkMode ? '#ffffff' : '#212121',
          secondary: darkMode ? '#b0b0b0' : '#757575',
        },
        error: {
          main: '#f44336',
        },
        warning: {
          main: '#ffc107',
        },
        success: {
          main: '#00c853',
        },
      },
      typography: {
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: {
          fontWeight: 700,
        },
        h2: {
          fontWeight: 700,
        },
        h3: {
          fontWeight: 600,
        },
        h4: {
          fontWeight: 600,
        },
        h5: {
          fontWeight: 500,
        },
        h6: {
          fontWeight: 500,
        },
        subtitle1: {
          fontWeight: 500,
        },
        button: {
          fontWeight: 500,
        },
      },
      shape: {
        borderRadius: 8,
      },
      shadows: [
        'none',
        '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 1px 3px 0px rgba(0,0,0,0.06)',
        '0px 3px 3px -2px rgba(0,0,0,0.1),0px 2px 2px 0px rgba(0,0,0,0.07),0px 1px 5px 0px rgba(0,0,0,0.06)',
        '0px 3px 4px -2px rgba(0,0,0,0.1),0px 3px 3px -2px rgba(0,0,0,0.07),0px 1px 8px 0px rgba(0,0,0,0.06)',
        '0px 2px 5px -1px rgba(0,0,0,0.1),0px 4px 6px 1px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.06)',
        '0px 3px 6px -1px rgba(0,0,0,0.1),0px 5px 8px 1px rgba(0,0,0,0.07),0px 1px 14px 0px rgba(0,0,0,0.06)',
        '0px 3px 7px -2px rgba(0,0,0,0.1),0px 6px 10px 2px rgba(0,0,0,0.07),0px 1px 18px 0px rgba(0,0,0,0.06)',
        '0px 4px 8px -2px rgba(0,0,0,0.1),0px 7px 12px 2px rgba(0,0,0,0.07),0px 2px 16px 1px rgba(0,0,0,0.06)',
        '0px 5px 9px -2px rgba(0,0,0,0.1),0px 8px 16px 3px rgba(0,0,0,0.07),0px 3px 14px 2px rgba(0,0,0,0.06)',
        '0px 5px 10px -3px rgba(0,0,0,0.1),0px 8px 16px 4px rgba(0,0,0,0.07),0px 3px 16px 3px rgba(0,0,0,0.06)',
        '0px 6px 11px -3px rgba(0,0,0,0.1),0px 9px 18px 4px rgba(0,0,0,0.07),0px 3px 16px 4px rgba(0,0,0,0.06)',
        '0px 6px 12px -3px rgba(0,0,0,0.1),0px 10px 20px 4px rgba(0,0,0,0.07),0px 4px 18px 3px rgba(0,0,0,0.06)',
        '0px 7px 13px -4px rgba(0,0,0,0.1),0px 11px 20px 5px rgba(0,0,0,0.07),0px 5px 24px 4px rgba(0,0,0,0.06)',
        '0px 7px 14px -4px rgba(0,0,0,0.1),0px 11px 22px 5px rgba(0,0,0,0.07),0px 6px 28px 5px rgba(0,0,0,0.06)',
        '0px 7px 16px -4px rgba(0,0,0,0.1),0px 12px 24px 5px rgba(0,0,0,0.07),0px 7px 30px 6px rgba(0,0,0,0.06)',
        '0px 8px 17px -5px rgba(0,0,0,0.1),0px 13px 26px 5px rgba(0,0,0,0.07),0px 8px 32px 7px rgba(0,0,0,0.06)',
        '0px 8px 18px -5px rgba(0,0,0,0.1),0px 14px 28px 6px rgba(0,0,0,0.07),0px 9px 34px 8px rgba(0,0,0,0.06)',
        '0px 9px 19px -5px rgba(0,0,0,0.1),0px 15px 30px 6px rgba(0,0,0,0.07),0px 10px 36px 8px rgba(0,0,0,0.06)',
        '0px 9px 20px -5px rgba(0,0,0,0.1),0px 16px 32px 6px rgba(0,0,0,0.07),0px 11px 38px 9px rgba(0,0,0,0.06)',
        '0px 10px 21px -5px rgba(0,0,0,0.1),0px 17px 34px 6px rgba(0,0,0,0.07),0px 12px 40px 10px rgba(0,0,0,0.06)',
        '0px 10px 22px -6px rgba(0,0,0,0.1),0px 18px 36px 7px rgba(0,0,0,0.07),0px 13px 42px 11px rgba(0,0,0,0.06)',
        '0px 11px 23px -6px rgba(0,0,0,0.1),0px 19px 38px 7px rgba(0,0,0,0.07),0px 14px 44px 11px rgba(0,0,0,0.06)',
        '0px 11px 24px -6px rgba(0,0,0,0.1),0px 20px 40px 7px rgba(0,0,0,0.07),0px 15px 46px 12px rgba(0,0,0,0.06)',
        '0px 11px 25px -6px rgba(0,0,0,0.1),0px 21px 42px 7px rgba(0,0,0,0.07),0px 16px 48px 12px rgba(0,0,0,0.06)',
        '0px 12px 26px -6px rgba(0,0,0,0.1),0px 22px 44px 8px rgba(0,0,0,0.07),0px 17px 50px 12px rgba(0,0,0,0.06)',
      ],
      components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: false,
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 500,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
            },
          },
        },
      },
    }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh', 
          backgroundColor: 'background.default' 
        }}
      >
        {!isLoginPage && <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        <Container 
          component="main" 
          maxWidth={isLoginPage ? 'xs' : 'xl'} 
          sx={{ 
            mt: isLoginPage ? 0 : 3, 
            mb: 5, 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column',
            py: isLoginPage ? 4 : 2
          }}
        >
          {children}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Layout; 