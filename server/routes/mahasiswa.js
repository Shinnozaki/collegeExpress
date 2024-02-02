require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const jwt = require("jsonwebtoken");

const Mahasiswa = require("../models/mahasiswaModel");
const Course = require("../models/courseModels");
const MahasiswaCourse = require("../models/relations/mahasiswaCourseModels");

//-----------------AUTH MIDDLEWARE----------------------

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token === null || token === undefined) {
    return res.status(401).json({ message: "haiya token kok ga ada leh" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "wrong token or expired" });
    }
    req.user = user;
    next();
  });
}

//-----------------MAHASISWA ROUTER---------------------

router.get("/", authenticateToken, async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.find({});
    // res.render("layout/mahasiswa", {
    //   mahasiswa: mahasiswa,
    // });
    res.status(200).json(mahasiswa);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mahasiswa = await Mahasiswa.findById(id);
    res.status(200).json(mahasiswa);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, age, email, phone, batch } = req.body;
    const mahasiswa = await Mahasiswa.create({
      name,
      age,
      email,
      phone,
      batch,
    });
    res.status(200).json(mahasiswa);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mahasiswa = await Mahasiswa.findByIdAndUpdate(id, req.body);
    if (!mahasiswa) {
      return res
        .status(404)
        .json({ message: `Mahasiswa with id ${id} not found` });
    }
    const updatedMahasiswa = await Mahasiswa.findById(id);
    res.status(200).json(updatedMahasiswa);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mahasiswa = await Mahasiswa.findByIdAndDelete(id);
    if (!mahasiswa) {
      return res
        .status(404)
        .json({ message: `Mahasiswa with id ${id} not found` });
    }
    res.status(200).json({ message: "Mahasiswa successfully deleted!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// ------------------------- relationnnnnnn ------------------------------------

//ini cuma bisa add 1 course dan 1 mahasiswa, padahal udah dibikin array di modelsnya
router.post("/course", async (req, res) => {
  try {
    const { mahasiswaId, courseId } = req.body;
    const m = await Mahasiswa.findOne({ _id: mahasiswaId });
    const c = await Course.findOne({ _id: courseId });
    if (!m || !c) {
      return res
        .status(400)
        .json({ message: "Mahasiswa / Course tidak ditemukan." });
    }
    const create = await MahasiswaCourse.create({
      mahasiswaId: [m._id.toString()],
      courseId: [c._id.toString()],
    });
    res.status(200).json({ create });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//ini error :>
router.get("/course", async (req, res) => {
  try {
    const data = await MahasiswaCourse.find({});
    res.status(200).json({ data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//ini bisa :>
router.get("/course/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mahasiswaCourse = await MahasiswaCourse.findById(id);
    res.status(200).json(mahasiswaCourse);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
