// auth.js

const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];

    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split the bearer token
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const token = bearer[1];

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
            if (err) {
                res.status(403).json({ message: 'Forbidden' });
            } else {
                // If token is verified, set the user information in the request object
                req.user = authData;
                next();
            }
        });
    } else {
        // Forbidden
        res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = { verifyToken };
