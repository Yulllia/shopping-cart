const express = require("express");
const router = express.Router();
const { postOrder } = require("../controller/orderController");

router.post("/", postOrder);


module.exports = router;
