const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  addedCart:{
    type: Boolean,
    default: false,
    required: true,
  }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;