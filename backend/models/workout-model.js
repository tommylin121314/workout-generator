import mongoose from "mongoose"
import { ObjectId } from "mongoose"

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    target: {
        type: [String],
        required: true,
    },
    sets: {
        type: [ObjectId],
        required: true,
    },
    favorites: {
        type: [ObjectId],
        required: false,
    },
    isPublic: {
        type: Boolean,
        required: true,
    },
    ownerId: {
        type: ObjectId,
        required: false,
    }
})