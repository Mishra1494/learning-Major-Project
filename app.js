const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const listing = require("./models/listing.js");



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
    res.send("The project started");
})

app.get("/testListing",async (req,res)=>{
    let sample = new listing({
            title:"Raunak Home",
            Descriprtion :"at the center of city",
            price:1200,
            location:"Pune",
            country:"India"
        })
        await  sample.save();
        console.log(sample);
        console.log("Saved file");
        res.send("Done the connection");

    }
)