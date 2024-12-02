const express=require("express")
const connectDb=require("./config/database")
const User=require("./models/user")
const {validateSignupData}=require("./utils/validation")
const bcrypt=require("bcrypt")

const app=express();

const port=7777
// Good Practice-- 1st connect the Db then listen on server
connectDb()
    .then(()=>{
        console.log("DB connection successfully")
        app.listen(port,()=>{
            console.log("Server is running at port:",port)
        }) 
    }) 
    .catch((err)=>{
        console.log("DB connection is not done.... due to..")
        console.log(err)
    })


// middleware for parsing json data from req.body
app.use(express.json());

// add a user 
app.post('/signup',async(req,res)=>{
    try{
        // Validate user data
        validateSignupData(req);

        const {firstName,lastName,password,email,skills,photoUrl,gender,about,age}=req.body;

        // Encrypt the Password
        const hashedPassword=await bcrypt.hash(password,10);
        console.log(hashedPassword)

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
        res.send("Data save successfully..")
    }catch(err){
        res.status(400).send("ERROR :"+ err.message)
    }
})

// login api
app.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await User.findOne({email});
        if(!user){
            throw new Error("Invalid Credencial.")
        }

        const isValidPassword=await bcrypt.compare(password,user.password);
        if(isValidPassword){
            res.send("Login successful..")
        }else{
            throw new Error("Invalid Credencial.") 
        }
    }catch(err){
        res.status(400).send("ERROR :"+ err.message)
    }
    
})

// get user by email
app.get('/user',async(req,res)=>{
    try{
        const user=await User.find({email:req.body.email})
        if(!user){
            res.status(400).send("something wrong bro")
        }else{
            res.send(user)
        }  
    }catch(err){
        res.status(400).send("something wrong bro",err.message)
    }
})

// get all users 
app.get('/feed',async(req,res)=>{
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

// delete a user by id
app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;

    try{
        const user=await User.findByIdAndDelete(userId);
        console.log(user)
        res.send("User deleted succesfully")
    }catch(err){
        res.status(400).send("something wrong bro"+err.message)
    }
})

// update a user
app.patch('/user',async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;

    try{
        // Data sanitizing
        // we can't allow email,age for update
        const allowedUpdate=["firstName","lastName","skills","gender","photoUrl","password","userId"]

        const isUpdateAllowed=Object.keys(data).every((k)=> allowedUpdate.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Update Not Possible.")
        }

        const user=await User.findByIdAndUpdate(userId,data);
        console.log(user);
        res.send("User updated successfully..")
    }catch(err){
        res.status(400).send("Update Not Possible---"+err.message);
    }
})

// app.put('/user',async(req,res)=>{
//     const userId=req.body.userId;
//     const data=req.body;

//     try{
//         const user=await User.findByIdAndUpdate(userId,data);
//         console.log(user);
//         res.send("User updated successfully..")
//     }catch(err){
//         res.status(400).send("something wrong bro",err.message());
//     }
// })


// Error Handling Middleware
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something  went wrong..");
    }
});




