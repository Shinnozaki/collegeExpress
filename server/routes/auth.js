require("dotenv").config();
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/userModels");

//-----------------REGISTER ROUTER---------------------

router.get("/register", async (req, res) => {
  try {
    const mahasiswa = await User.find({});
    res.status(200).json({ mahasiswa });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: "Semua field wajib diisi!" });
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400).json({ message: "Email already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 3);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(200).json({ message: "User successfully registered!" });
});

//-----------------LOGIN ROUTER---------------------

router.get("/login", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Semua field wajib diisi!",
    });
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "60m" }
    );

    res.status(200).json({ accessToken, message: "Login successfully!" });
  } else {
    res.status(401).json({ message: "Invalid credentials!" });
  }
});

module.exports = router;
