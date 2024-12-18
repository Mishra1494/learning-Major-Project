const express = require("express");
const app = express();
const user = require("./routes/user.js");
const post = require("./routes/post.js");
const path = require("path");

const cookieParser = require("cookie-parser");
const flash = require("connect-flash");//npm packege to store the temporry after the data bieng displayed it deleted in the connect flash
const session = require("express-session");
const sessionOptions = session({secret: 'keyboard cat',resave:false,saveUninitialized:true});
app.listen(8080,()=>{
    console.log("hello from express routing ");
})
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));



app.set('trust proxy', 1) // trust first proxy
app.use(sessionOptions);
app.use(flash);
app.get("/register",(req,res)=>{
    let {name="Anonymous"} = req.query;
    req.session.name = name;
    console.log(req.session);
    req.flash("succes","user registerd succesfully");
    res.redirect("/hello");
})
app.get("/hello",(req,res)=>{
    res.render("flashMsg.ejs",{name : req.session.name});
})


app.get("/test",(req,res)=>{
    res.send("test succeed!");
})

// app.use(cookieParser("secretcode"));
// app.use("/users",user);
// app.use("/post",post);

// // parsing the cookie
// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("wah express rout is working");
// })

// // sending cookies
// app.get("/getcookies",(req,res)=>{
//     res.cookie("great","nameste");
//     res.cookie("origin","India");
//     res.send("WE set you a cookie");
// })

// // defining the signed cookie
// app.get("/getSignedcookie",(req,res)=>{
//     res.cookie("color","red",{signed : true});
//     res.send("signec cookie is defined done!");
// })


// // verifying signed cookie 
// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send(req.signedCookies);
//     // res.send("got signed cookie");
// })
// // getting the cookie
// app.get("/greet",(req,res)=>{
//     let {name = "anonymous"} = req.cookies;
//     res.send(`hi, ${name}`);
// })


// this will count how much time the user is accesing the web in same session if count is exist incerease it otherswise set it to 1
app.get("/requestCount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1; 
    }
    res.send(`You sent the requesr ${req.session.count} times`);
})