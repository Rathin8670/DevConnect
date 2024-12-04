const mongoose=require("mongoose")
const validator = require('validator');
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:15,
    },
    lastName:{
        type:String,
        minLength:4,
        maxLength:15,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        // custom validator fn for checking email
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email"+value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Invalid Url"+value)
            }
        }
    },
    gender:{
        type:String,
        // custom validator function
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is invalid")
            }
        }

    },
    age:{
        type:Number,
        min:18,

    },
    photoUrl:{
        type:String,
        default:"https://support.hubstaff.com/wp-content/uploads/2019/08/good-pic.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Url"+value)
            }
        }

    },
    about:{
        type:String,
        maxLength:500,
        default:"It is default about data.."
    },
    skills:{
        type:[String],

    },
    lookingFor:{
        type:[String],
    }
},{ timestamps: true });

userSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"devTinder@123");

    return token;
}
userSchema.methods.validPassword=async function(passwordInputByUser){
    const user=this;
    const hashPassword=user.password;
    const isValidPassword=await bcrypt.compare(passwordInputByUser,hashPassword);
    return isValidPassword;
}

const User=mongoose.model("User",userSchema);
module.exports=User