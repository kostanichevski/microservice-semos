// npm i express
const express = require("express");
const auth = require("./handlers/authHandler");
const db = require("../../pkg/db/index");
const dotenv = require("dotenv");
const jwt = require("express-jwt");
const post = require("./handlers/postHandler");
//cors
const cors = require("cors");

const app = express();

db.init();
app.use(express.json());
app.use(cors());

//library for protecting routes
app.use(
  jwt
    .expressjwt({
      algorithms: [`HS256`],
      secret: process.env.JWT_SECRET,
    })
    .unless({
      path: ["/api/v1/create-account"],
    })
);

//routes
app.get("/api/v1/posts", post.getAll);
app.get("/api/v1/posts:id", post.getOne);
app.post("/api/v1/posts", post.create);
app.patch("/api/v1/posts:id", post.update);
app.delete("/api/v1/posts:id", post.delete);

//routes created and read from the user
app.get("api/v1/posts/me", post.getByUser);
app.post("api/v1/posts/me", post.createByUser);

app.listen(process.env.PORTAUTH, (err) => {
  if (err) {
    console.log("Service failed to start");
  } else {
    console.log(`Service started successfully on port ${process.env.PORTAUTH}`);
  }
});
