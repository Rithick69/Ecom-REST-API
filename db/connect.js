const mongoose = require("mongoose");
const { DBuri } = require('../config');


const connectDB = () => {
    try {
    console.log('connect db');
    return mongoose.connect(DBuri);
    } catch(e){
        console.log("Error DB", e);
    }
}

module.exports = connectDB;