import express from "express";
import Movies from "../../models/movies";
import { userAuthentication } from "../../helpers/jwtGenerate";

const userMoviesRouter = express.Router();

//add new movie
userMoviesRouter.get("/", userAuthentication, async (req, res) => {
  try {
    const moviesModel = await Movies.find({});
    res.status(200).json({ data: moviesModel });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default userMoviesRouter;
