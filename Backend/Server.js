import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors"
import ConnnectDB from "./Config/dB.js";
import route from "./Routes/routes.js";
import taskroute from "./Routes/taskroutes.js";

//config
app.use(cors());
dotenv.config();
const port = process.env.PORT || 5000;
app.use(express.json());
ConnnectDB();

//routes
app.use("/",route);
app.use("/task",taskroute);



app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
