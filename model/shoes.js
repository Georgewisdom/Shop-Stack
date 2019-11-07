const mongoose = require("mongoose");

const shoeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  shoeImage: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Shoes", shoeSchema);
