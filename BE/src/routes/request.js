const express=require("express")
const {userAuth}=require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionrequest");
const User = require("../models/user");


const requestRouter=express.Router();

requestRouter.post('/request/send/:status/:toUserId',userAuth,async(req,res)=>{
    try{
        const toUserId=req.params.toUserId;
        const  status=req.params.status;
        const fromUserId=req.user._id;

        // 0. check if already existing user  in DB 
        const user=await ConnectionRequest.findOne({
            $or:[{toUserId,fromUserId},
            {toUserId:fromUserId,fromUserId:toUserId}]
        });
        if(user){
            res.status(404).json({message:`Invalid connection request.`})
        }

        // 1. check for valid status
        const allowedStatus=['ignored','interested'];
        if(!allowedStatus.includes(status)){
            res.status(404).json({message:"Status invalid!!"})
        }

        // 2. toUserId is not in DB
        const toUser=await User.findById(toUserId);
        if(!toUser){
            res.status(404).json({message:`User not Found.`})
        }

        // 3. check toUserId is not the with fromUserId
        // we offload this task to schema.pre("save")
    
        // make a instance of CR and save in DB
        const connectionRequest=new ConnectionRequest({
            toUserId,
            fromUserId, 
            status
        })
        const data = await connectionRequest.save(connectionRequest);

        res.json({message:`${req.user.firstName} sends request successfully to ${toUser.firstName}.`,data:data})

    }catch(err){
        res.status(400).send("ERROR :"+ err.message)
    }
}) 

module.exports=requestRouter;