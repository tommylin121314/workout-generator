import express from "express"
import { createExercise, getAllExercises } from "../controllers/exercise-controller.js"

const exerciseRouter = express.Router()

exerciseRouter.get("/getAllExercises", getAllExercises)

exerciseRouter.post("/createExercise", createExercise)

export default exerciseRouter;