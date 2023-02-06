import mongoose from "mongoose"
import { ObjectId } from "mongoose";

const setSchema = new mongoose.Schema({
    exercise: {
        type: ObjectId,
        required: true,
    },
    isInterval: {
        type: Boolean,
        required: true,
    },
    isCountable: {
        type: Boolean,
        required: true,
    },
    duration: {
        type: Number,
        required: false,
    },
    count: {
        type: Number,
        required: false,
    }
});

export default mongoose.model("Set", setSchema)