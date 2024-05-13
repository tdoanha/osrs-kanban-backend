import { stat } from "fs";
import { Stats } from "./models/statsModel.js";

var createError = require("http-errors");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var cors = require("cors");
// var authMiddleware = require("./middleware/authMiddleware");

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRoute");
var projectsRouter = require("./routes/projectRouter");
app.use("/", indexRouter);
app.use("/kanban/users", usersRouter);
app.use("/kanban/projects", projectsRouter);

// Authentication middleware
// app.use(`/kanban`, authMiddleware);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ error: err.message });
});

// const foo = fetch(
//   "https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=Toni%20Deez",
// )
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Fetching stats not successful");
//     }
//     return response.text();
//   })
//   .then((data) => {
//     const dataArr = data.split("\n");
//     const dataStats = dataArr.filter((val) => {
//       if ((val.match(/,/g) || []).length == 2) {
//         return val;
//       }
//     });
//     const stats = new Stats();
//     const statNames = stats.getStatNames();
//     dataStats.shift(); // remove total levels
//     statNames.forEach((statName, i) => {
//       let statLevel = dataStats[i].match(/,(\d+),/);
//       stats.setStat(statName, statLevel[1]);
//     });
//     console.log(stats.getStats());
//   });

module.exports = app;
