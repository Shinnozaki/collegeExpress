const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be filled!"],
  },
  sks: {
    type: Number,
    required: [true, "SKS must be filled!"],
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
