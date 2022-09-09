const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");

// config database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, (error) =>
  error ? console.log(error.message) : console.log("connected to the database")
);

// express instance
const app = express();

// middleware
app.use(cors());
app.use(express.json({ limit: "30mb" }));

// routes
app.use("/api/posts", postRoutes);
app.use("/auth/users", userRoutes);

//-----------------------------DEPLOYMENT--------------------------------------------------

const __dirname1 = path.resolve();
console.log(__dirname1);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API Running Successfully");
  });
}
//-----------------------------DEPLOYMENT--------------------------------------------------

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server listen on port: ${PORT}`));
