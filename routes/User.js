const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const expressError = require("../utils/expressError.js");
const User = require("../models/userModels.js");
const passport = require("passport");

router.get("/signUp",(req,res)=>{
    res.render("users/signUp.ejs");
})

router.post("/signUp",asyncWrap(async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registerUser = await User.register(newUser,password);
        console.log(registerUser);
        req.flash("success","welcome to wonderlust");
        res.redirect("/listings");
    }catch(e){
        req.flash("success",e.message);
        res.redirect("/signUp");
    }
}
))

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})

router.post("/login",passport.authenticate('local',{failureRedirect:'/login',failueFlash:true}),
    async(req,res)=>{
        req.flash("success","welcome to wonderLust");
        res.redirect("/listings");
})
module.exports = router;
