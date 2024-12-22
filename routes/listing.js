const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const listing = require("../models/listing.js");
const {isLoggedIn,validateListing,isOwner} = require("../middleWare.js");



//index.js
router.get("/",asyncWrap(async (req,res,next)=>{
        const allListing = await listing.find({});
       
        res.render("listings/index.ejs",{allListing});
    })
);

//new route
router.get("/new",isLoggedIn,(req,res)=>{
        console.log(req.user);
        res.render("listings/new.ejs");
});



// show routs
router.get("/:id",asyncWrap(async(req,res,next)=>{
    let {id}= req.params;
    let data = await listing.findById(id).populate("owner");
    
    console.log(data);
    res.render("listings/show.ejs",{data});
}))



//creat route
// schema validation is done by joi
router.post("/",validateListing,asyncWrap(async(req,res,next)=>{

    const newlisting = new listing(req.body.listings);
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success","new listing created!");
    res.redirect("/listings");
}))


// update route
router.get("/:id/Edit",isLoggedIn,isOwner,asyncWrap(async(req,res)=>{
    let {id} = req.params;
    const data = await listing.findById(id);
    res.render("listings/edit.ejs",{data});
}))


router.put("/:id",isLoggedIn,isOwner,validateListing,asyncWrap(async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listings});
    req.flash("success","listing updated!");
    res.redirect(`/listings/${id}`);
}))



// Delete Route
router.patch("/:id/Delete",isLoggedIn,isOwner,asyncWrap(async(req,res)=>{
    let {id} = req.params;
 
    await listing.findByIdAndDelete(id);
    req.flash("success","listing deleted!");
    res.redirect("/listings");
}))

module.exports = router;