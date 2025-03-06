import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Rating,
  Chip,
  InputAdornment,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  CalendarMonth as CalendarIcon,
  Star as StarIcon,
} from '@mui/icons-material';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  experience: number;
  availableSlots: string[];
  image: string;
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    location: 'New York',
    rating: 4.8,
    experience: 12,
    availableSlots: ['9:00 AM', '2:30 PM', '4:00 PM'],
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    location: 'Boston',
    rating: 4.9,
    experience: 15,
    availableSlots: ['10:30 AM', '1:00 PM', '3:30 PM'],
    image: 'https://randomuser.me/api/portraits/men/79.jpg',
  },
  {
    id: '3',
    name: 'Dr. Emily Williams',
    specialty: 'Pediatrician',
    location: 'Chicago',
    rating: 4.7,
    experience: 8,
    availableSlots: ['9:30 AM', '11:00 AM', '2:00 PM'],
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Dermatologist',
    location: 'Los Angeles',
    rating: 4.6,
    experience: 10,
    availableSlots: ['11:30 AM', '3:00 PM', '4:30 PM'],
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
];

const specialties = [
  'All Specialties',
  'Cardiologist',
  'Neurologist',
  'Pediatrician',
  'Dermatologist',
  'Orthopedist',
  'Psychiatrist',
  'Dentist',
];

export const DoctorAppointmentPage: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedLocation, setSelectedLocation] = useState('');

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty;
    const matchesLocation = !selectedLocation || doctor.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Find a Doctor
        </Typography>
        <Typography variant="subtitle1">
          Book appointments with the best doctors
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* Search and Filter Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search doctors by name or specialty"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Specialty</InputLabel>
                  <Select
                    value={selectedSpecialty}
                    label="Specialty"
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                  >
                    {specialties.map((specialty) => (
                      <MenuItem key={specialty} value={specialty}>
                        {specialty}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Doctors List */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {filteredDoctors.map((doctor) => (
              <Grid item xs={12} md={6} lg={4} key={doctor.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={doctor.image}
                        sx={{ width: 64, height: 64, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {doctor.name}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {doctor.specialty}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{doctor.location}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating
                          value={doctor.rating}
                          readOnly
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2">
                          ({doctor.rating})
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="subtitle2" gutterBottom>
                      Available Slots
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {doctor.availableSlots.map((slot) => (
                        <Chip
                          key={slot}
                          label={slot}
                          size="small"
                          icon={<CalendarIcon />}
                          onClick={() => {}}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => {}}
                    >
                      Book Appointment
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}; 