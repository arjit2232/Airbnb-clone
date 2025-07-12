const express = require("express") ;
const app =express();
const users = require("./routes/users.js") ;
const posts = require("./routes/post.js") ;
// const cookieParser =require("cookie-parser") ;
const session = require("express-session") ;
const flash = require("connect-flash") ;
app.use(session({
   secret:"mysupersecretcode",
   resave: false ,
   saveUninitialized :true
})) ;
app.get("/reqcounts",(req,res)=>{
    if(req.session.count){
      req.session.count++ ;
    }
    else{
      req.session.count =1 ;
    }
    res.send(`You requested ${req.session.count} times`) ;
}) ;
// app.get("/tests",(req,res)=>{
//      res.send("successfully tested");
// }) ;
// app.use(cookieParser()) ;
// app.get("/",(req,res)=>{
//    console.dir(req.cookies) ;
//    res.send("Hello i am root") ;
// }) ;
// app.get("/greet",(req,res)=>{
//    let {name="aman"} =req.cookies ;
//    res.send(`hii ${name}`) ;
// }) ;
// app.get("/getcookies",(req,res)=>{
//       res.cookie("greet","hello") ;
//       res.cookie("origin","India") ;
//       res.send("web sent you a cookie") ;
// }) ;

// app.use("/users",users) ;
// // post
// app.use("/posts",posts) ;
app.listen(3000,()=>{
    console.log("server is listening on the 3000 port") ;
}) ;
