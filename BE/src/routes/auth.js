const express=require("express")
const User=require("../models/user")
const {validateSignupData,validateLoginData}=require("../utils/validation")
const bcrypt=require("bcrypt")

const authRouter=express.Router();

authRouter.post('/signup',async(req,res)=>{
    try{
        // Validate user data
        validateSignupData(req);

        const {firstName,lastName,password,email,skills,photoUrl,gender,about,age}=req.body;

        // Encrypt the Password
        const hashedPassword=await bcrypt.hash(password,10);
        //console.log(hashedPassword)

        // create a instance of a User model
        const user=new User({
            firstName,
            lastName,
            password:hashedPassword,
            email,
            skills,
            gender,
            photoUrl,
            about,
            age
        })

        // save the data in DB
        await user.save();
        const token=await user.getJWT();
        // add the token to the cookie and send the response back to user
        res.cookie("token",token,{
            expires: new Date(Date.now() + 8*360000) 
        });
        res.json({message:"Data save successfully..",data:user})
    }catch(err){
        res.status(400).send("ERROR :"+ err.message)
    }
})

// login api
authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    validateLoginData(req)
    
    try{
        const user=await User.findOne({email});
        if(!user){
            throw new Error("Invalid Credencial.")
        }

        // offloaded the task to userSchema.methods.validPassword()
        const isValidPassword=await user.validPassword(password);

        if(isValidPassword){
            // Create a jwt token --offload the task to userSchema.methods
            const token=await user.getJWT();
            // add the token to the cookie and send the response back to user
            res.cookie("token",token,{
                expires: new Date(Date.now() + 8*360000) 
            });
            res.send(user)

        }else{
            throw new Error("Invalid Credencial.") 
        }

    }catch(err){
        res.status(400).send("ERROR :"+ err.message)
    }   
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{ expires: new Date(Date.now())})
    res.json({message:"Logout Successful."})
})
module.exports=authRouter;