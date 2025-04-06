import axios from 'axios';

// Define API base URL - change this to your production URL when deploying
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-backend-url.com' // Change this to your production URL
  : 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 seconds timeout for slower connections
});

// Chat service
export const chatService = {
  sendMessage: async (userId, message) => {
    try {
      const response = await api.post('/chat', {
        userId: userId,
        message: message
      });
      return response.data;
    } catch (error) {
      console.error('Chat API Error:', error);
      throw error;
    }
  },
  
  getChatHistory: async (userId, limit = 50) => {
    try {
      const response = await api.get('/chat/history', {
        params: {
          userId: userId,
          limit: limit
        }
      });
      return response.data;
    } catch (error) {
      console.error('Chat History API Error:', error);
      throw error;
    }
  }
};

// Budget service
export const budgetService = {
  createBudget: async (budgetData) => {
    try {
      const response = await api.post('/budget', budgetData);
      return response.data;
    } catch (error) {
      console.error('Budget API Error:', error);
      throw error;
    }
  },
  getBudgets: async (userId) => {
    try {
      const response = await api.get(`/budget/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Get Budgets Error:', error);
      throw error;
    }
  },
  getBudgetProgress: async (userId, category) => {
    try {
      const url = category 
        ? `/budget/progress/${userId}?category=${category}`
        : `/budget/progress/${userId}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Budget Progress Error:', error);
      throw error;
    }
  }
};

// Financial goals service
export const goalService = {
  createGoal: async (goalData) => {
    try {
      const response = await api.post('/goal', goalData);
      return response.data;
    } catch (error) {
      console.error('Goal API Error:', error);
      throw error;
    }
  },
  getGoals: async (userId) => {
    try {
      const response = await api.get(`/goal/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Get Goals Error:', error);
      throw error;
    }
  },
  updateGoal: async (userId, goalId, currentAmount) => {
    try {
      const response = await api.put(`/goal/${userId}/${goalId}`, {
        current_amount: currentAmount
      });
      return response.data;
    } catch (error) {
      console.error('Update Goal Error:', error);
      throw error;
    }
  }
};

// User service
export const userService = {
  createUser: async (userData) => {
    try {
      const response = await api.post('/user', userData);
      return response.data;
    } catch (error) {
      console.error('User API Error:', error);
      throw error;
    }
  },
  login: async (username, password) => {
    try {
      const response = await api.post('/login', { username, password });
      
      // Store user in local storage if login successful
      if (response.data.status === 'success') {
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  },
  logout: () => {
    // Remove user from local storage
    localStorage.removeItem('currentUser');
  },
  getCurrentUser: () => {
    // Get current user from local storage
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }
};

// Transaction service
export const transactionService = {
  createTransaction: async (transactionData) => {
    try {
      const response = await api.post('/transaction', transactionData);
      return response.data;
    } catch (error) {
      console.error('Transaction API Error:', error);
      throw error;
    }
  },
  getTransactions: async (userId, limit = 10, offset = 0, category) => {
    try {
      let url = `/transaction/${userId}?limit=${limit}`;
      if (offset > 0) {
        url += `&offset=${offset}`;
      }
      if (category) {
        url += `&category=${category}`;
      }
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Get Transactions Error:', error);
      throw error;
    }
  },
  getTransactionStats: async (userId, period = 'month') => {
    try {
      const response = await api.get(`/dashboard/${userId}?period=${period}`);
      return response.data;
    } catch (error) {
      console.error('Transaction Stats Error:', error);
      throw error;
    }
  }
};

export default api; 