// requiring files

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const listing = require("./models/listing.js");
const path = require("path");



// set and use  functions
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

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

//index.js

app.get("/listings",async (req,res)=>{
    const allListing = await listing.find({});
    res.render("listings/index.ejs",{allListing});

})


//new route

app.get("/listings/new",(req,res)=>{
        res.render("listings/new.ejs");
})

// show routs

app.get("/listings/:id",async(req,res)=>{
    let {id}= req.params;
    let data =  await listing.findById(id);
    res.render("listings/show.ejs",{data});
})


//creat route

app.post("/listings/create",async(req,res)=>{
    console.log(req.body);
    const newlisting = new listing(req.body);

    await newlisting.save();
    res.redirect("listings/index.ejs");
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


