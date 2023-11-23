import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db";

const app = express();
const port = 3000;
connectDB();

//middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth");

app.listen(port, () => {
  console.log("server is running on", port);
});
