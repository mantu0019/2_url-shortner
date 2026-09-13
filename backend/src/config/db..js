import mongoose from "mongoose";
import envConfig from "./env.js";

const connectToDb = async () => {
  try {
    await mongoose.connect(envConfig.MONGO_URI);
    console.log("Connect to database");
  } catch (error) {
    console.log("something went wrong during connecting database", error);
  }
};

export default connectToDb;
