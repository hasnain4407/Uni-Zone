import express from "express";
import { getMe, loginController, registerController } from "../controllers/authController.js";
import Protect from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", Protect, getMe);
router.post("/logout", (req, res) => {
    res.clearCookie("token").json({ success: true, message: "Logged out" })
});

export default router;