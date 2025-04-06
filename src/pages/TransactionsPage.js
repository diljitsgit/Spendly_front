import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Paper, Grid, Button, TextField, 
  MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, TablePagination, Divider, IconButton, Chip, Snackbar, Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AddIcon from '@mui/icons-material/Add';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { format } from 'date-fns';

// Import API services
import { budgetService, transactionService } from '../services/api';

const TransactionsPage = () => {
  // User ID (this would come from authentication in a real app)
  const userId = 2;

  // State for transaction form
  const [formData, setFormData] = useState({
    item: '',
    category: '',
    amount: '',
    date: new Date(),
    label: ''
  });

  // State for transaction history
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalTransactions, setTotalTransactions] = useState(0);

  // State for category options
  const [categories, setCategories] = useState([]);

  // State for alert
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Form to add a new transaction
  const [formOpen, setFormOpen] = useState(false);

  const categoryOptions = [
    'Food',
    'Entertainment',
    'Transportation',
    'Housing',
    'Utilities',
    'Healthcare',
    'Education',
    'Electronics',
    'Clothing',
    'Travel',
    'Financial',
    'Miscellaneous'
  ];

  // Fetch transactions when component mounts
  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, [page, rowsPerPage]);

  // Fetch transactions from API
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await transactionService.getTransactions(userId, rowsPerPage, page * rowsPerPage);
      
      if (data && data.status === 'success') {
        setTransactions(data.transactions || []);
        setTotalTransactions(data.total_count || 0);
      } else {
        console.error('Failed to fetch transactions:', data?.error || 'Unknown error');
        setAlert({
          open: true,
          message: data?.error || 'Failed to load transaction history. Please try again.',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Network error';
      setAlert({
        open: true,
        message: `Error loading transactions: ${errorMessage}. Please check your connection.`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch budget categories
  const fetchBudgets = async () => {
    try {
      const budgets = await budgetService.getBudgets(userId);
      const categories = budgets.map(budget => budget.category);
      setCategories(categories);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle date change
  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      date: newDate
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.item || !formData.category || !formData.amount) {
      setAlert({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'warning'
      });
      return;
    }

    setLoading(true);
    try {
      // Prepare transaction data
      const transactionData = {
        user_id: userId,
        item: formData.item,
        category: formData.category,
        amount: parseFloat(formData.amount),
        date: format(formData.date, 'yyyy-MM-dd'),
        label: formData.label || undefined
      };

      // Send transaction to API
      const data = await transactionService.createTransaction(transactionData);

      if (data && data.status === 'success') {
        // Reset form
        setFormData({
          item: '',
          category: '',
          amount: '',
          date: new Date(),
          label: ''
        });
        
        // Close form
        setFormOpen(false);
        
        // Show success message
        setAlert({
          open: true,
          message: 'Transaction recorded successfully!',
          severity: 'success'
        });
        
        // Refresh transaction list
        fetchTransactions();
      } else {
        setAlert({
          open: true,
          message: data?.error || 'Failed to record transaction. Please try again.',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error recording transaction:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Network error';
      setAlert({
        open: true,
        message: `Error recording transaction: ${errorMessage}. Please try again.`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Close alert
  const handleCloseAlert = () => {
    setAlert({
      ...alert,
      open: false
    });
  };

  // Get category color based on category name
  const getCategoryColor = (category) => {
    const colorMap = {
      'Food': '#4caf50',
      'Entertainment': '#9c27b0',
      'Transportation': '#2196f3',
      'Housing': '#ff9800',
      'Utilities': '#607d8b',
      'Healthcare': '#f44336',
      'Education': '#3f51b5',
      'Electronics': '#00bcd4',
      'Clothing': '#e91e63',
      'Travel': '#795548',
      'Financial': '#ffeb3b',
      'Miscellaneous': '#9e9e9e'
    };
    
    return colorMap[category] || '#9e9e9e';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4" component="h1" gutterBottom>
              Transactions
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              onClick={() => setFormOpen(!formOpen)}
            >
              {formOpen ? 'Cancel' : 'Record Transaction'}
            </Button>
          </Box>
          <Divider />
        </Grid>

        {/* Transaction Form */}
        {formOpen && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Record New Transaction
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      label="Item Description"
                      name="item"
                      value={formData.item}
                      onChange={handleInputChange}
                      placeholder="e.g., Groceries, Movie Tickets"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      select
                      label="Category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      {(categories.length > 0 ? categories : categoryOptions).map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      label="Amount (₹)"
                      name="amount"
                      type="number"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="e.g., 1500"
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Transaction Date"
                        value={formData.date}
                        onChange={handleDateChange}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Label (Optional)"
                      name="label"
                      value={formData.label}
                      onChange={handleInputChange}
                      placeholder="e.g., Monthly groceries, Business expense"
                      helperText="Add a label to categorize this transaction further"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                      >
                        Record Transaction
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        )}

        {/* Transaction History */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Transaction History
            </Typography>
            
            <TableContainer>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Label</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        Loading transactions...
                      </TableCell>
                    </TableRow>
                  ) : transactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No transactions found. Record your first transaction!
                      </TableCell>
                    </TableRow>
                  ) : (
                    transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {transaction.date ? format(new Date(transaction.date), 'MMM dd, yyyy') : 'N/A'}
                        </TableCell>
                        <TableCell>{transaction.item}</TableCell>
                        <TableCell>
                          <Chip 
                            label={transaction.category}
                            size="small"
                            sx={{ 
                              bgcolor: getCategoryColor(transaction.category),
                              color: 'white'
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">₹{transaction.amount.toLocaleString()}</TableCell>
                        <TableCell>{transaction.label || '-'}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
              component="div"
              count={totalTransactions}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Alert Snackbar */}
      <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TransactionsPage; 