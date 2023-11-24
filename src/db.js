import mongoose from "mongoose";

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABSE_ACCESS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("MOngodb connection error", error);
  }
};

export default connectDB;
