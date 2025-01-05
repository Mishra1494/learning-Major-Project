const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const Review  = require("../models/review.js");
const listing = require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleWare.js");
const reviewController = require("../controller/review.js");


router.post("/listings/:id/reviews",isLoggedIn,validateReview,asyncWrap(reviewController.add));

router.patch("/listings/:id/reviews/:reviewId/Delete",isLoggedIn,isReviewAuthor,asyncWrap(reviewController.ReviewDelete));

module.exports = router;

