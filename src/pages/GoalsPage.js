import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Chip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  PhoneIphone as PhoneIcon,
  Flight as TravelIcon,
  School as EducationIcon,
  Home as HomeIcon,
  DirectionsCar as CarIcon,
  ShoppingBag as ShoppingIcon,
  LocalHospital as HealthIcon,
  CreditCard as DebtIcon,
  EventNote as EventIcon
} from '@mui/icons-material';
import { goalService } from '../services/api';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    goal_name: '',
    target_amount: '',
    current_amount: 0,
    deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    category: 'other',
    icon: 'event'
  });

  // Sample goal categories
  const categories = [
    { value: 'electronics', label: 'Electronics', icon: <PhoneIcon /> },
    { value: 'travel', label: 'Travel', icon: <TravelIcon /> },
    { value: 'education', label: 'Education', icon: <EducationIcon /> },
    { value: 'housing', label: 'Housing', icon: <HomeIcon /> },
    { value: 'vehicle', label: 'Vehicle', icon: <CarIcon /> },
    { value: 'shopping', label: 'Shopping', icon: <ShoppingIcon /> },
    { value: 'health', label: 'Health', icon: <HealthIcon /> },
    { value: 'debt', label: 'Debt Repayment', icon: <DebtIcon /> },
    { value: 'other', label: 'Other', icon: <EventIcon /> }
  ];

  // Load goals on component mount
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        // Mock data for demonstration purposes
        // In a real app, you would call the goal service
        // const response = await goalService.getGoals(1);
        setTimeout(() => {
          const mockGoals = [
            {
              id: 1,
              goal_name: 'New iPhone',
              target_amount: 80000,
              current_amount: 45000,
              deadline: '2023-08-15',
              category: 'electronics',
              icon: 'phone'
            },
            {
              id: 2,
              goal_name: 'Trip to Bali',
              target_amount: 200000,
              current_amount: 120000,
              deadline: '2023-12-01',
              category: 'travel',
              icon: 'flight'
            },
            {
              id: 3,
              goal_name: 'Coding Bootcamp',
              target_amount: 50000,
              current_amount: 30000,
              deadline: '2023-06-30',
              category: 'education',
              icon: 'school'
            },
            {
              id: 4,
              goal_name: 'Emergency Fund',
              target_amount: 300000,
              current_amount: 75000,
              deadline: '2024-01-01',
              category: 'other',
              icon: 'event'
            }
          ];
          setGoals(mockGoals);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error loading goals:', err);
        setError('Failed to load goals. Please try again.');
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      goal_name: '',
      target_amount: '',
      current_amount: 0,
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)),
      category: 'other',
      icon: 'event'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (value) => {
    setFormData({
      ...formData,
      deadline: value
    });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    let icon = 'event';
    
    // Set icon based on category
    switch (category) {
      case 'electronics':
        icon = 'phone';
        break;
      case 'travel':
        icon = 'flight';
        break;
      case 'education':
        icon = 'school';
        break;
      case 'housing':
        icon = 'home';
        break;
      case 'vehicle':
        icon = 'car';
        break;
      case 'shopping':
        icon = 'shopping';
        break;
      case 'health':
        icon = 'health';
        break;
      case 'debt':
        icon = 'credit';
        break;
      default:
        icon = 'event';
    }
    
    setFormData({
      ...formData,
      category,
      icon
    });
  };

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    
    try {
      // Format dates for API
      const formattedData = {
        ...formData,
        user_id: 1, // Using a default user ID
        deadline: formData.deadline.toISOString().split('T')[0],
        target_amount: Number(formData.target_amount),
        current_amount: Number(formData.current_amount)
      };
      
      // In a real app, you would call the goal service
      // const response = await goalService.createGoal(formattedData);
      
      // Simulate API call
      setTimeout(() => {
        const newGoal = {
          id: goals.length + 1,
          ...formattedData,
        };
        
        setGoals([...goals, newGoal]);
        handleCloseDialog();
      }, 500);
      
    } catch (err) {
      console.error('Error creating goal:', err);
      setError('Failed to create goal. Please try again.');
    }
  };

  // Calculate the percentage progress
  const calculateProgress = (current, target) => {
    return (current / target) * 100;
  };

  // Get icon component based on icon string
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'phone':
        return <PhoneIcon />;
      case 'flight':
        return <TravelIcon />;
      case 'school':
        return <EducationIcon />;
      case 'home':
        return <HomeIcon />;
      case 'car':
        return <CarIcon />;
      case 'shopping':
        return <ShoppingIcon />;
      case 'health':
        return <HealthIcon />;
      case 'credit':
        return <DebtIcon />;
      default:
        return <EventIcon />;
    }
  };

  // Format date string to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Financial Goals
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Add Goal
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {goals.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            You don't have any financial goals yet
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          >
            Create Your First Goal
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {goals.map((goal) => {
            const progress = calculateProgress(goal.current_amount, goal.target_amount);
            
            return (
              <Grid item xs={12} sm={6} md={4} key={goal.id}>
                <Card elevation={0} sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ color: 'primary.main', mr: 1 }}>
                          {getIconComponent(goal.icon)}
                        </Box>
                        <Typography variant="h6" component="h2">
                          {goal.goal_name}
                        </Typography>
                      </Box>
                      <IconButton size="small">
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}>
                        ₹{goal.target_amount.toLocaleString()}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          Target Amount
                        </Typography>
                        <Chip 
                          label={`Due: ${formatDate(goal.deadline)}`} 
                          size="small" 
                          sx={{ 
                            backgroundColor: 'background.default',
                            fontSize: '0.7rem'
                          }}
                        />
                      </Box>
                    </Box>
                    
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(progress, 100)}
                      color="primary"
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        mb: 1,
                        backgroundColor: 'background.default',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                        }
                      }}
                    />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Progress: {progress.toFixed(0)}%
                      </Typography>
                      <Typography 
                        variant="body2" 
                        fontWeight="medium"
                      >
                        ₹{goal.current_amount.toLocaleString()} / ₹{goal.target_amount.toLocaleString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Create Goal Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Financial Goal</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Goal Name"
                  name="goal_name"
                  value={formData.goal_name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    value={formData.category}
                    onChange={handleCategoryChange}
                    label="Category"
                    required
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat.value} value={cat.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ mr: 1 }}>
                            {cat.icon}
                          </Box>
                          {cat.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Target Amount"
                  name="target_amount"
                  type="number"
                  value={formData.target_amount}
                  onChange={handleInputChange}
                  InputProps={{ startAdornment: '₹' }}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Current Amount (Optional)"
                  name="current_amount"
                  type="number"
                  value={formData.current_amount}
                  onChange={handleInputChange}
                  InputProps={{ startAdornment: '₹' }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Target Date"
                    value={formData.deadline}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                    minDate={new Date()}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleCreateGoal} 
            variant="contained" 
            color="primary"
            disabled={!formData.goal_name || !formData.target_amount}
          >
            Create Goal
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GoalsPage; 