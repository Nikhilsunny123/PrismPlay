import express from "express";
import multer from "multer";
import path from "path";
import Movies from "../../models/movies";
import { adminAuthentication } from "../../helpers/jwtGenerate";

const adminMoviesRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    console.log(file);
    const extension = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + extension);
  },
});

const upload = multer({ storage});

//add new movie
adminMoviesRouter.post(
  "/add",
  upload.array('files', 2),
  adminAuthentication,
  async (req, res) => {
    try {
      console.log("working")
      const { title, description } = req.body;
      const [videoFile, imageFile] = req.files;
    


      const videoUrl = videoFile.filename;
      const imageUrl = imageFile.filename;
      console.log(req.file);
      const uploadedBy = req.user.id;
      console.log(uploadedBy);
      const moviesModel = await Movies.findOne({ title });
      if (moviesModel !== null) {
        res.status(400).json({ message: "Movie already exist" });
      } else {
        const newMovie = new Movies({
          title,
          description,
          videoUrl,
          imageUrl,
          uploadedBy,
        });
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
