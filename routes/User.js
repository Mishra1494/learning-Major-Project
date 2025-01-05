const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleWare.js");
const userController = require("../controller/user.js");

router.route("/signUp")
    .get(userController.signUp)
    .post(asyncWrap(userController.postSignUp))


router.route("/login")
    .get(userController.login)
    .post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userController.postLogin)

router.get("/logout",userController.logout);
module.exports = router;
