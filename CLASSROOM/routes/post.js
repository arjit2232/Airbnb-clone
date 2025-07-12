const express = require("express") ;
const router = express.Router() ;

router.get("/posts",(req,res)=>{
   res.send("get for the posts") ;
}) ;
router.get("/posts/:id",(req,res)=>{
    console.log("get requist is called") ;
    res.send("get for the post route") ;
});
router.post("/posts",(req,res)=>{
   res.send("post for post") ;
}) ;
router.delete("/posts/:id",(req,res)=>{
    res.send("delete for the post") ;
}) ;
module.exports = router ;