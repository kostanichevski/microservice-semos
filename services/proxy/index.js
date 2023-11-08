const express = require("express");
// npm install
const cors = require("cors");

const app = express();
app.use(cors());

const authProxy = proxy(`https://localhost:9000`, {
  proxyReqPathResolver: (req) => {
    return `/api/v1/auth${req.url}`;
  },
});

const postProxy = proxy(`https://localhost:9001`, {
  proxyReqPathResolver: (req) => {
    return `/api/v1/posts${req.url}`;
  },
});

// ovde ke gi upotrebime midelverite sto gi pravevme pogore
app.use(`/api/v1/auth`, authProxy);
app.use(`/api/v1/posts`, postProxy);

app.listen(process.env.PORTPROXY, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Proxy service started on port 9002");
});
