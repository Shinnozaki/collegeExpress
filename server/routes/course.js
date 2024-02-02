require("dotenv").config();
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const Course = require("../models/courseModels");

router.get("/", async (req, res) => {
  try {
    const course = await Course.find({});
    res.status(200).json(course);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(200).json(course);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
