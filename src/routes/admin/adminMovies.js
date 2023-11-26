import express from "express";
import multer from "multer";
import path from "path";
import Movies from "../../models/movies";
import { adminAuthentication } from "../../helpers/jwtGenerate";

const adminMoviesRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "video" || file.fieldname === "image") {
      cb(null, "uploads");
    } else {
      cb(new Error("Invalid field name"));
    }
  },

  filename: (req, file, cb) => {
    console.log(file);
    const extension = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + extension);
  },
});

const upload = multer({ storage });

//add new movie
adminMoviesRouter.post(
  "/add",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  adminAuthentication,
  async (req, res) => {
    try {
      console.log("working");
      const { title, description } = req.body;
      const videoUrl = await req.files.video[0];
      const imageUrl = await req.files.image[0];
      const uploadedBy = req.user.id;

      const moviesModel = await Movies.findOne({ title });
      if (moviesModel !== null) {
        res.status(400).json({ message: "Movie already exist" });
      } else {
        const newMovie = new Movies({
          title,
          description,
          videoUrl: videoUrl,
          imageUrl: imageUrl,
          uploadedBy,
        });
        console.log(newMovie);
        const newMovieResp = await newMovie.save();
        res
          .status(200)
          .json({ message: "Movie added successfully", data: newMovieResp });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

export default adminMoviesRouter;
