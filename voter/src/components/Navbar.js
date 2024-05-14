import React from "react";
import { AppBar, Toolbar, Typography,Button } from '@mui/material';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" style={{background:'black', position:'fixed'}} className="z-10">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Voter
        </Typography>
        {/* Add additional Navbar items/buttons/icons here */}
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/about">About</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
