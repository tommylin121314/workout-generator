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
        type: [String],
        required: true,
    },
    isCountable: {
        type: Boolean,
        required: true,
    },
    isPublic: {
        type: Boolean,
        required: true,
    },
    ownerId: {
        type: ObjectId,
        required: false,
    }
});

export default mongoose.model("Exercise", exerciseSchema)