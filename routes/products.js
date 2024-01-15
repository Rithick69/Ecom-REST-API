const express = require("express");

const router = express.Router();

const validate = require("../middleware/schema-validator");
const prodSchema = require("../validators/verifyProdSchema");

const { getAllProducts, getAllProductsTest, saveProducts } = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/save").post(validate(prodSchema), saveProducts);
router.route("/test").get(getAllProductsTest);

module.exports = router;

