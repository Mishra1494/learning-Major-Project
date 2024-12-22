const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const expressError = require("../utils/expressError.js");
const User = require("../models/userModels.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleWare.js");

router.get("/signUp",(req,res)=>{
    res.render("users/signUp.ejs");
})

router.post("/signUp",asyncWrap(async(req,res,next)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registerUser = await User.register(newUser,password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to wonderlust");
            res.redirect("/listings");   
        })
    }catch(e){
        req.flash("success",e.message);
        res.redirect("/signUp");
    }
}
))

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),
    async(req,res)=>{
        req.flash("success","welcome to wonderLust");
        const redirectUrl = res.locals.redirectUrl || "/listings"
        res.redirect(redirectUrl);
})

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged You Out");
        res.redirect("/listings");
    })
})
module.exports = router;
