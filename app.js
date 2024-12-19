// requiring files
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const asyncWrap = require("./utils/wrapAsync.js");
const expressError = require("./utils/expressError.js");
// const Joi = require('joi'); // for schema validation
const {listingSchema} = require("./schema.js");
const listings = require("./routes/listing.js");
const session = require("express-session");
const flash = require("connect-flash");

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
app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    next();
})


// data base connection
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main().then(()=>{
    console.log("Connected Succesfully");
}).catch(()=>{
    console.log("Some err occured");
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


app.use("/listings",listings);

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
