import User from "../models/UserModel.js";

export const getProfile = async (req,res)=>{
    try {
        res.status(200).json({
            success:true,
            user:req.user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
};

 export const updateProfile = async(req,res)=>{
    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            req.body,
            {new:true}
        ).select("-password")
        res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
 }