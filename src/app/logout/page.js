'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography } from '@mui/material';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('username');

    router.push('/');
  }, [router]);

  return (
    <Container maxWidth="sm" style={{ marginTop: '100px' }}>
      <Typography variant="h5" gutterBottom>You have been logged out.</Typography>
      <Typography variant="body1">Redirecting to login page...</Typography>
    </Container>
  );
};

export default LogoutPage;
