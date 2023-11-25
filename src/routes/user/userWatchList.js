import express from "express";
import { userAuthentication } from "../../helpers/jwtGenerate";
import Users from "../../models/user";

const userWatchListRouter = express.Router();

userWatchListRouter.post(
  "/watchlist/:movieid/",
  userAuthentication,
  async (req, res) => {
    try {
      const movieid = req.params.movieid;
      const userId = req.user.id;
      const user = await Users.findById(userId);
      console.log(user);
      //check the movie is in the watch list
      if (!user.watchlist.includes(movieid)) {
        user.watchlist.push(movieid);
        await user.save();
        res
          .status(200)
          .json({ success: true, message: "movie added to watchlist" });
      } else {
        res
          .status(500)
          .json({ success: false, message: "movie already in  watchlist" });
      }
      console.log(userId);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
    
  }
);


export default userWatchListRouter;
