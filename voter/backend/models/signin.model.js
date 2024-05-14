const mongoose = require('mongoose')
let Schema = mongoose.Schema

const signinSchema = new Schema({
    username: { type: String, required: true }, 
    password: { type: String, required: true }
})

const SignIn = mongoose.model('SignIn', signinSchema)
module.exports =  SignIn