const express = require("express");
const router = express.Router();


// users route
router.get("/",(req,res)=>{
    res.send("sending hellp from users route ukay bye bye tata ");
})
router.post("/",(req,res)=>{
    res.send("POSt for users");
})
router.get("/:id",(req,res)=>{
    res.send("helloe from shoe route");
})
router.delete("/:id",(req,res)=>{
        res.send("helllow from felete route okay ");
})



module.exports = router;