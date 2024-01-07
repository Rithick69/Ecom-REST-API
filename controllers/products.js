const MyModel = require("../models/productSchema");


const getAllProducts = async(req, res) => {

    const { company, name, featured, sort, select } = req.query;

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

    let apiData = MyModel.find(queryObj);

    if(sort) {
        let sortQ = sort.split(",").join(" ");
        apiData = apiData.sort(sortQ);
    }

    if(select){
        let selectQ = select.split(",").join(" ");
        apiData = apiData.select(selectQ);
    }

    const myData = await apiData;
    res.status(200).json({ myData});
}

const getAllProductsTest = async(req, res) => {
    const myData = await MyModel.find(req.query);
    res.status(200).json({ myData});
}

module.exports = { getAllProducts, getAllProductsTest };