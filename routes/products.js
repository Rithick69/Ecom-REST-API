const express = require("express");

const router = express.Router();

const { getAllProducts, getAllProductsTest, saveProducts } = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/save").post(saveProducts);
router.route("/test").get(getAllProductsTest);

module.exports = router;

