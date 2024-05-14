import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    };

    axios.post('http://localhost:3000/user/register', user)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('token', token); // Store token in localStorage
        console.log('User registered successfully');
        window.location.href='/user/userpage'
        // You may redirect to another page upon successful registration if needed
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='flex h-screen items-center justify-center '>
      <Container component="main" maxWidth="xs">
        <Typography variant="h5" align="center" gutterBottom style={{ fontWeight: "600" }}>
          Register
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Register
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Register;
