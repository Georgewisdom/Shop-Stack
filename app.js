const express = require("express");
const morgan = require("morgan");
const server = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/keys");

// Route config
const shoeRoutes = require("./route/shoes");
const orderRoutes = require("./route/order");
const userRoutes = require("./route/user");

// db connect
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("db connected"));
// middlewares

server.use(morgan("dev"));
server.use("/uploads", express.static("uploads"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, OPTIONS, DELETE"
    );
    return res.status(200).json({});
  }

  next();
});
server.use("/shoes", shoeRoutes);
server.use("/order", orderRoutes);
server.use("/user", userRoutes);

server.use((req, res, next) => {
  const error = new Error("i no see am");
  error.status = 404;
  next(error);
});

server.use((error, req, res, next) => {
  res.status(500);
  res.json({
    error: {
      msg: error.message
    }
  });
});

module.exports = server;
