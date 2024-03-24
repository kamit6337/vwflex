import environment from "@utils/environment";
import mongoose from "mongoose";

let isDatabaseConnected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isDatabaseConnected) {
    console.log("Databse is already connected");
    return;
  }

  try {
    mongoose.connect(environment.MONGO_DB_URI);
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
      isDatabaseConnected = true;
    });
  } catch (error) {
    console.log("Disconnected from MongoDB", error);
    isDatabaseConnected = false;
    throw new Error(error.message || "Something went wrong");
  }
};

export default connectToDB;
