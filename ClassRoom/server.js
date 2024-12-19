const express = require("express");
const app = express();
const user = require("./routes/post.js");
const post = require("./routes/user.js");
const session = require("express-session");
const path = require("path");
// const cookieParser = require("cookie-parser");
const flash = require("connect-flash");//npm packege to store the temporry after the data bieng displayed it deleted in the connect flash
const sessionOptions = {
    secret : "my-secrate-key",
    resave:false,
    saveUninitialized:true
    }
app.listen(8080,()=>{
    console.log("the server is running ");
})


// app.use(cookieParser("secretcode"));
app.use("/users",user);
app.use("/post",post);
app.use(session(sessionOptions));
app.set("view engine","ejs");
app.use(flash());
app.set("views",path.join(__dirname,"views"));
app.set('trust proxy', 1) // trust first proxy
app.use(express.urlencoded({extended:true}));



app.get("/test",(req,res)=>{
    res.send("test succeed!");
})

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

app.get("/register",(req,res)=>{
    let {name="Anonymous"} = req.query;
    req.session.name = name;
    console.log(req.session);
    if(name === "Anonymous"){
        req.flash("error","user not registerd");
    }else{
        req.flash("success","user registerd succesfully");
    }
    res.redirect("/hello");
})

app.use((req,res,next)=>{// this middle ware is created to avoid bulkyness of miccle ware
    res.locals.msg = req.flash("success")// this will store the msg directly locally to response we can use ot to template with its name msg directly with passing it below see the code below 
    res.locals.error = req.flash("error");
    next();
})
app.get("/hello",(req,res)=>{
    // console.log(req.flash('success'));
 
    // res.render("flashMsg.ejs",{name:req.session.name,msg:req.flash("success")}); // here success is key through which we can access the msg in the ejs template okay 
    res.render("flashMsg.ejs",{name:req.session.name});
})



// this will count how much time the user is accesing the web in same session if count is exist incerease it otherswise set it to 1
app.get("/requestCount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1; 
    }
    res.send(`You sent the requesr ${req.session.count} times`);
})