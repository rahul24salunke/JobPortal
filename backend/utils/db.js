import mongoose from "mongoose";4

const connection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("conneted db");
    } catch (error) {
        console.log(error);
    }
}
export default connection;