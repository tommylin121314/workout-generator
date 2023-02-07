import express from "express"
import { createExercise, deleteExercise, getAllExercises } from "../controllers/exercise-controller.js"

const exerciseRouter = express.Router()

exerciseRouter.get("/getAllExercises", getAllExercises)

exerciseRouter.post("/createExercise", createExercise)

exerciseRouter.delete("/deleteExercise", deleteExercise)

export default exerciseRouter;