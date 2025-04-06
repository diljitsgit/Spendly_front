import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  LinearProgress 
} from '@mui/material';

const BudgetProgressItem = ({ title, value = 0, max = 100, warning = 80, danger = 90 }) => {
  const progress = (value / max) * 100;
  let color = 'primary';
  
  if (progress >= danger) {
    color = 'error';
  } else if (progress >= warning) {
    color = 'warning';
  }
  
  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" fontWeight="medium">
          ₹{value} / ₹{max}
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={Math.min(progress, 100)} 
        color={color}
        sx={{ 
          height: 8, 
          borderRadius: 4,
          bgcolor: 'background.default',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
          }
        }}
      />
    </Box>
  );
};

const BudgetProgress = ({ items = [] }) => {
  // Default items if none provided
  const defaultItems = [
    { title: 'Weekly Budget', value: 65, max: 100 },
    { title: 'Food Delivery Spend', value: 85, max: 100, warning: 70, danger: 80 }
  ];
  
  const displayItems = items.length > 0 ? items : defaultItems;
  
  return (
    <Card elevation={0} sx={{ bgcolor: 'background.paper', mb: 3 }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ color: '#00c853', mb: 2 }}>
          Progress
        </Typography>
        
        {displayItems.map((item, index) => (
          <BudgetProgressItem 
            key={index}
            title={item.title}
            value={item.value}
            max={item.max}
            warning={item.warning}
            danger={item.danger}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default BudgetProgress; 