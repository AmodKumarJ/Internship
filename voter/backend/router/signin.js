const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/register.model');

router.post('/signin', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username, password: password })
        .then((user) => {
            if (user) {
                const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
                res.status(200).json({ message: "Welcome back sir", token: token });
            } else {
                res.status(200).json(`${username} is not an existing user. Please register first.`);
            }
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;
