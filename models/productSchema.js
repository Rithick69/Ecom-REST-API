const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        enum: {
            values: ["apple", "samsung", "dell", "nokia", "lenova", "rolex", "asus"],
            message: `Value is not supported`,
        }
    },
    price: {
        type: Number,
        required: [true, "price must be provided"],
    },
    colors: {
        type: Array,
        default: []
    },
    image: {
        type: String,
        default: "Image Not Found"
    },
    category: {
        type:String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false,
    },
    shipping: {
        type: Boolean,
        default: true,
    },
    rating: {
        type: Number,
        default: 4.9,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Product", productSchema);