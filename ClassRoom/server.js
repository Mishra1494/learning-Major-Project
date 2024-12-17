const express = require("express");
const app = express();
const user = require("./routes/user.js");
const post = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.listen(3000,()=>{
    console.log("hello from express routing ");
})



app.set('trust proxy', 1) // trust first proxy
app.use(session({secret: 'keyboard cat'}))


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



