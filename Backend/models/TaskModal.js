import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"Pending"
    },
    date_of_creation:{
        type:Date,
        default:Date.now
    },
    date_of_complition:{
        type:Date,
        default:null
    },
})

 const Task = mongoose.model("Task",TaskSchema);
 export default Task;
