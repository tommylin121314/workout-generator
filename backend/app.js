import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

mongoose.set("strictQuery", false);
mongoose
    .connect(
        process.env.MONGO_URI
    ).then(() => 
        app.listen(5000, () => 
            console.log("Connected to MongoDB. Server is running.")
        )
    ).catch((err) => console.log(err));