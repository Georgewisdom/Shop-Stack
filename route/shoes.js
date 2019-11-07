const express = require("express");
const mongoose = require("mongoose");
const Shoes = require("../model/shoes");
const router = express.Router();
const multer = require("multer");
const authenticate = require("../authentication/auth");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

router.get("/", (req, res, next) => {
  Shoes.find()
    .select("name price _id category shoeImage")
    .exec()
    .then(shoes => {
      const response = {
        count: shoes.length,
        shoes: shoes.map(shoe => {
          return {
            name: shoe.name,
            price: shoe.price,
            _id: shoe._id,
            category: shoe.category,
            shoeImage: shoe.shoeImage,
            request: {
              type: "GET",
              url: "http://localhost:4000/shoes/" + shoe.name
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      });
    });
});

router.post("/", upload.single ("shoeId"), authenticate, (req, res, next) => {
  const newShoe = new Shoes({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    shoeImage: req.file.path
  });

  newShoe
    .save()
    .then(result => {
      res.status(201).json({
        msg: "Shoe Successfully Added",
        addedShoe: {
          name: result.name,
          price: result.price,
          category: result.category,
          shoeImage: result.shoeImage,
          _id: result._id,
          request: {
            type: "POST",
            url: "http://localhost:4000/shoe/" + result.name
          }
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/:name", (req, res, next) => {
  const id = req.params.shoeId;
  Shoes.find({ name: req.params.name })
    .select("name price _id category shoeImage")
    .exec()
    .then(shoe => {
      console.log(shoe);
      return res.status(200).json({
        shoe: shoe,
        request: {
          type: "GET",
          discription: "Get all shoes",
          url: "http://localhost:4000/shoes"
        }
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.patch("/:shoeId", (req, res, next) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Shoes.update(
    { _id: req.params.shoeId },
    {
      $set: updateOps
      // {
      //   name: req.body.name,
      //   price: req.body.price,
      //   category: req.body.category
      // }
    }
  )
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Product Updated",
        request: {
          type: "PATCH",
          url: "http://localhost:4000/shoes/" + req.params.shoeId
        }
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      });
    });
});

router.delete("/:shoeId", (req, res, next) => {
  Shoes.remove({ _id: req.params.shoeId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Deleted"
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      });
    });
});
module.exports = router;
