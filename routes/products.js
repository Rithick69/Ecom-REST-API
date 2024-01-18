const express = require("express");

const router = express.Router();

const validate = require("../middleware/schema-validator");
const prodSchema = require("../validators/verifyProdSchema");
const validateToken = require("../middleware/validateToken")

const { getAllProducts, getAllProductsTest, saveProducts } = require("../controllers/products");

const combinedMiddleware = [validateToken, validate(prodSchema)];

router.route("/").get(validateToken, getAllProducts);
router.route("/save").post(combinedMiddleware, saveProducts);
router.route("/test").get(validateToken, getAllProductsTest);

module.exports = router;

