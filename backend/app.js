var createError = require("http-errors");
var express = require("express");
const cors = require("cors");
const db = require("./db/db");
var path = require("path");
var logger = require("morgan");

var eventRouter = require("./controllers/alert");
var typesRouter = require("./controllers/types");
var weaponsRouter = require("./controllers/weapons");

var app = express();

const port = 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/alert", eventRouter);
app.use("/types", typesRouter);
app.use("/weapons", weaponsRouter);

app.use(
  cors({
    exposedHeaders: ["access_token", "Access-Token"],
  })
);

db.connect(() => {
  app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
  });
});

module.exports = app;
