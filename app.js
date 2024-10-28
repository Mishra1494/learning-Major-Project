// requiring files
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");



// set and use  functions
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(_dirname,"/public")));


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
app.post("/listings",async(req,res)=>{
    const newlisting = new listing(req.body.listings);
    await newlisting.save();
    res.redirect("/listings");
})


// update route
app.get("/listings/:id/Edit",async(req,res)=>{
    let {id} = req.params;
    const data = await listing.findById(id);
    res.render("listings/edit.ejs",{data});
})
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listings});
    res.redirect(`/listings/${id}`);
})



// Delete Route
app.patch("/listings/:id/Delete",async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
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