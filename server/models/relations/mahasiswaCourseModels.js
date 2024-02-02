const mongoose = require("mongoose");

const MahasiswaCourseSchema = mongoose.Schema({
  mahasiswaId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mahasiswa" }],
  courseId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const MahasiswaCourse = mongoose.model("MahasiswaCourse", MahasiswaCourseSchema);

module.exports = MahasiswaCourse;