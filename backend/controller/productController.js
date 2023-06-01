const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const name = req.params.name;
    let products;
    if(name==="all"){
      products = await Product.find();
    }else {
      products = await Product.find({ shopName: name });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getShops = async (req, res) => {
  try {
    const names = await Product.distinct("shopName");
    res.json(names);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const postAddToCart = async (req, res) => {
  try {
    const { productId, addedCart } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { addedCart }, // Update the addedCart field
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Added to cart successfully", product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const patchAddQty = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    console.log(productId)
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { qty }, // Update the addedCart field
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Added qty to cart successfully", product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



module.exports = {
  getProducts,
  getShops,
  postAddToCart,
  patchAddQty,
};
