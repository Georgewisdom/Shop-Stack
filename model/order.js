const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  shoe: {
    type: String,
    ref: "Shoe",
    required: true
  },
  quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model("Order", orderSchema);
