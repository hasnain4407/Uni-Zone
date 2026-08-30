import mongoose from "mongoose";

const Connection =async()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected To Database Successfully");
    } catch (error) {
        console.error(error);
    }
}
export default Connection;