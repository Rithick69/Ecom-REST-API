const MyModel = require("../models/productSchema");


const getAllProducts = async(req, res) => {
    const myData = await MyModel.find(req.query);
    res.status(200).json({ myData});
}

const getAllProductsTest = async(req, res) => {
    const myData = await MyModel.find(req.query);
    res.status(200).json({ myData});
}

module.exports = { getAllProducts, getAllProductsTest };