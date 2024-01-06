const MyModel = require("../models/productSchema");


const getAllProducts = async(req, res) => {

    const { company, name, featured } = req.query;

    const queryObj = {};

    if(company){
        queryObj.company = { $regex: company, $options: "i"}
    }

    if(name){
        queryObj.name = { $regex: name, $options: "i"}
    }

    if(featured){
        queryObj.featured = { $regex: featured, $options: "i"}
    }

    const myData = await MyModel.find(queryObj);
    res.status(200).json({ myData});
}

const getAllProductsTest = async(req, res) => {
    const myData = await MyModel.find(req.query);
    res.status(200).json({ myData});
}

module.exports = { getAllProducts, getAllProductsTest };