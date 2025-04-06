import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import BudgetPage from './pages/BudgetPage';
import GoalsPage from './pages/GoalsPage';
import ChatPage from './pages/ChatPage';
import TransactionsPage from './pages/TransactionsPage';
import LoginPage from './pages/auth/LoginPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/globals.css';

// Private route component that redirects to login if not authenticated
const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/budget" 
        element={
          <PrivateRoute>
            <BudgetPage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/goals" 
        element={
          <PrivateRoute>
            <GoalsPage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/transactions" 
        element={
          <PrivateRoute>
            <TransactionsPage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/chat" 
        element={
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
