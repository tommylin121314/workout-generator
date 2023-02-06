import mongoose from "mongoose"
import { ObjectId } from "mongoose";

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    favorites: {
        type: [ObjectId],
        required: false,
    },
    difficulty: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    }
});

export default mongoose.model("Exercise", exerciseSchema)