import express from "express"
import { getAllUsers, login, addUser, updateUser, deleteUser, addFavoriteExercise, removeFavoriteExercise, addFavoriteWorkout, removeFavoriteWorkout } from "../controllers/user-controller.js";




const userRouter = express.Router();

userRouter.get("/getAllUsers", getAllUsers);

userRouter.post("/register", addUser);
userRouter.post("/login", login)

userRouter.put("/updateUser", updateUser)
userRouter.put("/addFavoriteExercise", addFavoriteExercise)
userRouter.put("/removeFavoriteExercise", removeFavoriteExercise)
userRouter.put("/addFavoriteWorkout", addFavoriteWorkout)
userRouter.put("/removeFavoriteWorkout", removeFavoriteWorkout)

userRouter.delete("/deleteUser", deleteUser)

export default userRouter;