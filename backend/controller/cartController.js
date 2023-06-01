const Product = require("../models/Product");

const getCarts = async (req, res) => {
  try {
    const carts = await Product.find({ addedCart: true });
    console.log(carts);
    res.json(carts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteCarts = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedCartItem = await Product.findByIdAndUpdate(
      productId,
      { addedCart: false }, // Update the addedCart field
      { new: true } // Return the updated document
    );

    if (updatedCartItem) {
      // Cart item deleted successfully
      res.json({
        message: "Cart item deleted from shopping cart",
        deletedProduct: updatedCartItem,
      });
    } else {
      // Cart item with the specified productId not found
      res.status(404).json({ error: "Cart item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getCarts,
  deleteCarts,
};
