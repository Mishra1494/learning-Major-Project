if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
    console.log("nice");
}


// requiring files
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");
// const Joi = require('joi'); // for schema validation
const listingsRouters = require("./routes/listing.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStratgey  =  require("passport-local");
const User = require("./models/userModels.js");
const userRouter = require("./routes/User.js");
const reviewRouters = require("./routes/reviews.js");

// set and use  functions
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
const sessionOptions = {
    secret:"my secret key",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires : Date.now()+1000*60*60*24*7,// cookie will expire in seven days here time is in millisecond here
        maxAge : 1000*60*60*24*7,
        httpOnly : true // to avoid cross scripting attack we are using it 
    }
}
app.use(session(sessionOptions));
app.use(flash());
//passport uses the session here so we are writing the passport below the  session middlewaere
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratgey(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
})


app.get("/register",async(req,res)=>{
    let fakeUser = new User({
        email:"mishra117@gmail.com",
        username:"Raunak123",
    })
    const newUser = await User.register(fakeUser,"1234");
    res.send(newUser);
})
app.use("/listings",listingsRouters);
app.use("/",userRouter);
app.use("/review",reviewRouters);
// data base connection
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main().then(()=>{
    console.log("Connected Succesfully");
}).catch((err)=>{
    console.log(err);
});

//server setup
app.listen(8080,()=>{
    console.log("Use port 8080");
})

// creating Routs
app.get("/",(req,res)=>{
    console.log("Hi Raunak");
    res.redirect("/listings");
})




// app.get("/testListing",async (req,res)=>{
//     let sample = new listing({
//             title:"Raunak Home",
//             Descriprtion :"at the center of city",
//             Price:1200,
//             location:"Pune",
//             country:"India"
//         })
//         await  sample.save();
//         console.log(sample);
//         console.log("Saved file");
//         res.send("Done the connection");

//     }
// )

app.all("*",(req,res,next)=>{
    next(new expressError(404," page  not found"));
})

app.use((err,req,res,next)=>{
    let {status=500,message="something Went wrong"} = err;
    res.render("error.ejs",{message});
    // res.status(status).send(message);
})
