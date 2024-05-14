// adminRoutes.js

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const { verifyToken } = require('../middleware/auth'); // Assuming you have authentication middleware for verifying JWT tokens

// Route for admin login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password match an admin in the database
    Admin.findOne({ username: username, password: password })
        .then((admin) => {
            if (admin) {
                // If admin exists, generate a JWT token
                const token = jwt.sign({ username: admin.username }, process.env.JWT_SECRET,{expiresIn:'1d'});
                res.status(200).json({ message: "Admin logged in successfully", token: token });
            } else {
                res.status(401).json("Invalid username or password");
            }
        })
        .catch((err) => {
            res.status(500).json("Internal Server Error");
        });
});



module.exports = router;
