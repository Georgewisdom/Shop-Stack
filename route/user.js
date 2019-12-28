const express = require("express");
const mongoose = require("mongoose");
const Order = require("../model/order");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/keys");
const authenticate = require('../authentication/auth')



// authenticate user
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    res.status(200).json(user);
    console.log(req.user)
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" })
  }
});


// register user
router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User Exits"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
          if (error) {
            res.status(500).json({
              error: error
            });
          } else {
            const user = new User({
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User Created"
                });
              })
              .catch(error => {
                console.log(error);
              });
          }
        });
      }
    })
    .catch(error => console.log(error));
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (error, resp) => {
        if (error) {
          return res.status(401).json({
            message: "Auth Failed"
          });
        }
        if (resp) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            config.JWT_SECRET,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth Successful",
            token: token
          });
        } else {
          res.status(401).json({
            message: "Auth Failed"
          });
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

router.delete("/:userId", (req, res, next) => {
  User.findByIdAndRemove(req.params.userId)
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "User Deleted"
      });
    })
    .catch(error => {
      console.log(error);
    });
});
module.exports = router;
