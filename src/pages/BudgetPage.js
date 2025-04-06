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
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { budgetService } from '../services/api';

const BudgetPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly',
    start_date: new Date(),
    end_date: null,
  });

  // Sample budget categories
  const categories = [
    'Food', 'Entertainment', 'Housing', 'Transportation',
    'Healthcare', 'Education', 'Shopping', 'Travel', 'Other'
  ];

  // Load budgets on component mount
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        setLoading(true);
        // Mock data for demonstration purposes
        // In a real app, you would call the budget service
        // const response = await budgetService.getBudgets(1);
        setTimeout(() => {
          const mockBudgets = [
            {
              id: 1,
              category: 'Food',
              amount: 10000,
              spent: 7500,
              remaining: 2500,
              period: 'monthly',
              start_date: '2023-04-01',
              end_date: '2023-04-30'
            },
            {
              id: 2,
              category: 'Entertainment',
              amount: 5000,
              spent: 2000,
              remaining: 3000,
              period: 'monthly',
              start_date: '2023-04-01',
              end_date: '2023-04-30'
            },
            {
              id: 3,
              category: 'Transportation',
              amount: 3000,
              spent: 2800,
              remaining: 200,
              period: 'monthly',
              start_date: '2023-04-01',
              end_date: '2023-04-30'
            },
            {
              id: 4,
              category: 'Shopping',
              amount: 8000,
              spent: 1500,
              remaining: 6500,
              period: 'monthly',
              start_date: '2023-04-01',
              end_date: '2023-04-30'
            }
          ];
          setBudgets(mockBudgets);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error loading budgets:', err);
        setError('Failed to load budgets. Please try again.');
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      category: '',
      amount: '',
      period: 'monthly',
      start_date: new Date(),
      end_date: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCreateBudget = async (e) => {
    e.preventDefault();
    
    try {
      // Format dates for API
      const formattedData = {
        ...formData,
        user_id: 1, // Using a default user ID
        start_date: formData.start_date.toISOString().split('T')[0],
        end_date: formData.end_date ? formData.end_date.toISOString().split('T')[0] : null,
        amount: Number(formData.amount)
      };
      
      // In a real app, you would call the budget service
      // const response = await budgetService.createBudget(formattedData);
      
      // Simulate API call
      setTimeout(() => {
        const newBudget = {
          id: budgets.length + 1,
          ...formattedData,
          spent: 0,
          remaining: Number(formData.amount)
        };
        
        setBudgets([...budgets, newBudget]);
        handleCloseDialog();
      }, 500);
      
    } catch (err) {
      console.error('Error creating budget:', err);
      setError('Failed to create budget. Please try again.');
    }
  };

  // Calculate the percentage spent
  const calculatePercentage = (spent, total) => {
    return (spent / total) * 100;
  };

  // Determine color based on percentage spent
  const getColorByPercentage = (percentage) => {
    if (percentage >= 90) return 'error';
    if (percentage >= 70) return 'warning';
    return 'primary';
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
          Budget Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Create Budget
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {budgets.map((budget) => {
          const percentage = calculatePercentage(budget.spent, budget.amount);
          const color = getColorByPercentage(percentage);
          
          return (
            <Grid item xs={12} sm={6} md={4} key={budget.id}>
              <Card elevation={0} sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" component="h2">
                      {budget.category}
                    </Typography>
                    <IconButton size="small">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}>
                      ₹{budget.amount.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {budget.period.charAt(0).toUpperCase() + budget.period.slice(1)} Budget
                    </Typography>
                  </Box>
                  
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(percentage, 100)}
                    color={color}
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
                      Spent: ₹{budget.spent.toLocaleString()}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color={budget.remaining > 0 ? 'success.main' : 'error.main'}
                      fontWeight="medium"
                    >
                      Remaining: ₹{budget.remaining.toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Create Budget Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Budget</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    label="Category"
                    required
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  InputProps={{ startAdornment: '₹' }}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="period-label">Period</InputLabel>
                  <Select
                    labelId="period-label"
                    name="period"
                    value={formData.period}
                    onChange={handleInputChange}
                    label="Period"
                    required
                  >
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="quarterly">Quarterly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    value={formData.start_date}
                    onChange={(value) => handleDateChange('start_date', value)}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Date (Optional)"
                    value={formData.end_date}
                    onChange={(value) => handleDateChange('end_date', value)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreateBudget} variant="contained" color="primary">
            Create Budget
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BudgetPage; 