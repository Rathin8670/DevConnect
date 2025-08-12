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
    const loggedInUser=req.user;
    
    // pagination logic
    const page=parseInt(req.query.page)|| 1;
    let limit=parseInt(req.query.limit) || 50;
    // sanitize limit data
    limit=limit>50?50:limit;
    const skip=(page-1)*limit;

    try{
        /**
         * 0. Users own profile is not allowed
         * 1. The profiles whom are sent by user 
         *  & the fellow users who sent to User are also not allowed.
         * 2. The people whom are rejected and ignored are also not allowed
         */
        const connectedUser=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
                ]
        })
        .select("fromUserId toUserId")  // the field i want to see
        .populate("fromUserId","firstName lastName") 
        .populate("toUserId","firstName lastName")

        const hideUserFromFeed=new Set();
        connectedUser.forEach((key)=>{
            hideUserFromFeed.add(key.fromUserId._id.toString())
            hideUserFromFeed.add(key.toUserId._id.toString())
        })

        // $nin -> not in the array
        // $ne ->not equal

        const users=await User.find({
            $and:[
                {_id:{ $nin: Array.from(hideUserFromFeed)}},
                {_id:{$ne: loggedInUser._id}}
            ]
        })
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit)

        res.json({data:users})
    }catch(err){
        res.status(400).send("something wrong bro "+err.message)
    }
})

module.exports=userRouter;