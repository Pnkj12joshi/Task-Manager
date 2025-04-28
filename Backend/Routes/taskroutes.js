import express from "express";
const taskroute = express.Router();
import {createTask, readTask, updateTask, deleteTask, verifyToken} from "../controllers/TaskController.js";

//routes
taskroute.post("/create", verifyToken, createTask);
taskroute.get("/get",verifyToken,readTask);
taskroute.put("/update/:id", verifyToken,updateTask);
taskroute.delete("/delete/:id", verifyToken, deleteTask);
export default taskroute;