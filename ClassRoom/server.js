const express = require("express");
const app = express();
const user = require("./routes/user.js");
const post = require("./routes/post.js");

app.use("/users",user);
app.use("/post",post);
app.listen(3000,()=>{
    console.log("hello from express routing ");
})


// this is root route

app.get("/",(req,res)=>{
    res.send("wah express rout is working");
})


app.use("/users",user);
app.use("/post",post);