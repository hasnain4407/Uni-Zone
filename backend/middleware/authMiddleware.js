import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if(!token) {
            return res.status(401).json({ message: "Token Not Found" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
        
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
}

export default protect;