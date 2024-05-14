import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

const Voting = () => {
  const { id } = useParams();
  const [election, setElection] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState("");

  useEffect(() => {
    fetchElection();
  });

  const fetchElection = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        `http://localhost:3000/admin/ballots/${id}`,
        config
      );
      setElection(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVote = () => {
    // Perform vote submission logic here
    console.log("Voted for candidate:", selectedCandidate);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {election && (
        <div className="w-8/12 h-fit">
          <h1 className="text-7xl text-center font-bold">
            {election.electionName}
          </h1>
          <form onSubmit={handleVote} className="flex flex-col h-fit gap-3">
            <p className="text-3xl">Select a candidate below:</p>
            {election.candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-black text-white p-5 rounded-xl"
              >
                <input
                  type="radio"
                  id={candidate.id}
                  name="candidate"
                  value={candidate.id}
                  checked={selectedCandidate === String(candidate.id)} // Convert selectedCandidate to string for comparison
                  onChange={(e) => setSelectedCandidate(e.target.value)}
                />

                <label htmlFor={candidate.id} className="pl-3">
                  {candidate.name}
                </label>
              </div>
            ))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ padding: "10px" }}
            >
              Vote
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Voting;
