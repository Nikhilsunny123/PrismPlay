import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db";
import dotenv from "dotenv";
import adminMoviesRouter from "./routes/admin/adminMovies";
import authRouter from "./routes/auth";

const app = express();

dotenv.config();
const port = 3000;
connectDB();

//middleware
app.use(bodyParser.json());
app.use(cors());

 app.use("/auth",authRouter);
//admin
app.use("/admin/movie", adminMoviesRouter);

app.listen(port, () => {
  console.log("server is running on", port);
});
