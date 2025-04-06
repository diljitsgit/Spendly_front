import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Container,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  QueryStats,
  Savings,
  Psychology,
  AccountBalance
} from '@mui/icons-material';

const FeatureCard = ({ icon, title, description }) => {
  const theme = useTheme();
  
  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%',
        backgroundColor: 'background.paper',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 12px 20px rgba(0, 0, 0, 0.3)' 
            : '0 12px 20px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ color: 'primary.main', mb: 2, fontSize: '2.5rem' }}>
          {icon}
        </Box>
        <Typography variant="h5" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const features = [
    {
      icon: <QueryStats fontSize="inherit" />,
      title: "Smart Expense Tracking",
      description: "Automatically categorize and track your spending patterns to identify areas where you can save."
    },
    {
      icon: <Savings fontSize="inherit" />,
      title: "Goal-Based Savings",
      description: "Set financial goals and track your progress with personalized recommendations to reach them faster."
    },
    {
      icon: <Psychology fontSize="inherit" />,
      title: "AI Financial Advisor",
      description: "Get personalized advice on spending decisions to help you make smarter financial choices."
    },
    {
      icon: <AccountBalance fontSize="inherit" />,
      title: "Budget Management",
      description: "Create and manage budgets with real-time tracking to keep your finances under control."
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          minHeight: isMobile ? '80vh' : '70vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ p: { xs: 2, md: 0 } }}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 2, 
                    fontSize: { xs: '2.5rem', md: '3.5rem' } 
                  }}
                >
                  A Platform that makes you{' '}
                  <Typography 
                    component="span" 
                    variant="inherit" 
                    sx={{ color: 'primary.main', display: 'block' }}
                  >
                    Financially responsible.
                  </Typography>
                </Typography>
                <Typography 
                  variant="h6" 
                  component="p" 
                  color="text.secondary" 
                  sx={{ mb: 4, maxWidth: '90%' }}
                >
                  Get personalized financial insights, track your spending, and achieve your money goals with AI-powered guidance.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    component={Link} 
                    to="/dashboard" 
                    variant="contained" 
                    color="primary" 
                    size="large"
                  >
                    Try our Platform
                  </Button>
                  <Button 
                    component={Link} 
                    to="/chat" 
                    variant="outlined" 
                    color="primary" 
                    size="large"
                  >
                    Ask AI Advisor
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: '100%', 
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Placeholder for hero image or graphic */}
                <Box 
                  sx={{ 
                    width: '100%',
                    height: '400px',
                    backgroundColor: 'background.paper',
                    borderRadius: '24px',
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
                      : '0 8px 32px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(45deg, rgba(0, 200, 83, 0.3), rgba(255, 61, 0, 0.3))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="h4" fontWeight="bold">
                      Dashboard Preview
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Key Features
            </Typography>
            <Typography 
              variant="h6" 
              component="p" 
              color="text.secondary" 
              sx={{ maxWidth: '600px', mx: 'auto' }}
            >
              Our platform helps you make smarter financial decisions with powerful features.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FeatureCard 
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: 10, 
          backgroundColor: 'background.paper', 
          borderRadius: { md: '24px 24px 0 0' } 
        }}
      >
        <Container maxWidth="md">
          <Box 
            sx={{ 
              textAlign: 'center', 
              p: 4,
              borderRadius: '24px',
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(45deg, rgba(0, 150, 36, 0.2), rgba(94, 252, 130, 0.1))' 
                : 'linear-gradient(45deg, rgba(0, 200, 83, 0.1), rgba(94, 252, 130, 0.05))',
            }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Ready to take control of your finances?
            </Typography>
            <Typography 
              variant="h6" 
              component="p" 
              color="text.secondary" 
              sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
            >
              Join thousands of users who are making smarter financial decisions every day.
            </Typography>
            <Button 
              component={Link} 
              to="/dashboard" 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 