const express=require("express")
const User=require("../models/user")
const ConnectionRequest=require("../models/connectionrequest")
const {userAuth}=require("../middlewares/auth")

const userRouter=express.Router();
const USER_SAFE_DATA="firstName lastName gender skills about age";

userRouter.get('/user/request/received',userAuth,async(req,res)=>{
    const loggedInUser=req.user;
    try{
        const data=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",USER_SAFE_DATA)
        // .populate("fromUserId",["firstName","lastName","gender","skills"])

        //const trimmed_data=data.map((row)=>row.fromUserId)

        res.json({message:"Your request list:",data:data})
    }catch(err){
        res.status(400).send("something wrong bro"+err.message)
    }
})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    const loggedInUser=req.user;
    try{
        // A->B = accepted
        // B->A = accepted
        const data= await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ]
        })
        .populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA)

        const trimmed_data=data.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
            
        })

        res.json({message:"Your connections are:",data:trimmed_data})

    }catch(err){
        res.status(400).send("something wrong bro"+err.message)
    }
})


// get all users 
userRouter.get('/user/feed',userAuth,async(req,res)=>{
    try{
        const user=await User.find({

        })
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