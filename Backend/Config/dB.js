//connection logic for database
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongourl = process.env.MongoURL;

const ConnnectDB = async () => {
  try {
    await mongoose.connect(mongourl);
    console.log(" Databse is Connected");
  } catch (error) {
    console.log(error.message);
  }
};
export default ConnnectDB;
