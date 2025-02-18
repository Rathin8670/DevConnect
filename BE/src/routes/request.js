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
        //  A sent a request to B.
        //  or,  B sent a request to A.
        const user=await ConnectionRequest.findOne({
            $or:[{toUserId,fromUserId},
            {toUserId:fromUserId,fromUserId:toUserId}]
        });
        if(user){
            return  res.status(404).json({message:`Invalid connection request`
            })
        }

        // 1. check for valid status
        const allowedStatus=['ignored','interested'];
        if(!allowedStatus.includes(status)){
            return res.status(404).json({message:"Status invalid!!"})
        }

        // 2. toUserId is not in DB
        const toUser=await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message:`User not Found.`})
        }

        // 3. check toUserId is not the with fromUserId (A tries to send a req to A)
        // we offload this task to schema.pre("save")
    
        // make a instance of CR and save in DB
        const connectionRequest=new ConnectionRequest({
            toUserId,
            fromUserId, 
            status
        })
        const data = await connectionRequest.save(connectionRequest);

        res.json({message:`${req.user.firstName} ${req.params.status=="interested"?"show interest to":"ignored "} ${toUser.firstName}.`,data:data})

    }catch(err){
        res.status(400).send("ERROR :"+ err.message)
    }
}) 

requestRouter.post('/request/review/:status/:requestId',userAuth,async(req,res)=>{
    const loggedInUser=req.user;
    const {status,requestId}=req.params;

    // validate status
    // A->B
    // loggedInUser (B) 
    // validate reqId
    // loggedInuser._id = toUserId._id && status should be "interested"
    try{
        const allowedStatus=["accepted","rejected"]
        if(!allowedStatus.includes(status)){
            return res.status(404).json({message:"Status is not valid."})
        }

        const isValidUser=await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        })

        if(!isValidUser){
            return res.status(404).json({message:"User is not found."})
        }

        isValidUser.status=status;
        const data = await isValidUser.save();
        res.json({message:`Your request is ${status}.`,data:data})
        
    }catch(err){
        res.status(400).send("ERROR :"+ err.message)
    }
    

})

module.exports=requestRouter;