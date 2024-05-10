const express = require("express");
const fs = require("fs");

const wantedRouter = express.Router();

wantedRouter.get("/", (req, res) => {
  fs.readFile("./cctvData/database.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.send("err");
      return;
    } else {
      res.send(data.mission);
    }
  });
});

module.exports = wantedRouter;
