import Task from "../models/TaskModal.js";
import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_SECRET;

//function for verify the token
const verifyToken = (req, res, next) => {
  try{
    const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error("Header missing");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Token missing");
  }
  const decoded = jwt.verify(token, JWT_KEY);
  req.user = decoded;
  next();
  }
  catch(error){
    return res.status(401).json({ message: error.message });
  }
};


//Logic for Create a Task
const createTask = async (req, res) => {
  try {
    const { title, description,status,date_of_creation,date_of_complition } = req.body;

    const newTask = await Task.create({
      title,
      description,status,date_of_creation,date_of_complition
    });
    
 res.status(201).json(newTask);

  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

//logic for Read a task
const readTask = async (req, res) => {
  try {
 const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
//logic for Update a task
const updateTask = async (req, res) => {
  try {

    const { id } = req.params;
    const { title, description, status, date_of_completion,date_of_creation } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        status,
        date_of_completion,
        date_of_creation
      },
      { new: true } // return updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
//logic for Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export { createTask, readTask, updateTask, deleteTask , verifyToken};
