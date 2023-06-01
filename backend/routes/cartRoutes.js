const express = require("express");
const router = express.Router();
const {  getCarts, deleteCarts } = require("../controller/cartController");

router.get("/", getCarts);
router.patch("/:productId", deleteCarts);



module.exports = router;
