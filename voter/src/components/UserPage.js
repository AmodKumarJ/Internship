import { Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import '../css/userHome.css';


const UserPage = () => {
  const [todaysElections, setTodaysElections] = useState([]);
  const [upcomingElections, setUpcomingElections] = useState([]);

  useEffect(() => {
    electionFetch();
  }, []);

  const electionFetch = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get("http://localhost:3000/admin/ballots", config);
      console.log(res.data)
      const currentDate = new Date();
      const today = currentDate.toDateString(); // Get today's date in the format "Month Day Year"

      const todays = [];
      const upcoming = [];

      res.data.forEach(election => {
        const startDate = new Date(election.startDate);
        console.log("Start Date:", startDate);
        console.log("Today's Date:", currentDate);
        console.log("Comparison Result:", startDate.toDateString() === today, startDate, today); // Add this line
        if (startDate.toDateString() === today) {
          todays.push(election);
        } else if (startDate > currentDate) {
          upcoming.push(election);
        }
      });
      
      setTodaysElections(todays);
      setUpcomingElections(upcoming);
    
      console.log(today)
      console.log(upcoming)
    } catch (err) {
      console.error("Error fetching elections:", err.response.data);
    }
  };

  const handleElectionButtonClick = (startDate,_id) => {
    const currentDate = new Date();
    const electionStartDate = new Date(startDate);

    if (currentDate < electionStartDate) {
      alert("Please wait for the election to start.");
    } else {
      // Proceed with your action (e.g., redirect to voting page)
      window.location.href = `/user/voting/${_id}`
    }
  };

  return (
    <div className="h-screen userpage flex flex-wrap justify-center items-center flex-col">
      <div className="bg-gray-400 w-full h-full absolute opacity-70"></div>
      <Typography variant="h2" zIndex={10}>Elections</Typography>
      <div className="flex flex-wrap justify-center items-center flex-col h-fit w-full gap-3">
        {todaysElections.length > 0 && (
          <>
            <Typography variant="h5" zIndex={10}>Today's Elections</Typography>
            {todaysElections.map((election) => (
              <div className="flex w-1/2 bg-black text-white justify-between items-center h-14 rounded-xl p-5 z-10" key={election.id}>
                <Typography zIndex={10} variant="h5">{election.electionName}</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleElectionButtonClick(election.startDate,election._id)}
                >
                  Vote <ArrowOutwardIcon/>
                </Button>
              </div>
            ))}
          </>
        )}

        {upcomingElections.length > 0 && (
          <>
            <Typography variant="h5" zIndex={10}>Upcoming Elections</Typography>
            {upcomingElections.map((election) => (
              <div className="flex w-1/2 bg-black text-white justify-between items-center h-14 rounded-xl p-5 z-10" key={election.id}>
                <Typography zIndex={10} variant="h5">{election.electionName}</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleElectionButtonClick(election.startDate)}
                >
                  Vote <ArrowOutwardIcon/>
                </Button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UserPage;
