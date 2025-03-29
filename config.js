const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGO_URI is missing! Check your environment variables.");
        }

        console.log("Connecting to MongoDB...");
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 10000, 
            socketTimeoutMS: 45000, 
        });

        console.log("MongoDB Connected...");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;