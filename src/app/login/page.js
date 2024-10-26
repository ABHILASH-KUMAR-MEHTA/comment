"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField, Container, Typography } from "@mui/material";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!username) {
      alert("Please enter a username");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        username,
      });
      const { sessionId } = response.data;

      localStorage.setItem("sessionId", sessionId);
      localStorage.setItem("username", username);

      router.push("/comments");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "100px" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        className="abhi"
        fullWidth
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "20px", padding: "10px" }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Container>
  );
};

export default LoginPage;
