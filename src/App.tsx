import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, IconButton, Theme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatedBackground, ContentWrapper } from './components/styled/StyledBackground';
import HomePage from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import FeaturesPage from './pages/FeaturesPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { HealthChatbotPage } from './pages/HealthChatbotPage';
import { DoctorAppointmentPage } from './pages/DoctorAppointmentPage';
import ConnectDevicePage from './pages/ConnectDevicePage';
import { HealthMetricsPage } from './pages/HealthMetricsPage';
import { NutritionPage } from './pages/NutritionPage';
import { ActivityPage } from './pages/ActivityPage';
import { SettingsPage } from './pages/SettingsPage';
import { MainLayout } from './components/Layout/MainLayout';
import { DailyTasksPage } from './pages/DailyTasksPage';

const defaultShadows = Array(25).fill('') as Theme['shadows'];
defaultShadows[0] = 'none';
defaultShadows[1] = '0px 2px 4px rgba(0,0,0,0.05)';
defaultShadows[2] = '0px 4px 8px rgba(0,0,0,0.05)';
defaultShadows[3] = '0px 8px 16px rgba(0,0,0,0.05)';
defaultShadows[4] = '0px 16px 24px rgba(0,0,0,0.05)';
defaultShadows[5] = '0px 24px 32px rgba(0,0,0,0.05)';

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#2196f3',
            light: '#64b5f6',
            dark: '#1976d2',
          },
          secondary: {
            main: '#f50057',
            light: '#ff4081',
            dark: '#c51162',
          },
          background: {
            default: mode === 'light' ? '#f5f7fa' : '#121212',
            paper: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(18, 18, 18, 0.9)',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 800,
            letterSpacing: '-0.025em',
          },
          h2: {
            fontWeight: 700,
            letterSpacing: '-0.0125em',
          },
          h3: {
            fontWeight: 700,
          },
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 600,
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 8,
                padding: '10px 24px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              },
              contained: {
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 6px 10px rgba(0,0,0,0.15)',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 8,
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
        },
        shape: {
          borderRadius: 12,
        },
        shadows: defaultShadows,
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AnimatedBackground />
        <IconButton
          onClick={toggleColorMode}
          color="inherit"
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1100,
            bgcolor: 'background.paper',
            boxShadow: 2,
            '&:hover': {
              bgcolor: 'background.paper',
            },
          }}
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <ContentWrapper>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/health-metrics" element={<HealthMetricsPage />} />
              <Route path="/connect-device" element={<ConnectDevicePage />} />
              <Route path="/appointments" element={<DoctorAppointmentPage />} />
              <Route path="/chatbot" element={<HealthChatbotPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/daily-tasks" element={<DailyTasksPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </MainLayout>
        </ContentWrapper>
      </Router>
    </ThemeProvider>
  );
};

export default App;
