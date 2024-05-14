import { useState } from "react";
import React from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import axios from "axios";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username === "" && formData.password === "") {
      setErrorMessage("Username and Password fields cannot be empty");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/admin/login",
          formData
        );
        if (response.status === 200) {
          // Successful login, store token in local storage
          localStorage.setItem("adminToken", response.data.token);
          window.location.href = "/admin";
        } else {
          // Unsuccessful login, set error message
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        // Handle network errors or server errors
        console.error("Error:", error);
        setErrorMessage(
          "Are you a admin if yes please enter the correct password and username"
        );
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
          Admin Login
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
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
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

export default AdminLogin;
