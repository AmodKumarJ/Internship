import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
const EditElectionForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    electionName: "",
    startDate: "",
    endDate: "",
    candidates: [{ name: "", party: "" }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://localhost:3000/admin/ballots/${id}`,
          config
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching election details:", error.response.data);
      }
    };

    fetchData();
  }, [id]);

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
      const token = localStorage.getItem("adminToken"); // Retrieve JWT token from local storage
      if (!token) {
        throw new Error("JWT token not found");
      }

      // Set up request headers with JWT token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Send PATCH request to update the existing election with the provided form data
      const response = await axios.patch(
        `http://localhost:3000/admin/ballots/${id}`,
        formData,
        config
      );
      if (response) {
        console.log("Election updated successfully:", response.data);
        // Optionally, perform any additional actions after successful update
      }
    } catch (error) {
      console.error("Error updating election:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Container maxWidth="xl" className="py-10">
        <Typography variant="h4" align="center" gutterBottom>
          Edit Election Form
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
                <Grid item xs={12}>
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
            Update Election
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default EditElectionForm;
