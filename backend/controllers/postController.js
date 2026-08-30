import Post from "../models/Post.js";


export const createPost = async (req,res)=>{
    try {
        const {title,content,category}=req.body;
    
 const post = await Post.create({
     title,
     content,
     category,
     author:req.user._id
 })
 return res.status(200).json({
    success:true,
    message:"Post Created Successfully",
    post
 })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};
export const getAllPost = async(req,res)=>{
    try {
        const posts = await Post.find().populate("author", "name")
        return res.status(200).json({
            success:true,
            message :"Post Fetch Successfully",
            posts
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};
export const getPost=async(req,res)=>{
    try {
        const {id}=req.params
        const post = await Post.findById(id).populate("author", "name");
        if(!post){
        return res.status(400).json({
            success:false,
            message:"Post not Find "
        })
    }
        return res.status(200).json({
            success:true,
            message:"Post Find Successfully",
            post
        })
    } catch (error) {
     return res.status(500).json({
            success:false,
            message:error.message
        })   
    }
};
export const updatePost = async(req,res)=>{
    try {
        const {id}= req.params
        const post = await Post.findById(id);
        if(!post ){
            return res.status(401).json({
                success:false,
                message:"Post not Find"
            })
        }
        if(post.author.toString()!==req.user._id.toString()){
            return res.status(401).json({
                success:false,
                message:"You are not Authorized to perform this action"
            })
        }
       const posts = await Post.findByIdAndUpdate(id,req.body,{
        new:true
       })
   return res.status(200).json({
    success:true,
    message:"Post Updated Successfully",
    posts
   })
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:error.message
        })   
    }
};  
export const deletePost= async (req,res)=>{
    try {
        const {id}= req.params
        const post = await Post.findById(id);
        if(!post){
            return res.status(400).json({
                success:false,
                message:"Post not Find"
            })
        }
        if(post.author.toString()!==req.user._id.toString()){
            return res.status(400).json({
                success:false,
                message:"You are not Authorized to perform this action"
            })
        }
        const posts = await Post.findByIdAndDelete(id)
        return res.status(200).json({
            success:true,
            message:"Post Deleted Succesfully"
        })
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:error.message
        })  
    }
};