import express from "express"
import { createComment ,getComment} from "../controllers/commentController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id",protect,createComment);
router.get("/:id",protect,getComment);

export default router;