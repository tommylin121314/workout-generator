import mongoose from "mongoose"
import { ObjectId } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        require: true,
    },
    displayName: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    favoriteExercises: {
        type: [ObjectId],
        required: false,
    },
    favoriteWorkouts: {
        type: [ObjectId],
        required: false,
    },
});

export default mongoose.model("User", userSchema)