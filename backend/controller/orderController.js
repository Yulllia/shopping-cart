const Order = require("../models/Order");

const postOrder = async (req, res) => {
  try {
    const { order } = req.body;
    // Create a new order document
    const newOrder = new Order(order);

    // Save the new order to the database
    await newOrder.save();
    res.status(200).json({ message: "Added to order successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  postOrder,
};
