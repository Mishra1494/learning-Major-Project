const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");

// data base connection

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main().then(()=>{
    console.log("Connected Succesfully");
}).catch(()=>{
    console.log("Some err occured");
});
app.listen(8808,()=>{

    console.log("Use port 8080");
})

app.get("/",(req,res)=>{
    console.log("Hi Raunak");
    res.send("The project started");
})