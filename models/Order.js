const mongoose = require("mongoose");


const orderSchema = mongoose.Schema({
    orders: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  countOrders: {
    type: Number,
    required: true,
  },
  userInformation: {
    type: Object,
    required: true,
  },
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;