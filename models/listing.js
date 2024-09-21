const mongoose = require("mongoose");

const schema = mongoose.Schema;

let listingSchema = new schema({
    title:{
        type:String,
        required:true
    },
    description : String,
    image:{
        type:String,
        set : (v)=> v === ""?"https://unsplash.com/photos/gray-steel-3-door-refrigerator-near-modular-kitchen-MP0bgaS_d1c":v,
    },
    Price : Number,
    location:String,
    country:String
});

const listing = mongoose.model("listing",listingSchema);

module.export = listing;
