
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Box } from '@mui/material';
import VirtualizedTable from '../components/VirtualizedTable';
import { muiTheme } from '../theme/muiTheme';

const Index = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="min-h-screen bg-gray-50/50">
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ 
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                mb: 1
              }}
            >
              Users Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              High-performance virtualized table with 1,000+ records
            </Typography>
          </Box>
          
          <VirtualizedTable />
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Showing 1,000 users • Virtualized with react-window for optimal performance
            </Typography>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Index;
