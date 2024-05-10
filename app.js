const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cctvRouter = require("./routers/cctvRouter");
const wantedRouter = require("./routers/wantedRouter");
const loginRouter = require("./routers/loginRouter");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "../client//build")));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/cctv", cctvRouter);
app.use("/api/wanted", wantedRouter);
app.use("/api", loginRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = app;
