const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const local = require("passport-local-mongoose");


const UserSchema = new Schema({
    email :{
        type:String,
        required : true,
    },
}) 


UserSchema.plugin(local)// use the password-local-mongoose as plugin here 
const User = mongoose.model("User",UserSchema);

module.exports = User;

