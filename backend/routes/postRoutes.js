import express from 'express';
import { createPost, deletePost, getAllPost, getPost } from '../controllers/postController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();
router.post("/",protect,createPost);
router.get("/",protect,getAllPost);
router.get("/:id",protect,getPost);
router.put("/:id",protect,deletePost);
router.delete("/:id",protect,deletePost);

export default router;