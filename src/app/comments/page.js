'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, TextField, Button, List, ListItem, Box } from '@mui/material';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const CommentsPage = () => {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const router = useRouter();

  // Check if the user is logged in
  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    const storedUsername = localStorage.getItem('username');

    if (!sessionId || !storedUsername) {
      // If no session is found, redirect to login
      router.push('/login');
    } else {
      setUsername(storedUsername);
    }
  }, [router]);

  useEffect(() => {
    // Fetch comments from the server
    const fetchComments = async () => {
      const response = await axios.get('http://localhost:3001/comments');
      setComments(response.data);
    };

    fetchComments();

    // Listen for new comments in real-time
    socket.on('newComment', (newComment) => {
      setComments((prevComments) => [...prevComments, newComment]);
    });

    return () => {
      socket.off('newComment');
    };
  }, []);

  const handlePostComment = async () => {
    if (!comment) return;

    const timestamp = new Date().toISOString();
    const newComment = { username, content: comment, timestamp };

    await axios.post('http://localhost:3001/comments', newComment);
    setComment('');
  };

  const handleLogout = () => {
    router.push('/logout');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8}}>
      <Typography variant="h4" gutterBottom>Comments</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" color="secondary">Welcome, {username}!</Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <strong>{comment.username}:</strong> {comment.content} <em>({comment.timestamp})</em>
          </ListItem>
        ))}
      </List>
      <TextField
        fullWidth
        label="Post a comment"
        variant="outlined"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: '20px' , width: 'auto'}}
        onClick={handlePostComment}
      >
        Post Comment
      </Button>
    </Container>
  );
};

export default CommentsPage;
