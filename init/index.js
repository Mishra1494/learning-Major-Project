const mongoose = require("mongoose");
const intiData = require("./index.js");
const listing = require("./models/listing.js");

const mongodb = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected");
}).catch(err,()=>{
    console.log("Some error occured");
})


async function main(){
    mongoose.connect(mongodb);
}


const initDB =  async ()=>{
    await listing.deletMany({});
    await listing.insertMany(initData.data);
    console.log("Data inserted");
}

initDB();