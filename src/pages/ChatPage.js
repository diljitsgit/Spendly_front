import React, { useState, useRef, useEffect } from 'react';
import {
  Box, 
  Typography,
  TextField,
  IconButton,
  Paper,
  CircularProgress,
  Grid,
  Divider,
  Card,
  CardContent,
  Chip,
  Avatar
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  AccountCircle as UserIcon
} from '@mui/icons-material';
import { chatService } from '../services/api';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const messagesEndRef = useRef(null);

  // Fetch chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        setLoadingHistory(true);
        const userId = 1; // Replace with actual user ID when auth is implemented
        const response = await chatService.getChatHistory(userId);
        
        if (response.success && response.data) {
          // Convert the data to our message format
          const formattedMessages = response.data.map(item => ({
            text: item.message,
            isUser: item.sender === 'user',
            timestamp: item.timestamp
          }));
          
          setMessages(formattedMessages);
        } else {
          // If no history or error, show welcome message
          setMessages([{ 
            text: "Hi! I'm your AI financial advisor. I can help you make smart spending decisions, understand your budget, and reach your financial goals. How can I assist you today?", 
            isUser: false,
            timestamp: new Date().toISOString()
          }]);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
        // Show welcome message on error
        setMessages([{ 
          text: "Hi! I'm your AI financial advisor. I can help you make smart spending decisions, understand your budget, and reach your financial goals. How can I assist you today?", 
          isUser: false,
          timestamp: new Date().toISOString()
        }]);
      } finally {
        setLoadingHistory(false);
      }
    };
    
    fetchChatHistory();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    
    // Add user message to chat
    const newUserMessage = {
      text: userMessage,
      isUser: true,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setLoading(true);

    try {
      // Use the current user's ID from auth context
      const userId = 1; // Replace with actual user ID when auth is implemented
      const response = await chatService.sendMessage(userId, userMessage);
      
      const botMessage = {
        text: response.response || "Sorry, I couldn't process that request. Please try again.",
        isUser: false,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        text: "Sorry, I couldn't connect to the server. Please try again later.",
        isUser: false,
        timestamp: new Date().toISOString(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        AI Financial Advisor
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card 
            elevation={0} 
            sx={{ 
              height: 'calc(100vh - 200px)', 
              display: 'flex', 
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: 2, flexGrow: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{ 
                    bgcolor: 'primary.main',
                    width: 32,
                    height: 32,
                    mr: 1
                  }}
                >
                  <BotIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6">
                  Financial Advisor
                </Typography>
              </Box>
              <Divider />
            </CardContent>
            
            <Box sx={{ 
              p: 2, 
              flexGrow: 1, 
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              {loadingHistory ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress size={40} />
                  <Typography variant="body1" color="text.secondary" sx={{ ml: 2 }}>
                    Loading conversation history...
                  </Typography>
                </Box>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <Box 
                      key={index} 
                      sx={{
                        display: 'flex',
                        flexDirection: message.isUser ? 'row-reverse' : 'row',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Avatar
                        sx={{ 
                          bgcolor: message.isUser ? 'secondary.main' : 'primary.main',
                          width: 32,
                          height: 32,
                          mx: 1,
                          mt: 0.5
                        }}
                      >
                        {message.isUser ? <UserIcon fontSize="small" /> : <BotIcon fontSize="small" />}
                      </Avatar>
                      
                      <Box>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            backgroundColor: message.isUser ? 'secondary.main' : 'background.default',
                            color: message.isUser ? 'white' : 'text.primary',
                            borderRadius: '16px',
                            borderBottomRightRadius: message.isUser ? 0 : '16px',
                            borderBottomLeftRadius: message.isUser ? '16px' : 0,
                          }}
                        >
                          <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap' }}>
                            {message.text}
                          </Typography>
                        </Paper>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            ml: message.isUser ? 0 : 1,
                            mr: message.isUser ? 1 : 0,
                            mt: 0.5,
                            display: 'block',
                            textAlign: message.isUser ? 'right' : 'left',
                            color: 'text.secondary'
                          }}
                        >
                          {formatTimestamp(message.timestamp)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </>
              )}
              
              {loading && (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 7 }}>
                  <CircularProgress size={20} sx={{ mr: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Assistant is thinking...
                  </Typography>
                </Box>
              )}
              
              <div ref={messagesEndRef} />
            </Box>
            
            <CardContent sx={{ p: 2, flexGrow: 0 }}>
              <Divider sx={{ mb: 2 }} />
              <Box 
                component="form" 
                onSubmit={handleSendMessage} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  backgroundColor: 'background.default',
                  borderRadius: 4,
                  p: 1
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Ask me anything about your finances..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={{ ml: 1 }}
                />
                <IconButton 
                  color="primary" 
                  type="submit" 
                  disabled={loading || !input.trim()}
                  sx={{ ml: 1 }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Suggested Questions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Chip 
                  label="Should I buy a new phone for ₹45,000?" 
                  onClick={() => {
                    setInput("Should I buy a new phone for ₹45,000?");
                  }}
                  sx={{ 
                    borderRadius: 2,
                    py: 2,
                    justifyContent: 'flex-start',
                    cursor: 'pointer'
                  }}
                />
                <Chip 
                  label="Is spending ₹15,000 on groceries reasonable?" 
                  onClick={() => {
                    setInput("Is spending ₹15,000 on groceries reasonable?");
                  }}
                  sx={{ 
                    borderRadius: 2,
                    py: 2,
                    justifyContent: 'flex-start',
                    cursor: 'pointer'
                  }}
                />
                <Chip 
                  label="What should be my monthly savings goal?" 
                  onClick={() => {
                    setInput("What should be my monthly savings goal?");
                  }}
                  sx={{ 
                    borderRadius: 2,
                    py: 2,
                    justifyContent: 'flex-start',
                    cursor: 'pointer'
                  }}
                />
                <Chip 
                  label="Is a 3-year car loan better than a 5-year one?" 
                  onClick={() => {
                    setInput("Is a 3-year car loan better than a 5-year one?");
                  }}
                  sx={{ 
                    borderRadius: 2,
                    py: 2,
                    justifyContent: 'flex-start',
                    cursor: 'pointer'
                  }}
                />
              </Box>
            </CardContent>
          </Card>
          
          <Card elevation={0}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                How I Can Help
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                  <Chip 
                    label="1" 
                    sx={{ bgcolor: 'primary.main', color: 'white', height: 24, width: 24 }} 
                  />
                  <Typography variant="body2">
                    Analyze if a purchase aligns with your budget and financial goals
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                  <Chip 
                    label="2" 
                    sx={{ bgcolor: 'primary.main', color: 'white', height: 24, width: 24 }} 
                  />
                  <Typography variant="body2">
                    Provide budget recommendations and spending insights
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                  <Chip 
                    label="3" 
                    sx={{ bgcolor: 'primary.main', color: 'white', height: 24, width: 24 }} 
                  />
                  <Typography variant="body2">
                    Help you understand financial concepts and make informed decisions
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <Chip 
                    label="4" 
                    sx={{ bgcolor: 'primary.main', color: 'white', height: 24, width: 24 }} 
                  />
                  <Typography variant="body2">
                    Suggest ways to optimize your finances and reach goals faster
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatPage; 