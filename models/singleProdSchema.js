const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
	width: {
		type: Number,
		default: 1080,
	},
	height: {
		type: Number,
		default: 650,
	},
	url: {
		type: String,
		required: true,
	},
	filename: {
		type: String,
	},
	size: {
		type: Number,
		default: 1080,
	},
	main: {
		type: Boolean,
		default: false
	},
	type: {
		type: String,
		default: 'image/png',
	},
});

const singleProdSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique : true
	},
	name: {
		type: String,
		required: true,
		unique : true
	},
	company: {
		type: String,
		enum: {
			values: ['apple', 'samsung', 'dell', 'nokia', 'lenova', 'rolex', 'asus'],
			message: `Value is not supported`,
		}
	},
	price: {
		type: Number,
		required: [true, 'price must be provided'],
	},
	colors: {
		type: [String],
		required: true
	},
	description: {
		type: String,
		default: 'No description available.',
	},
	category: {
		type: String,
		required: true,
	},
	featured: {
		type: Boolean,
		default: false,
	},
	stock: {
		type: Number,
		default: 1,
		required: true,
	},
	reviews: {
		type: Number,
		default: 10,
	},
	stars: {
		type: Number,
		default: 4.9,
	},

	numRatings: {
		type: Number,
		default: 0,
	},

	shipping: {
        type: Boolean,
        default: true,
    },
	image: {
		type: [ImageSchema],
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('SingleProd', singleProdSchema);
