const mongoose =require("mongoose") ;
const Review =require("./review.js");
const Schema = mongoose.Schema ;
const listingSchema = mongoose.Schema({
    title :{
        type: String,
        require: true ,
    } ,
    description :String ,
    image: {
  filename: { type: String },
  url: {
    type: String,
    default: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    set: (v) =>
      v === "" || v == null
        ? "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        : v,
  },
  },
    price : Number,
    location : String ,
    country : String  ,
    reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:"Review",
      }
    ]
}) ;

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
     await Review.deleteMany({_id: {$in:listing.reviews}}) ;
    }
});
const Listing = mongoose.model("Listing",listingSchema) ;
module.exports = Listing ;