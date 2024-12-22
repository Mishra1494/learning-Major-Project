 
const listing = require("./models/listing");
const {listingSchema} = require("./schema.js");
const expressError = require("./utils/expressError.js");



module.exports.isLoggedIn = (req,res,next)=>{if(!req.isAuthenticated()){
    // console.log(req.user);
    req.session.redirectUrl = req.originalUrl;
    req.flash("error","You must be logged in first");
    return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listings = await listing.findById(id);
    if(!listings.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
module.exports.validateListing = (req,res,next)=>{
    let result = listingSchema.validate(req.body);
    console.log(result);
    if(result.error){
        throw new expressError(400,result.error);
    }else{
        next();
    }
}