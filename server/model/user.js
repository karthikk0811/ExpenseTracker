const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        required:true,
        type:String,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    refreshToken:String
},{timestamps:true});

module.exports=mongoose.model('User',userSchema);
