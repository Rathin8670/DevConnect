const express=require("express")
const connectDb=require("./config/database")
const User=require("./models/user")

const app=express();

// middleware for parsing json data
app.use(express.json());


// add a user 
app.post('/signup',async(req,res)=>{
// instance of a User model(class)
    const user=new User(req.body)
    try{
        console.log(user)
        await user.save();
        res.send("Data save successfully..")
    }catch(err){
        res.status(400).send("Error saving the error")
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
        res.status(400).send("something wrong bro",err.message())
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
        res.status(400).send("something wrong bro",err.message())
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
        res.status(400).send("something wrong bro",err.message())
    }
})

// update a user
app.patch('/user',async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;

    try{
        const user=await User.findByIdAndUpdate(userId,data);
        console.log(user);
        res.send("User updated successfully..")
    }catch(err){
        res.status(400).send("something wrong bro",err.message());
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

