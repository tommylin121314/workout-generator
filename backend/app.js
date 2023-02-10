import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import exerciseRouter from "./routes/exercise-routes.js";
import setRouter from "./routes/set-routes.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json())
app.use("/set", setRouter)

mongoose.set("strictQuery", false);
mongoose
    .connect(
        process.env.MONGO_URI
    ).then(() => 
        app.listen(5000, () => 
            console.log("Connected to MongoDB. Server is running.")
        )
    ).catch((err) => console.log(err));