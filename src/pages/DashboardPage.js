import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import Overview from '../components/dashboard/Overview';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import SpendingTrends from '../components/dashboard/SpendingTrends';
import AIChat from '../components/dashboard/AIChat';
import AIInsights from '../components/dashboard/AIInsights';
import GoalProgress from '../components/dashboard/GoalProgress';
import { 
  budgetService, 
  goalService 
} from '../services/api';
import { 
  PhoneIphone as PhoneIcon, 
  Flight as TravelIcon, 
  School as EducationIcon,
  House as HouseIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [budgetData, setBudgetData] = useState(null);
  const [goalsData, setGoalsData] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  console.log('Dashboard: Current user:', currentUser);

  // Simulated data loading - in a real app, replace with API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // In a real app, these would be actual API calls
        // const budgetResponse = await budgetService.getBudgetProgress(1);
        // const goalsResponse = await goalService.getGoals(1);
        
        // For demonstration, we'll use mock data
        setTimeout(() => {
          setBudgetData({
            items: [
              { title: 'Weekly Budget', value: 65, max: 100 },
              { title: 'Food Delivery Spend', value: 85, max: 100, warning: 70, danger: 80 }
            ]
          });
          
          setGoalsData({
            goals: [
              { 
                name: 'Save ₹5000 for iPhone', 
                currentAmount: 1500, 
                targetAmount: 5000, 
                icon: <PhoneIcon fontSize="small" />
              },
              { 
                name: 'Trip to Goa', 
                currentAmount: 8000, 
                targetAmount: 20000, 
                icon: <TravelIcon fontSize="small" />
              },
              { 
                name: 'Course Payment', 
                currentAmount: 4000, 
                targetAmount: 12000, 
                icon: <EducationIcon fontSize="small" />
              }
            ]
          });
          
          setLoading(false);
        }, 1500);
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <Box>
      {/* Welcome message */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 3, 
          mb: 4, 
          bgcolor: 'primary.main', 
          color: 'white',
          borderRadius: 2
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome back, {currentUser?.username || 'User'}!
        </Typography>
        <Typography variant="body1">
          Here's an overview of your financial health today.
        </Typography>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : (
        <Box sx={{ pb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ mb: 4, fontWeight: 'bold' }}
          >
            Dashboard
          </Typography>
          
          <Grid container spacing={3}>
            {/* First row */}
            <Grid item xs={12} md={8}>
              <Overview spent={12500} saved={18500} savingRate={18} />
            </Grid>
            <Grid item xs={12} md={4}>
              <BudgetProgress items={budgetData.items} />
            </Grid>
            
            {/* Second row */}
            <Grid item xs={12}>
              <SpendingTrends />
            </Grid>
            
            {/* Third row */}
            <Grid item xs={12} md={4}>
              <GoalProgress goals={goalsData.goals} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AIInsights />
            </Grid>
            <Grid item xs={12} md={4}>
              <AIChat />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default DashboardPage; 