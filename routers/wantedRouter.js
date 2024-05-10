const express = require("express");
const fs = require("fs");

const wantedRouter = express.Router();

wantedRouter.get("/", (req, res) => {
  fs.readFile("./cctvData/database.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.send("err");
      return;
    }
    try {
      console.log(data);
      res.send(data);
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      res.send("err");
    }
  });
});

module.exports = wantedRouter;
