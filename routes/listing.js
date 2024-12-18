const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const expressError = require("../utils/expressError.js");
const listing = require("../models/listing.js");

const validateListing = (req,res,next)=>{
    let result = listingSchema.validate(req.body);
    console.log(result);
    if(result.error){
        throw new expressError(400,result.error);
    }else{
        next();
    }
}

//index.js
router.get("/",asyncWrap(async (req,res,next)=>{
        const allListing = await listing.find({});
        res.render("listings/index.ejs",{allListing});
    })
);

//new route
router.get("/new",(req,res)=>{
        res.render("listings/new.ejs");
});



// show routs
router.get("/:id",asyncWrap(async(req,res,next)=>{

    let {id}= req.params;
    let data =  await listing.findById(id);
    res.render("listings/show.ejs",{data});
}))



//creat route
// schema validation is done by joi
router.post("/",validateListing,asyncWrap(async(req,res,next)=>{

    const newlisting = new listing(req.body.listings);
    await newlisting.save();
    res.redirect("/listings");
}))


// update route
router.get("/:id/Edit",asyncWrap(async(req,res)=>{
    let {id} = req.params;
    const data = await listing.findById(id);
    res.render("listings/edit.ejs",{data});
}))


router.put("/:id",validateListing,asyncWrap(async(req,res)=>{
    let {id} = req.params;

    await listing.findByIdAndUpdate(id,{...req.body.listings});
    res.redirect(`/listings/${id}`);
}))



// Delete Route
router.patch("/:id/Delete",asyncWrap(async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
}))

module.exports = router;