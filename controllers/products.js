const getAllProducts = async(req, res) => {
    res.status(200).json({msg: "I will get all Products"});
}

const getAllProductsTest = async(req, res) => {
    res.status(200).json({msg: "I will get all Products Test"});
}

module.exports = { getAllProducts, getAllProductsTest };