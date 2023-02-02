import express from "express"
import { getAllUsers } from "../controllers/user-controller.js";
import { addUser } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.post("/register", addUser);

export default userRouter;