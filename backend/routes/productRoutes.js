const express = require("express");
const router = express.Router();
const { getProducts, getShops, postAddToCart, patchAddQty } = require("../controller/productController");


router.get("/shops", getShops);
router.post("/add-to-cart", postAddToCart);
router.patch("/update-cart", patchAddQty);
router.get("/:name", getProducts);


module.exports = router;
