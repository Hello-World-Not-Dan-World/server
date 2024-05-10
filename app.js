const express = require("express");
const bodyParser = require("body-parser");
const cctvRouter = require("./routers/cctvRouter");

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/", cctvRouter);

module.exports = app;
