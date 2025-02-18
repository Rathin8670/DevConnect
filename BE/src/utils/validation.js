const validator=require("validator")

const validateSignupData=(req)=>{
    const {firstName,email,password,skills}=req.body;

    if(!firstName || firstName.length<4){
        throw new Error("Invalid name.");
    }else if(!validator.isEmail(email)){
        throw new Error("Invalid email format.");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Invalid password format.");
    }
}

const validateLoginData=(req)=>{
    const {password,email}=req.body;
    if(!validator.isEmail(email)){
        throw new Error("Invalid email format.");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Invalid password format.");
    }
}
module.exports={
    validateSignupData,
    validateLoginData
}