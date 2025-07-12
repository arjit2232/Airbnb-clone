const express = require("express") ;
const router = express.Router() ;
router.get("/",(req,res)=>{
   res.send("get for the users") ;
}) ;
router.get("/:id",(req,res)=>{
    console.log("get requist is called") ;
    res.send("get for the show route") ;
});
router.post("/",(req,res)=>{
   res.send("post for users") ;
}) ;
router.delete("/:id",(req,res)=>{
    res.send("delete for the user") ;
}) ;

module.exports = router ;