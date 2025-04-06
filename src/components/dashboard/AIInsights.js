import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  FastfoodOutlined as FoodIcon,
  LightbulbOutlined as TipIcon,
  EmojiEventsOutlined as AchievementIcon
} from '@mui/icons-material';

const AIInsights = ({ insights = [] }) => {
  // Default insights if none provided
  const defaultInsights = [
    { 
      type: 'warning', 
      icon: <FoodIcon />, 
      text: "You've spent ₹2000 on food delivery this week!" 
    },
    { 
      type: 'tip', 
      icon: <TipIcon />, 
      text: "Try cooking twice to save ₹600" 
    },
    { 
      type: 'achievement', 
      icon: <AchievementIcon />, 
      text: "Save ₹100 more to unlock your badge!" 
    }
  ];

  const displayInsights = insights.length > 0 ? insights : defaultInsights;

  // Map insight type to color
  const getColorByType = (type) => {
    switch (type) {
      case 'warning':
        return '#ffc107';
      case 'tip':
        return '#00c853';
      case 'achievement':
        return '#ff9800';
      default:
        return '#00c853';
    }
  };

  // Map insight type to icon
  const getIconByType = (type, customIcon) => {
    if (customIcon) return customIcon;
    
    switch (type) {
      case 'warning':
        return <FoodIcon />;
      case 'tip':
        return <TipIcon />;
      case 'achievement':
        return <AchievementIcon />;
      default:
        return <TipIcon />;
    }
  };

  return (
    <Card elevation={0} sx={{ bgcolor: 'background.paper', mb: 3 }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ color: '#00c853', mb: 2 }}>
          AI Nudges
        </Typography>
        <List sx={{ p: 0 }}>
          {displayInsights.map((insight, index) => (
            <ListItem 
              key={index}
              alignItems="flex-start"
              sx={{ 
                px: 0, 
                py: 1,
                borderBottom: index < displayInsights.length - 1 ? '1px solid' : 'none',
                borderColor: 'background.default'
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: getColorByType(insight.type) }}>
                {getIconByType(insight.type, insight.icon)}
              </ListItemIcon>
              <ListItemText 
                primary={insight.text}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default AIInsights; 