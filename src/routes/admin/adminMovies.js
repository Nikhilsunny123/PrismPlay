import express from "express";

import Movies from "../../models/movies";
import { adminAuthentication } from "../../helpers/jwtGenerate";

const adminMoviesRouter = express.Router();

//add new movie
adminMoviesRouter.post("/add", adminAuthentication, async (req, res) => {
  try {
    const { title, description, url ,uploadedBy} = req.body;

    const moviesModel = await Movies.findOne({ title });
    if (moviesModel !== null) {
      res.status(400).json({ message: "Movie already exist" });
    } else {
      const newMovie = new Movies({ title, description, url ,uploadedBy});
      const newMovieResp = await newMovie.save();
      res
        .status(200)
        .json({ message: "Movie added successfully", data: newMovieResp });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default adminMoviesRouter;
