import React, { useState, useEffect } from "react";
import { Typography, Button, Card, CardContent, Grid, CardActions } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminHome = () => {
  const [elections, setElections] = useState([]);

  useEffect(() => {
   
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("adminToken");
      // Set token in request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // Send request with token in headers
      const response = await axios.get(
        "http://localhost:3000/admin/ballots",
        config
      );
      setElections(response.data);
    } catch (error) {
      console.error("Error fetching elections:", error.response.data);
    }
  };

  return (
    <div className="homepage flex flex-col justify-center items-center h-screen gap-5">
      <div className="bg-gray-400 w-full h-full absolute opacity-70"></div>
      <Typography
        variant="h3"
        align="center"
        sx={{ fontWeight: "600", zIndex: 10 }}
      >
        Welcome to the admin Home page!
      </Typography>
      <Button
        color="primary"
        component={Link}
        to="/admin/ballot-creation"
        startIcon={<AddCircleIcon fontSize="large" />}
        variant="contained"
        size="large"
      >
        Create Election
      </Button>
      <Grid container spacing={3} justifyContent="center" zIndex={10}>
        {elections.map((election) => (
          <Grid item key={election._id}>
            <Card sx={{ maxWidth: 300 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {election.electionName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start Date: {new Date(election.startDate).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  End Date: {new Date(election.endDate).toLocaleString()}
                </Typography>
                {/* You can add more details here if needed */}
              </CardContent>
              <CardActions>
                <Button size="small"
                component={Link}
                to={`/admin/election/${election._id}`}
                >Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AdminHome;
