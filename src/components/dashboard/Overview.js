import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

const Overview = ({ spent = 100, saved = 1300, savingRate = 18 }) => {
  return (
    <Card elevation={0} sx={{ bgcolor: 'background.paper', mb: 3 }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ color: '#00c853', mb: 2 }}>
          Monthly Overview
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
                Spent
              </Typography>
              <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', mb: 0 }}>
                {spent ? `₹${spent}` : '₹0'}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
                Saved
              </Typography>
              <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', mb: 0, color: '#00c853' }}>
                {saved ? `₹${saved}` : '₹0'}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
                Saving Rate
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', mb: 0 }}>
                  {savingRate ? `${savingRate}%` : '0%'}
                </Typography>
                {savingRate > 10 ? (
                  <TrendingUp sx={{ color: '#00c853', ml: 1 }} />
                ) : (
                  <TrendingDown sx={{ color: '#ff3d00', ml: 1 }} />
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Overview; 