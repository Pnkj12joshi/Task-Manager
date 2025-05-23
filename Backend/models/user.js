import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country:{
        type:String,
        required:true
    },
},
{timestamp : true},
);

const User = mongoose.model("User", UserSchema);
export default User;