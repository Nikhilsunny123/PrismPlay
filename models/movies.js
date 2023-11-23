import mongoose from "mongoose";

const movieSchema = new mongoose({
  title: {
    type: String,
    required: true,
  },
  description: { type: String },
  url: { type: String, required: true },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose("Movies", movieSchema);
