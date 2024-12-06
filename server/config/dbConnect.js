import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`MongoDB connected successfully : ${connect.connection.host} ,  ${connect.connection.name}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

export default dbConnect;