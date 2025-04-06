import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Box, 
  Divider,
  Link,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/api';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear validation error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!isLogin && !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isLogin && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      if (isLogin) {
        // Login using Auth context
        await login(formData.username, formData.password);
        
        setAlert({
          open: true,
          message: 'Login successful!',
          severity: 'success'
        });
        
        // Navigate to dashboard immediately
        navigate('/dashboard');
      } else {
        // Register
        const userData = {
          username: formData.username,
          email: formData.email,
          password: formData.password
        };
        
        const response = await userService.createUser(userData);
        
        if (response.status === 'success') {
          setAlert({
            open: true,
            message: 'Account created successfully! Please sign in.',
            severity: 'success'
          });
          
          // Switch to login mode
          setIsLogin(true);
          setFormData({
            ...formData,
            email: ''
          });
        } else {
          throw new Error(response.error || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setAlert({
        open: true,
        message: error.response?.data?.error || error.message || 'An error occurred during authentication',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({
      ...alert,
      open: false
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            mb: 2,
            '&:hover': {
              bgcolor: 'primary.dark'
            }
          }}
          size="large"
        >
          {isLogin ? <LoginIcon /> : <PersonAddIcon />}
        </IconButton>
        <Typography component="h1" variant="h5">
          {isLogin ? 'Sign In' : 'Create Account'}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 3 }}>
          {isLogin ? 'Welcome back to Spendly!' : 'Join Spendly to manage your finances'}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleInputChange}
            error={Boolean(errors.username)}
            helperText={errors.username}
          />
          
          {!isLogin && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          )}
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            value={formData.password}
            onChange={handleInputChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={loading}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
          
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="textSecondary">
              OR
            </Typography>
          </Divider>
          
          <Grid container justifyContent="center">
            <Grid item>
              <Link 
                component="button" 
                variant="body2" 
                onClick={toggleMode}
                underline="hover"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.severity}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage; 