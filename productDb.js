// This file only for creating a sample datatable in MongoSB.
// This will be used only for setting up request queries and
// better understanding of the REST API functionalities. This
// file will be removed in the final version.


const connectDB = require("./db/connect");

const { DBuri } = require("./config");

const MyModel = require("./models/productSchema");

const ProductData = require("./productsData.json");


const start = async () => {
    try{
        await connectDB(DBuri);
        await MyModel.deleteMany();
        await MyModel.create(ProductData);
        console.log("succees");
    } catch (e) {
        console.log(e)
    }
}

start();