import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
} from '@mui/material';

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    units: 'metric',
    language: 'en',
    dataSync: true,
    privacyMode: false,
  });

  const handleSettingChange = (setting: keyof typeof settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper 
        sx={{ 
          p: 3,
          mb: 3,
          background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Settings
        </Typography>
        <Typography variant="subtitle1">
          Customize your health assistant experience
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              General Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Notifications" 
                  secondary="Receive health and activity reminders"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.notifications}
                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Dark Mode" 
                  secondary="Use dark theme"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.darkMode}
                    onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <FormControl fullWidth>
                  <InputLabel>Units</InputLabel>
                  <Select
                    value={settings.units}
                    label="Units"
                    onChange={(e) => handleSettingChange('units', e.target.value)}
                  >
                    <MenuItem value="metric">Metric (kg, km)</MenuItem>
                    <MenuItem value="imperial">Imperial (lb, mi)</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <Divider />
              <ListItem>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={settings.language}
                    label="Language"
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Español</MenuItem>
                    <MenuItem value="fr">Français</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Privacy & Data
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Data Sync" 
                  secondary="Automatically sync data with cloud"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.dataSync}
                    onChange={(e) => handleSettingChange('dataSync', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Privacy Mode" 
                  secondary="Hide sensitive health information"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.privacyMode}
                    onChange={(e) => handleSettingChange('privacyMode', e.target.checked)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <Button 
                  variant="outlined" 
                  color="error" 
                  fullWidth
                  onClick={() => {
                    // Handle data deletion
                    console.log('Delete all data');
                  }}
                >
                  Delete All Data
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}; 