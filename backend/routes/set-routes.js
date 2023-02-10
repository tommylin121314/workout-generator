import express from "express"
import { createSet, deleteSet, getAllSets, getSetById, updateSet } from "../controllers/set-controller.js";


const setRouter = express.Router();

setRouter.get("/getAllSets", getAllSets);
setRouter.get("/getSetById", getSetById);

setRouter.post("/createSet", createSet)

setRouter.put("/updateSet", updateSet)

setRouter.delete("/deleteSet", deleteSet)

export default setRouter;