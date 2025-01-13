const mongoose = require('mongoose');

const UserDetails=new mongoose.Schema({
    id:Number,
    Fname:String,
    Lname:String,
    Email:String,
    Phoneno:String,
    Address:String,
    userId: String,
});

module.exports =mongoose.model("UserDetails",UserDetails)