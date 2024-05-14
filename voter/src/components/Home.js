import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import '../css/home.css'

const Home = () => {
  return (
    <div className="homepage h-screen flex flex-col justify-center items-center gap-2">
      <div className="bg-gray-400 w-full h-full absolute opacity-70"></div>
      <div className="flex flex-col justify-center items-center gap-2 z-10">
        <Typography
          variant="h2"
          align="center"
          sx={{ fontWeight: 700, width: "60%" }}
        >
          Welcome to the Future of Voting! Effortlessly Cast Your Ballot with
          Our State-of-the-Art App!
        </Typography>
        <Typography variant="subtitle2" sx={{ fontStyle: "italic" }}>
          Cast your vote conveniently and securely from the palm of your hand.
        </Typography>
      </div>
      <div className=" flex justify-between gap-2">
        <Button
          component={Link}
          to="/admin-Login"
          variant="contained"
          color="primary"
        >
          Admin {<ArrowOutwardIcon />}
        </Button>
        <Button
          component={Link}
          to="/user"
          sx={{}}
          variant="contained"
          color="primary"
        >
          User {<ArrowOutwardIcon />}
        </Button>
      </div>
    </div>
  );
};

export default Home;
