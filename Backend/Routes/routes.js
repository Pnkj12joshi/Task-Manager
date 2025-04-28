import express from 'express';
const route = express.Router();
import {Login,Signup} from "../controllers/UserController.js"

route.get("/",(req,res)=>{
    res.end("Hello World")
})

route.post("/login", Login);
route.post("/signup",Signup);

export default route;