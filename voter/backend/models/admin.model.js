const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let AdminSchema =new  Schema({
    username: { type: String, required: true },
    password:{type :String ,required:true}
})
const Admin = mongoose.model('Admin',AdminSchema);
module.exports = Admin;