const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const expressError = require("../utils/expressError.js");
const User = require("../models/userModels.js");


router.get("/signUp",(req,res)=>{
    res.render("users/signUp.ejs");
})

router.post("/signUp",async(req,res)=>{
    let {userName,email,password} = req.body;
    const newUser = new User({email,userName});
    const registerUser = await User.register(newUser,password);
    console.log(registerUser);
    req.flash("succes","welcome to wonderlust");
    res.redirect("/listings");
})
module.exports = router;
