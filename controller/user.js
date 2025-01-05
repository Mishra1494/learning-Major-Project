const User = require("../models/userModels.js");


module.exports.signUp = (req,res)=>{
    res.render("users/signUp.ejs");
}

module.exports.postSignUp = async(req,res,next)=>{
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

module.exports.login = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.postLogin =  async(req,res)=>{
    req.flash("success","welcome to wonderLust");
    const redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}


module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged You Out");
        res.redirect("/listings");
    })
}

