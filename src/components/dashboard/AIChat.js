import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  Paper,
  CircularProgress,
  Button
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { chatService } from '../../services/api';

const ChatMessage = ({ message, isUser = false }) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          maxWidth: '80%',
          borderRadius: '18px',
          backgroundColor: isUser ? 'primary.main' : 'background.default',
          color: isUser ? 'white' : 'text.primary',
          borderBottomRightRadius: isUser ? 0 : '18px',
          borderBottomLeftRadius: isUser ? '18px' : 0,
        }}
      >
        <Typography variant="body2" whiteSpace="pre-wrap">
          {message}
        </Typography>
      </Paper>
    </Box>
  );
};

const AIChat = () => {
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
        // Use a default user ID of 1 for now
        const userId = 1;
        const response = await chatService.getChatHistory(userId, 5); // Limit to 5 for dashboard widget
        
        if (response.success && response.data && response.data.length > 0) {
          // Convert the data to our message format
          const formattedMessages = response.data.map(item => ({
            text: item.message,
            isUser: item.sender === 'user'
          }));
          
          setMessages(formattedMessages);
        } else {
          // If no history or error, show welcome message
          setMessages([{ text: "Hi! I'm your finance buddy 🤖. Ask me anything!", isUser: false }]);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
        // Show welcome message on error
        setMessages([{ text: "Hi! I'm your finance buddy 🤖. Ask me anything!", isUser: false }]);
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
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setLoading(true);

    try {
      // Use a default user ID of 1 for now
      const response = await chatService.sendMessage(1, userMessage);
      
      setMessages(prev => [
        ...prev, 
        { text: response.response || "Sorry, I couldn't process that request.", isUser: false }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev, 
        { text: "Sorry, I couldn't connect to the server. Please try again later.", isUser: false }
      ]);
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

  return (
    <Card elevation={0} sx={{ bgcolor: 'background.paper', mb: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="h2" sx={{ color: '#00c853', mb: 2 }}>
          Spendly Chat
        </Typography>
        
        <Box sx={{ 
          flexGrow: 1, 
          overflow: 'auto', 
          mb: 2,
          maxHeight: '300px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {loadingHistory ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress size={20} color="primary" />
            </Box>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage 
                  key={index} 
                  message={message.text} 
                  isUser={message.isUser} 
                />
              ))}
            </>
          )}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
              <CircularProgress size={20} color="primary" />
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>
        
        <Box 
          component="form" 
          onSubmit={handleSendMessage} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            backgroundColor: 'background.default',
            borderRadius: 3,
            p: 1
          }}
        >
          <TextField
            fullWidth
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading || loadingHistory}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            sx={{ ml: 1 }}
          />
          <IconButton 
            color="primary" 
            type="submit" 
            disabled={loading || loadingHistory || !input.trim()}
            sx={{ ml: 1 }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AIChat; 