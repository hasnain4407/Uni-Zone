import Comment from "../models/Comments.js";

export const createComment = async (req,res)=>{
    try {
        const {content} = req.body;
       const {id}=req.params;
       const comment = await Comment.create({
        content,
        author : req.user._id,
        post : id
       })
       return res.status(200).json({
        success: true,
        message:"Comment Succesfully",
        comment
       })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message: error.message
        })
    }
}

export const getComment = async (req,res)=>{
    try {
        const {id}=req.params;
        const comment = await Comment.find({ post: id }).populate("author", "name")
        return res.status(200).json({
            success:true,
            message:"Comments Fetch Successfuly",
            comments
        })
    } catch (error) {
        return res.status(400).json({
         success:false,
         message:error.message
        })
    }
}