const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    number:{
        type : String,
        required : true
    },
    address:{
        type : String,
        required : true
    },
    authority:{
        type : Number,
        default : 0
    },
});
const User = mongoose.model('users',userSchema);
module.exports = User;