import mongoose from "mongoose";

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/prismplay", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("MOngodb connection error", error);
  }
};

export default connectDB;
