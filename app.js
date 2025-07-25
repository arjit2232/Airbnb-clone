const express = require("express") ;
const app = express() ;
const mongoose = require("mongoose") ;
const ejsMate = require("ejs-mate") ;
const path =require("path") ;
const reviewRouter = require("./routes/review.js") ;
const session = require("express-session") ;
const MongoStore = require('connect-mongo') ;
const flash = require("connect-flash") ;
const listingRouter = require("./routes/listing.js") ;
const methodOverride = require("method-override") ;
const passport = require("passport");
const LocalStrategy = require("passport-local") ;
const User = require("./models/user.js") ; 
const { register } = require("module");
const userRouter = require("./routes/user.js") ;
require('dotenv').config();

app.set("view engine","ejs") ;
app.set("views",path.join(__dirname,"views")) ;
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")) ;
app.engine('ejs',ejsMate) ;
app.use(express.static(path.join(__dirname,"/public"))) ;
// const mongo_URL ="mongodb://127.0.0.1:27017/wanderlust" ;
const dbUrl = process.env.ATLASDB_URL  ;
main().then(()=>{
    console.log("connected to DB") ;
})
.catch((err)=>{
   console.log(err) ;
})
async function main() {
    await mongoose.connect(dbUrl);
}
const store = MongoStore.create({
  mongoUrl : dbUrl ,
  crypto :{
     secret: process.env.SECRET
  },
  touchAfter : 24*3600,
});
store.on("error",()=>{
  console.log("error in mongo session store ",err) ;
}) ;
const sessionOptions ={
   store ,
   secret:process.env.SECRET ,
   resave: false ,
   saveUninitialized: true ,
   cookie :{
     expires:Date.now()+1000*60*60*24*3,
     maxAge : 1000* 60 *60*24*3 ,
     httpOnly : true 
   }
} ;

app.use(session(sessionOptions)) ;
app.use(flash()) ;

app.use(passport.initialize()) ;
app.use(passport.session()) ;
passport.use(new LocalStrategy(User.authenticate())) ;

passport.serializeUser(User.serializeUser()) ;
passport.deserializeUser(User.deserializeUser()) ;


app.use((req,res,next)=>{
  res.locals.success = req.flash("success") ;
  res.locals.error = req.flash("error") ;
  res.locals.currUser = req.user ;
  next() ;
}) ;

app.get("/demouser",async (req,res)=>{
  let fakeUser = new User({
    email: "student@gmail.com",
    username : "delta-student"
  }) ;
   let registerUser = await User.register(fakeUser,"helloworld") ;
   res.send(registerUser) ;
}) ;
app.get("/", (req, res) => {
  res.redirect("/listings");
});
app.use("/listings",listingRouter) ;
app.use("/listings/:id/reviews",reviewRouter) ;
app.use("/",userRouter) ;
// there is some error occured due to this which is not resolve yet
// app.all("*",(req,res,next)=>{
//    next(new ExpressError(404,"Page not found!")) ;
// }) ;
app.use((err,req,res,next)=>{
     let {statusCode=500,message="Somthing went wrong!"} = err ;
     res.status(statusCode).render("error.ejs",{message}) ;
    // res.status(statusCode).send(message) ;
}) ; 
app.listen(8080,()=>{
    console.log("server is listening on port 8080") ;
});
