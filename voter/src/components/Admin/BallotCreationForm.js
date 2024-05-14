import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const BallotCreationForm = () => {
  const [formData, setFormData] = useState({
    electionName: "",
    startDate: "",
    endDate: "",
    candidates: [{ name: "", party: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCandidateChange = (index, e) => {
    const { name, value } = e.target;
    const newCandidates = formData.candidates.map((candidate, i) =>
      i === index ? { ...candidate, [name]: value } : candidate
    );
    setFormData((prevState) => ({
      ...prevState,
      candidates: newCandidates,
    }));
  };

  const handleAddCandidate = () => {
    setFormData((prevState) => ({
      ...prevState,
      candidates: [...prevState.candidates, { name: "", party: "" }],
    }));
  };

  const handleRemoveCandidate = (index) => {
    const newCandidates = [...formData.candidates];
    newCandidates.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      candidates: newCandidates,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.post("http://localhost:3000/admin//ballots", formData, config);
      if (response) {
        console.log("Ballot created successfully:", response.data);
        setFormData({
          electionName: "",
          startDate: "",
          endDate: "",
          candidates: [{ name: "", party: "" }],
        });
        window.location.href = "/admin";
      }
    } catch (error) {
      console.error("Error creating ballot:", error.message);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <Container maxWidth="xl" className="py-10">
        <Typography variant="h4" align="center" gutterBottom>
          Ballot Creation Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Election Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Election Name"
                name="electionName"
                value={formData.electionName}
                onChange={handleChange}
              />
            </Grid>
            {/* Start Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  style: { paddingRight: "8px" },
                }}
              />
            </Grid>
            {/* End Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  style: { paddingRight: "8px" },
                }}
              />
            </Grid>
            {/* Candidate Fields */}
            {formData.candidates.map((candidate, index) => (
              <Grid container spacing={3} key={index} paddingTop={3} paddingLeft={3}>
                {/* Candidate Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={`Candidate ${index + 1} Name`}
                    name="name"
                    value={candidate.name}
                    onChange={(e) => handleCandidateChange(index, e)}
                  />
                </Grid>
                {/* Candidate Party */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={`Candidate ${index + 1} Party`}
                    name="party"
                    value={candidate.party}
                    onChange={(e) => handleCandidateChange(index, e)}
                  />
                </Grid>
                {/* Add/Remove Candidate Buttons */}
                <Grid item xs={12} >
                  {index === formData.candidates.length - 1 && (
                    <Button variant="outlined" onClick={handleAddCandidate}>
                      Add Candidate
                    </Button>
                  )}
                  {index !== 0 && (
                    <Button
                      variant="outlined"
                      onClick={() => handleRemoveCandidate(index)}
                    >
                      Remove Candidate
                    </Button>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px" }}
          >
            Create Ballot
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default BallotCreationForm;
