import mongoose from "mongoose"
import { ObjectId } from "mongoose";

const setSchema = new mongoose.Schema({
    exerciseId: {
        type: ObjectId,
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