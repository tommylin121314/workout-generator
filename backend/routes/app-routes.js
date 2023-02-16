import express from "express"
import { createExercise, deleteExercise, getAllExercises, getExerciseById, getPublicExercises, getUserExercises, updateExercise } from "../controllers/exercise-controller.js"
import { createSet, deleteSet, getAllSets, getSetById, updateSet } from "../controllers/set-controller.js";
import { getPublicWorkouts, getAllWorkouts, getWorkoutById, getUserWorkouts, createWorkout, updateWorkout, deleteWorkout } from "../controllers/workout-controller.js";
import { getAllUsers, login, addUser, updateUser, deleteUser, addFavoriteExercise, removeFavoriteExercise, addFavoriteWorkout, removeFavoriteWorkout, getUserById } from "../controllers/user-controller.js";

const appRouter = express.Router();

appRouter.get("/user/getAllUsers", getAllUsers);
appRouter.get("/user/getUserById", getUserById)
appRouter.post("/user/register", addUser);
appRouter.post("/user/login", login)
appRouter.put("/user/updateUser", updateUser)
appRouter.put("/user/addFavoriteExercise", addFavoriteExercise)
appRouter.put("/user/removeFavoriteExercise", removeFavoriteExercise)
appRouter.put("/user/addFavoriteWorkout", addFavoriteWorkout)
appRouter.put("/user/removeFavoriteWorkout", removeFavoriteWorkout)
appRouter.delete("/user/deleteUser", deleteUser)

appRouter.get("/exercise/getAllExercises", getAllExercises)
appRouter.get("/exercise/getExerciseById", getExerciseById)
appRouter.get("/exercise/getPublicExercises", getPublicExercises)
appRouter.get("/exercise/getUserExercises", getUserExercises)
appRouter.post("/exercise/createExercise", createExercise)
appRouter.put("/exercise/updateExercise", updateExercise)
appRouter.delete("/exercise/deleteExercise", deleteExercise)

appRouter.get("/workout/getAllWorkouts", getAllWorkouts)
appRouter.get("/workout/getWorkoutById", getWorkoutById)
appRouter.get("/workout/getPublicWorkouts", getPublicWorkouts)
appRouter.get("/workout/getUserWorkouts", getUserWorkouts)
appRouter.post("/workout/createWorkout", createWorkout)
appRouter.put("/workout/updateWorkout", updateWorkout)
appRouter.delete("/workout/deleteWorkout", deleteWorkout)

appRouter.get("/set/getAllSets", getAllSets);
appRouter.get("/set/getSetById", getSetById);
appRouter.post("/set/createSet", createSet)
appRouter.put("/set/updateSet", updateSet)
appRouter.delete("/set/deleteSet", deleteSet)

export default appRouter;