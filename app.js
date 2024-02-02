const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const mahasiswaRoutes = require("./server/routes/mahasiswa") 
const authRoutes = require("./server/routes/auth") 
const courseRoutes = require("./server/routes/course")

app.set('view engine', 'ejs');

app.use("/", require("./server/routes/main"));
app.use("/mahasiswa", mahasiswaRoutes);
app.use("/auth", authRoutes);
app.use("/course", courseRoutes);

mongoose
  .connect(
    "mongodb+srv://joen:expressJoen69@expressjoen.bonpyrh.mongodb.net/CollegeExpress?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongo DB!");
    app.listen(3000, () => {
      console.log("App is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
