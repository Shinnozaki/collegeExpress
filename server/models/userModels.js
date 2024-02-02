const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username must be filled!"],
  },
  email: {
    type: String,
    required: [true, "Email must be filled!"],
    unique: [true, "Email already exists!"],
  },
  password: {
    type: String,
    required: [true, "Password must be filled!"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
