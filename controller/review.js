const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const Review  = require("../models/review.js");
const listing = require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleWare.js");


module.exports.add = async(req,res)=>{
    let id = req.params.id;
    let listings = await listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listings.reviews.push(newReview);
    await newReview.save();
    await listings.save();
    console.log("new review saved");
    res.redirect(`/listings/${listings._id}`);
}


module.exports.ReviewDelete = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}