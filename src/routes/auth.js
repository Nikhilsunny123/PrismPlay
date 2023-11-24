import express from "express";
import Users from "../models/user";

const authRouter = express.Router();

//Create account
authRouter.post("/add", async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    const userModel = await Users.findOne({ email });
    if (userModel !== null) {
      res.status(400).json({ message: "user already exist" });
    } else {
      const newUser = new Users({ email, fullName, password });
      await newUser.save();
      res.status(200).json({ message: "Account created successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Login
authRouter.post("/", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userModel = await Users.findOne({ title });
      if (userModel !== null) {
        res.status(400).json({ message: "user already exist" });
      } else {
        const newUser = new Users({ email, fullName, password });
        await newUser.save();
        res.status(200).json({ message: "Account created successfully" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

export default authRouter;
