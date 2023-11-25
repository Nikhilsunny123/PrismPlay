const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, },
  fullName: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true, select: false },
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movies' }],
});

const Users = mongoose.model("Users", userSchema);

export default Users;
