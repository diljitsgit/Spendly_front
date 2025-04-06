import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  useMediaQuery,
  useTheme,
  Switch,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  MonetizationOn as GoalsIcon,
  AccountBalanceWallet as BudgetIcon,
  Close as CloseIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Chat as ChatIcon,
  Receipt as TransactionsIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { currentUser, logout, isLoggedIn } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  console.log('Navbar: Auth state -', { isLoggedIn, currentUser });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleOpenUserMenu = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/login');
  };

  // Define navigation items
  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon />, alwaysVisible: true },
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, requiresAuth: true },
    { name: 'Budget', path: '/budget', icon: <BudgetIcon />, requiresAuth: true },
    { name: 'Goals', path: '/goals', icon: <GoalsIcon />, requiresAuth: true },
    { name: 'Transactions', path: '/transactions', icon: <TransactionsIcon />, requiresAuth: true },
    { name: 'AI Advisor', path: '/chat', icon: <ChatIcon />, requiresAuth: true }
  ];

  // Filter nav items based on auth status
  const visibleNavItems = navItems.filter(item => 
    item.alwaysVisible || (isLoggedIn && item.requiresAuth)
  );

  const drawer = (
    <Box sx={{ width: 250, backgroundColor: theme.palette.background.default, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" component="div" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Spendly
        </Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {visibleNavItems.map((item) => (
          <ListItem 
            button 
            key={item.name} 
            component={Link} 
            to={item.path}
            selected={isActive(item.path)}
            onClick={toggleDrawer(false)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(0, 200, 83, 0.1)',
                borderLeft: '4px solid',
                borderColor: 'primary.main'
              }
            }}
          >
            <ListItemIcon sx={{ color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.name} 
              primaryTypographyProps={{ 
                fontWeight: isActive(item.path) ? 'bold' : 'normal',
                color: isActive(item.path) ? 'primary.main' : 'inherit'
              }} 
            />
          </ListItem>
        ))}
        
        {!isLoggedIn && (
          <ListItem 
            button 
            component={Link} 
            to="/login"
            onClick={toggleDrawer(false)}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Sign In" />
          </ListItem>
        )}
        
        {isLoggedIn && (
          <ListItem 
            button 
            onClick={() => {
              toggleDrawer(false)();
              handleLogout();
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        )}
      </List>
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LightModeIcon />
          <Switch 
            checked={darkMode} 
            onChange={toggleDarkMode} 
            color="primary" 
          />
          <DarkModeIcon />
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton 
                color="inherit" 
                aria-label="open drawer" 
                edge="start" 
                onClick={toggleDrawer(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ color: 'primary.main', fontWeight: 'bold', flexGrow: 1 }}>
                Spendly
              </Typography>
              
              {isLoggedIn ? (
                <IconButton onClick={handleOpenUserMenu} color="inherit">
                  <Avatar 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      bgcolor: 'primary.main',
                      fontSize: '1rem'
                    }}
                  >
                    {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>
              ) : (
                <Button 
                  component={Link} 
                  to="/login" 
                  color="primary" 
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
              )}
            </>
          ) : (
            <>
              <Typography variant="h6" component="div" sx={{ color: 'primary.main', fontWeight: 'bold', mr: 4 }}>
                Spendly
              </Typography>
              <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                {visibleNavItems.map((item) => (
                  <Button 
                    key={item.name} 
                    component={Link} 
                    to={item.path}
                    color={isActive(item.path) ? 'primary' : 'inherit'}
                    sx={{ 
                      fontWeight: isActive(item.path) ? 'bold' : 'normal',
                      borderBottom: isActive(item.path) ? '2px solid' : 'none',
                      borderRadius: 0,
                      borderColor: 'primary.main',
                      textTransform: 'none',
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        borderBottom: '2px solid',
                        borderColor: 'primary.light'
                      }
                    }}
                    startIcon={item.icon}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LightModeIcon fontSize="small" sx={{ mr: 1 }} />
                  <Switch 
                    checked={darkMode} 
                    onChange={toggleDarkMode} 
                    color="primary" 
                    size="small"
                  />
                  <DarkModeIcon fontSize="small" sx={{ ml: 1 }} />
                </Box>
                
                {isLoggedIn ? (
                  <Box sx={{ ml: 2 }}>
                    <Button 
                      onClick={handleOpenUserMenu}
                      sx={{ 
                        textTransform: 'none', 
                        color: 'text.primary',
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }  
                      }}
                      startIcon={
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            bgcolor: 'primary.main',
                            fontSize: '1rem'
                          }}
                        >
                          {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
                        </Avatar>
                      }
                    >
                      {currentUser?.username || 'User'}
                    </Button>
                  </Box>
                ) : (
                  <Button 
                    component={Link} 
                    to="/login" 
                    variant="outlined" 
                    color="primary" 
                    startIcon={<LoginIcon />}
                  >
                    Sign In
                  </Button>
                )}
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      
      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawer}
      </Drawer>
      
      {/* User menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleCloseUserMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {currentUser?.username || 'User'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentUser?.email || ''}
          </Typography>
        </Box>
        <Divider />
        <MenuItem component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Dashboard</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Sign Out</Typography>
        </MenuItem>
      </Menu>
      
      <Toolbar /> {/* Empty toolbar to push content below the fixed AppBar */}
    </>
  );
};

export default Navbar; 