import express from "express"
import { createExercise, deleteExercise, getAllExercises, getExerciseById, getPublicExercises, getUserExercises, updateExercise } from "../controllers/exercise-controller.js"

const exerciseRouter = express.Router()

exerciseRouter.get("/getAllExercises", getAllExercises)
exerciseRouter.get("/getExerciseById", getExerciseById)
exerciseRouter.get("/getPublicExercises", getPublicExercises)
exerciseRouter.get("/getUserExercises", getUserExercises)

exerciseRouter.post("/createExercise", createExercise)

exerciseRouter.put("/updateExercise", updateExercise)

exerciseRouter.delete("/deleteExercise", deleteExercise)

export default exerciseRouter;