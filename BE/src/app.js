const express=require("express")
const connectDb=require("./config/database")
const cookieParser=require("cookie-parser")
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const authRouter = require("./routes/auth");
const cors =require("cors")

const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true
}))
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
// middleware for parsing cookie data from req.cookies
app.use(cookieParser())
//const SECRET_VAL="devTinder@123";

app.use('/',authRouter)
app.use("/",profileRouter)
app.use('/',userRouter)
app.use('/',requestRouter)

// Error Handling Middleware
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something  went wrong..");
    }
});




