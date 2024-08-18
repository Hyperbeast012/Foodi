import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";



//login 

const loginUser=async(req,res)=>{
const {email,password}=req.body;
try {
    const user =await userModel.findOne({email});
    if(!user){
        return res.json({succes:false,message:"User Doesn't exist"});
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.json({success:false,message:"Invalid credentials"})
    }
    const token=createToken(user._id);
    res.json({success:true,token})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
}
}

//register

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


const registerUser =async(req,res)=>{
    const {name,password,email}=req.body;
    try {
        const exists= await userModel.findOne({email});
            if(exists){
                res.json({success:false,meassage:"User already Exists"})
            }
            if(password<8){
                res.json({success:false,message:"Enter Strong Password"})
            }
            if(!validator.isEmail(email)){
                res.json({success:false,message:"Enter a valid Email"})
            }
            const salt= await bcrypt.genSalt(10);
            const hashedPassword= await bcrypt.hash(password,salt);

            const newUser= new userModel({name:name,email:email,password:hashedPassword})
            const user= await newUser.save()
            const token =createToken(user._id)
            res.json({success:true,token})

        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export{loginUser,registerUser}