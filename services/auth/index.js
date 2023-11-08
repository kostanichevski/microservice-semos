// npm i express
const express = require("express");
const auth = require("./handlers/authHandler");
const db = require("../../pkg/db/index");
const dotenv = require("dotenv");
const jwt = require("express-jwt");
//cors
const cors = require("cors");

const app = express();

db.init();
app.use(express.json());
app.use(cors());

//routes
app.post("/api/v1/auth/create-account", auth.signup);
app.post("/api/v1/auth/login", auth.login);

app.listen(process.env.PORTAUTH, (err) => {
  if (err) {
    console.log("Service failed to start");
  } else {
    console.log(`Service started successfully on port ${process.env.PORTAUTH}`);
  }
});
