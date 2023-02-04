import express from "express"
import { getAllUsers, login, addUser, updateUser, deleteUser } from "../controllers/user-controller.js";




const userRouter = express.Router();

userRouter.get("/getAllUsers", getAllUsers);

userRouter.post("/register", addUser);
userRouter.post("/login", login)

userRouter.put("/updateUser/:id", updateUser)

userRouter.delete("/deleteUser/:id", deleteUser)

export default userRouter;