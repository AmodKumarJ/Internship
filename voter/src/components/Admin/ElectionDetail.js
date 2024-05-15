import React, { useState, useEffect } from "react";
import { Typography, Button, Card, CardContent, Grid, CardActions } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const ElectionDetails = () => {
  const { id } = useParams();
  const [election, setElection] = useState(null);

  useEffect(() => {
    fetchElectionDetails();
  }, []);

  const fetchElectionDetails = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`http://localhost:3000/admin/ballots/${id}`, config);
      setElection(response.data);
    } catch (error) {
      console.error("Error fetching election details:", error.response.data);
    }
  };

  const handleEdit = () => {
    // Handle navigation to edit election component
    window.location.href = `/admin/election/edit/${id}`;
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:3000/admin/ballots/${id}`, config);
      // Handle deletion success (e.g., show success message, navigate back to admin home)
      window.location.href = "/admin";
    } catch (error) {
      console.error("Error deleting election:", error.response.data);
      // Handle deletion error (e.g., show error message)
    }
  };

  return (
    <div className="election-details flex justify-center items-center h-screen">
      {election ? (
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Election Name: {election.electionName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Election ID: {election._id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start Date: {new Date(election.startDate).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              End Date: {new Date(election.endDate).toLocaleString()}
            </Typography>
            <Typography variant="h6" component="div" mt={2}>
              Candidates:
            </Typography>
            <ul>
              {election.candidates.map((candidate, index) => (
                <li key={index}>
                  Name: {candidate.name}, Party: {candidate.party}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </div>
  );
};

export default ElectionDetails;
