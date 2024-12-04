const jwt=require("jsonwebtoken");
const User=require("../models/user");

const userAuth=async(req,res,next)=>{
    // get the token
    try{
        const {token}=req.cookies;

        const decodedData=await jwt.verify(token,"devTinder@123")
        const {_id}=decodedData;

        const user=await User.findById(_id);
        if(!user){
            throw new Error("User is not valid!!!!!!!")
        }
        // set  the req onj as user obj
        req.user=user;
        next();
    }catch(err){
        res.status(400).send("ERROR :"+ err.message)
    }  
}

module.exports={
    userAuth
}