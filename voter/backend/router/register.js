const router = require("express").Router();
const jwt = require("jsonwebtoken")

//importing the model
let User = require('../models/register.model');


router.post('/register',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password
    const email = req.body.email

    User.findOne({ username: username }).then((exitsUser)=>{
        if (exitsUser) {
            res.status(400).json("Username already exists")
        }
        const newUser = new User({
            username,
            password,
            email
        })
        console.log(newUser)
        newUser.save().then(()=>{

            const token = jwt.sign({username:newUser.username},process.env.JWT_SECRET)

             res.status(200).json({ message: "User Added to database", token: token });
            
        }).catch(()=>{
            res.status(400).json("Failed to add data to database plese cheack the code",)
        })
        
    }).catch(err=>{
        console.log("error occured while fetch the users")
    })

})

module.exports = router;