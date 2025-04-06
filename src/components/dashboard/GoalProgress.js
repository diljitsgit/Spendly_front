import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Paper
} from '@mui/material';
import { Phone as PhoneIcon } from '@mui/icons-material';

const GoalProgressItem = ({ goal }) => {
  const { name, currentAmount, targetAmount, icon } = goal;
  const progress = (currentAmount / targetAmount) * 100;
  
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ mr: 1, color: 'primary.main' }}>
          {icon}
        </Box>
        <Typography variant="body2" fontWeight="medium">
          {name}
        </Typography>
      </Box>
      
      <LinearProgress 
        variant="determinate" 
        value={Math.min(progress, 100)} 
        color="primary"
        sx={{ 
          height: 8, 
          borderRadius: 4,
          bgcolor: 'background.default',
          mb: 1,
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
          }
        }}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">
          ₹{currentAmount.toLocaleString()}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ₹{targetAmount.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

const GoalProgress = ({ goals = [] }) => {
  // Default goals if none provided
  const defaultGoals = [
    { 
      name: 'Save ₹5000 for iPhone', 
      currentAmount: 1500, 
      targetAmount: 5000, 
      icon: <PhoneIcon fontSize="small" />
    }
  ];
  
  const displayGoals = goals.length > 0 ? goals : defaultGoals;
  
  return (
    <Card elevation={0} sx={{ bgcolor: 'background.paper', mb: 3 }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ color: '#00c853', mb: 2 }}>
          Savings Goals
        </Typography>
        
        {displayGoals.map((goal, index) => (
          <GoalProgressItem key={index} goal={goal} />
        ))}
      </CardContent>
    </Card>
  );
};

export default GoalProgress; 