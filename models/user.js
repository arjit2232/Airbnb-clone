const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;

const passportLocalMongoose =require("passport-local-mongoose") ;

const userSchema = new Schema({
    email:{
        type : String ,
        required : true , 
    }
}) ;
// password and  username automaticaly added through the passportlocalmongoose

userSchema.plugin(passportLocalMongoose) ;
module.exports = mongoose.model('User',userSchema);
 