'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button, List, ListItem, Box } from '@mui/material';
import axios from 'axios';

const HomePage = () => {
  const [comments, setComments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/comments');
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" mt={4} gutterBottom>All Comments</Typography>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <strong>{comment.username}:</strong> {comment.content} <em>({new Date(comment.timestamp).toLocaleString()})</em>
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login to Post Comments
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
