const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
// var cors = require("cors");

const app = express();
// app.use(
//   cors({
//     origin: "http://localhost:3000/",
//     methods: ["GET", "PUT", "POST"],
//     allowedHeaders: ["Content-Type", "Accept"],
//     credentials: true,
//     maxAge: 600,
//     exposedHeaders: ["*", "Authorization"],
//   })
// );

dotenv.config({ path: "./config.env" });
require("./db/conn");
require("./router/auth");
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const User = require("./model/userSchema");

app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {
  app.use(express.static("amazonclone/build"));
  const path = require("path");

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "amazonclone", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
