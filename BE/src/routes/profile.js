const express=require("express")
const User=require("../models/user")
const {userAuth}=require("../middlewares/auth")
const bcrypt=require("bcrypt")
const validator=require("validator")


const profileRouter=express.Router();

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        res.json({user})
    }catch(err){
        res.status(400).send("ERROR :"+ err.message)
    }
})

// update a user profile details
profileRouter.put('/profile/edit',userAuth,async(req,res)=>{
    // loggedin user id
    const userId=req.user._id;

    try{
        // Data sanitizing -- we can't allow email,age,password for update
        const allowedUpdate=["firstName","lastName","skills","gender","photoUrl","userId","about","lookingFor","age"]

        const isUpdateAllowed=Object.keys(req.body).every((k)=> allowedUpdate.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Update Not Possible.")
        }
        const updatedUser=await User.findByIdAndUpdate(userId,req.body,{returnDocument:'after'});
    
        res.json({message:`${req.user.firstName}, your profile is successfully updated `,data:{updatedUser}})
    }catch(err){
        res.status(400).send("Update Not Possible---"+err.message);
    }
})

// update user password only
// we will modify it for forgot password use cases
profileRouter.patch('/profile/password',userAuth,async(req,res)=>{
    const userId=req.user._id;
    try{
        const isAllowUpdate=Object.keys(req.body)=="password"
        if(!isAllowUpdate){
            throw new Error("Invalid update")
        }

        const newPassword=req.body.password;
        if(!validator.isStrongPassword(newPassword)){
            throw new Error("Please provide a strong password.")
        }
        const hashNewPassword=await bcrypt.hash(newPassword,10);

        const updatedUser=await User.findByIdAndUpdate(userId,{password:hashNewPassword},{returnDocument:'after'})
    
        res.json({message:"Password update successful.",data:updatedUser});

    }catch(err){
        res.status(400).send("Update Not Possible---"+err.message);
    }
})

module.exports=profileRouter;