import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { GlassmorphicCard } from '../components/styled/AdvancedUIEffects';

const AnimatedTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover, &:focus-within': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    },
  },
}));

const ContactInfoCard = styled(GlassmorphicCard)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const MapContainer = styled(Paper)(({ theme }) => ({
  height: 400,
  width: '100%',
  overflow: 'hidden',
  borderRadius: theme.spacing(2),
  position: 'relative',
  '&:hover': {
    '& .map-overlay': {
      opacity: 1,
    },
  },
}));

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSnackbar({
      open: true,
      message: 'Message sent successfully! We will get back to you soon.',
      severity: 'success',
    });
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 40, color: '#f44336' }} />,
      title: 'Visit Us',
      details: '123 Health Street, Wellness City, 12345',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
      title: 'Call Us',
      details: '+1 (234) 567-8900',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: '#2196f3' }} />,
      title: 'Email Us',
      details: 'contact@healthassistant.com',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 6,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Get in Touch
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {/* Contact Information Cards */}
          {contactInfo.map((info, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ContactInfoCard>
                  {info.icon}
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    {info.title}
                  </Typography>
                  <Typography color="text.secondary">{info.details}</Typography>
                </ContactInfoCard>
              </motion.div>
            </Grid>
          ))}

          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <GlassmorphicCard sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <AnimatedTextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AnimatedTextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AnimatedTextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AnimatedTextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formState.message}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                          color: 'white',
                          py: 1.5,
                        }}
                      >
                        Send Message
                      </Button>
                    </motion.div>
                  </Grid>
                </Grid>
              </form>
            </GlassmorphicCard>
          </Grid>

          {/* Map */}
          <Grid item xs={12} md={6}>
            <MapContainer>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596073366!2d-74.25987368715491!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564944227!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
              <Box
                className="map-overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: 'rgba(33, 150, 243, 0.1)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
              />
            </MapContainer>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ContactPage; 