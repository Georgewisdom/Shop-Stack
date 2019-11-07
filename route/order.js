const express = require("express");
const mongoose = require("mongoose");
const Order = require("../model/order");
const router = express.Router();
const Shoe = require("../model/shoes");

router.get("/", (req, res, next) => {
  Order.find()
    .select("_id shoe quantity")
    .then(result => {
      res.status(200).json({
        count: result.length,
        orders: result.map(doc => {
          return {
            id: doc._id,
            shoe: doc.shoe,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:4000/order/" + doc.shoe
            }
          };
        })
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

router.post("/", (req, res, next) => {
  Shoe.findOne({ name: req.body.shoeName })
    .then(shoe => {
      if (!shoe) {
        return res.status(404).json({
          message: "shoe not found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        shoe: req.body.shoeName
      });

      return order
        .save()
        .exec()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Order Created",
            createdOrder: {
              id: result._id,
              shoe: result.shoe,
              quantity: result.quantity
            },
            request: {
              type: "POST",
              url: "http://localhost:4000/order/" + result._id
            }
          });
        })
        .catch(error => console.log(error));
    })
    .catch(error => {
      console.error(error);
      res.status(201).json({
        error: error
      });
    });
});

router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:4000/order"
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

router.delete("/:orderId", (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: " Order removed",
        request: {
          type: "POST",
          url: "http://localhost:4000/order",
          body: { shoeName: "shoe Name", quantity: "Number" }
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});
module.exports = router;
