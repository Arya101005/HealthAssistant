import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  LocalHospital as DoctorIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
  Restaurant as NutritionIcon,
  MonitorHeart as HealthIcon,
  Bluetooth as BluetoothIcon,
  DirectionsRun as DirectionsRunIcon,
  AssignmentTurnedIn as TasksIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Health Metrics', icon: <HealthIcon />, path: '/health-metrics' },
  { text: 'Daily Tasks', icon: <TasksIcon />, path: '/daily-tasks' },
  { text: 'Connect Device', icon: <BluetoothIcon />, path: '/connect-device' },
  { text: 'Doctor Appointments', icon: <DoctorIcon />, path: '/appointments' },
  { text: 'Health Assistant', icon: <ChatIcon />, path: '/chatbot' },
  { text: 'Nutrition Tracker', icon: <NutritionIcon />, path: '/nutrition' },
  { text: 'Activity Tracker', icon: <DirectionsRunIcon />, path: '/activity' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 8 }}>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.contrastText,
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}; 