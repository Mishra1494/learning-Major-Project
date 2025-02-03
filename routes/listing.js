const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const {isLoggedIn,validateListing,isOwner} = require("../middleWare.js");
const ListingController = require("../controller/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const wrapAsync = require("../utils/wrapAsync.js");
const upload = multer({storage:storage});

router.route("/")
    .get(asyncWrap(ListingController.index))
    // .post(validateListing,asyncWrap(ListingController.create))
    .post( 
        isLoggedIn,
        
        upload.single('listings[image]'),
        wrapAsync (ListingController.create)
    )


//new route
router.get("/new",isLoggedIn,ListingController.new);



// show routs
router.route("/:id")
    .get(asyncWrap(ListingController.show))
    .put(isLoggedIn,isOwner,upload.single('listings[image]'),asyncWrap(ListingController.update))


//creat route
// schema validation is done by joi



// update route
router.get("/:id/Edit",isLoggedIn,isOwner,asyncWrap(ListingController.edit))






// Delete Route
router.patch("/:id/Delete",isLoggedIn,isOwner,asyncWrap(ListingController.delete))

module.exports = router;

