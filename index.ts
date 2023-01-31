var express = require('express');
const mongoose = require("mongoose");
const Project = require("./src/models/project.ts");
var app = express();
const cors = require('cors');
app.use(cors({
    origin: 'https://jm-portfolio-qnov.onrender.com'
}));
const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jmann432015:L3E1IgbaXuyOUjI8@cluster0.o7ogr.mongodb.net/personal?authSource=admin&replicaSet=atlas-10vtn2-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
    );
    app.listen(5000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
app.use(express.json());

start();

app.get("/projects", async (req, res) => {
  const allProjects = await Project.find({}, { __v: 0, _id: 0 }).lean();
  return res.status(200).json(allProjects);
});