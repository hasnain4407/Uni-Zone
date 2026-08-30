import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import errorHandler from "./middleware/erroeMiddleware.js";
import Connection from "./db/conn.js";
import router from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
Connection();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

const port=process.env.PORT;
app.use("/api/auth",router);
app.use("/api/Posts",postRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/users",userRoutes);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server Is Listening On Port ${port}`);   
}
)
