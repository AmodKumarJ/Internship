import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import axios from "axios";

const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(" ");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username === '' || formData.password === '') {
      setError("Both fields are required. Please fill them.");
    } else {
      try { 
        const response = await axios.post('http://localhost:3000/user/signin', formData);
        if (response.data.token) {
          localStorage.setItem('userToken', response.data.token);
          setError(null);
          window.location.href = "/user/userpage"
        } else {
          setError("Error occurred. Please try again.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to sign in. Please try again.");
      }
    }
  };
  
  return (
    <div className="flex h-screen items-center justify-center ">
      <Container component="main" maxWidth="xs">
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{ fontWeight: "600" }}
        >
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Sign In
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Signin;
