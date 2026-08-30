import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const registerController=async(req,res)=>{
    try {
        const {name,email,password,department,semester} = req.body;
        const existingUser = await User.findOne({ email })
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User Alerady Register"
            });
        }

        const user= await User.create({
            name,
            email,
            password,
            department,
            semester,
        });
       const token=  jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn:"7d"})
        res.status(200)
   .cookie("token", token, {
       httpOnly: true,
       expires: new Date(Date.now() + 7*24*60*60*1000)
   })
   .json({
       success: true,
       message:"User register successfully",
       user
   })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const loginController = async (req,res)=>{
    try {
        const {password,email} = req.body;
        const user = await User.findOne({
            email,
        })
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User Not Found"
            })
        }

const isMatch= await bcrypt.compare(req.body.password,user.password)
    if(!isMatch){
       return res.status(401).json({
        success:false,
        message:"Wrong Password!"
    })
    }
const token =jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn:"7d"})
     res.status(200)
   .cookie("token", token, {
       httpOnly: true,
       expires: new Date(Date.now() + 7*24*60*60*1000)
   })
   .json({
       success: true,
       message:"User login successfully",
       user
   })
    } catch (error) {
     return res.status(400).json({
        success:false,
        message:error.message
     })   
    }
}
export const getMe = async (req,res)=>{
    res.status(200).json({
        success:true,
        data:{user: req.user}
    })
}