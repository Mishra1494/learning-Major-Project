
const listing = require("../models/listing.js");



module.exports.index = async (req,res,next)=>{
    const allListing = await listing.find({});
    res.render("listings/index.ejs",{allListing});
}

module.exports.new = (req,res)=>{
    console.log(req.user);
    res.render("listings/new.ejs");
}


module.exports.show = async(req,res,next)=>{
    let {id}= req.params;
    let data = await listing.findById(id)
                    .populate("owner")
                    .populate({
                       path : "reviews",
                       populate : {
                            path :  "author"
                       },
                    });
    
    console.log(data);
    res.render("listings/show.ejs",{data});
}


module.exports.create = async(req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url , " ",filename);
    const newlisting = new listing(req.body.listings);
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
    await newlisting.save();
    req.flash("success","new listing created!");
    res.redirect("/listings");
}

module.exports.edit =  async(req,res)=>{

    let {id} = req.params;
    const data = await listing.findById(id);
    let originalImageUrl = data.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{data,originalImageUrl});
}

module.exports.update  = async(req,res)=>{

    let {id} = req.params;
    let data = await listing.findByIdAndUpdate(id,{...req.body.listings});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        data.image = {url,filename};
        await data.save();
    }
    req.flash("success","listing updated!");
    res.redirect(`/listings/${id}`);
}


module.exports.delete = async(req,res)=>{
    let {id} = req.params;
 
    await listing.findByIdAndDelete(id);
    req.flash("success","listing deleted!");
    res.redirect("/listings");
}