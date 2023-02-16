import express from "express"
import { getPublicWorkouts, getAllWorkouts, getWorkoutById, getUserWorkouts, createWorkout, updateWorkout, deleteWorkout } from "../controllers/workout-controller.js";

const workoutRouter = express.Router();

workoutRouter.get("/getAllWorkouts", getAllWorkouts)
workoutRouter.get("/getWorkoutById", getWorkoutById)
workoutRouter.get("/getPublicWorkouts", getPublicWorkouts)
workoutRouter.get("/getUserWorkouts", getUserWorkouts)

workoutRouter.post("/createWorkout", createWorkout)

workoutRouter.put("/updateWorkout", updateWorkout)

workoutRouter.delete("/deleteWorkout", deleteWorkout)

export default workoutRouter;