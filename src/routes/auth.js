import express from "express";
import Users from "../models/user";
import bcrypt from "bcrypt";
import { generateJWT } from "../helpers/jwtGenerate";

const authRouter = express.Router();

//Create account
authRouter.post("/add", async (req, res) => {
  try {
    const { email, fullName, password, role } = req.body;

    const userModel = await Users.findOne({ email });
    if (userModel !== null) {
      res.status(500).json({ message: "user already exist" });
    } else {
      const salt = await bcrypt.genSalt(10);

      const hash = await bcrypt.hash(password, salt);
      const newUser = new Users({ email, fullName, password: hash, role });
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
    const { email, password, role } = req.body;

    const userModel = await Users.findOne({ email, role }).select("+password");
    if (userModel == null) {
      res.status(400).json({ message: "user doesnt exist" });
    } else {
      const checkPassword = await bcrypt.compare(password, userModel.password);
      if (checkPassword) {
        let payload = {
          id: userModel._id,
          name: userModel.fullName,
          role: userModel.role,
          email: userModel.email,
        };
        const token = generateJWT(payload);
        res
          .status(200)
          .json({ token, id: userModel._id, message: "Login success" });
      } else {
        res.status(401).json({ message: "Wrong credentials" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default authRouter;
