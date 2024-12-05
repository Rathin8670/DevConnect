const express=require("express")
const User=require("../models/user")
const {userAuth}=require("../middlewares/auth")

const userRouter=express.Router();

// get all users 
userRouter.get('/feed',userAuth,async(req,res)=>{
    try{
        const user=await User.find({})
        if(!user){
            res.status(400).send("something wrong bro")
        }else{
            res.send(user)
        }  
    }catch(err){
        res.status(400).send("something wrong bro"+err.message)
    }
})

module.exports=userRouter;