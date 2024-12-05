const mongoose=require("mongoose")

const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,

    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
    },
    status:{
        type:String,
        enum:{
            values:['interested','ignored','accepted','rejected'],
            message:"{VALUE} is not defined."
        }
    }
},{timestamps:true})

connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Can't sent request to yourself.")
    }
    next();
}) 
const ConnectionRequest=mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports=ConnectionRequest;