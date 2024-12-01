const mongoose=require("mongoose")

const connectDb=async()=>{
    await mongoose.connect("mongodb+srv://mondalrathin1234xx:9uSfRS30ngZFFO5B@cluster0.gzqjf.mongodb.net/devTinder")
}

module.exports=connectDb