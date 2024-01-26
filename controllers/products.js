const MyModel = require('../models/productSchema');
const singleProdModel = require('../models/singleProdSchema');

const getAllProducts = async (req, res) => {
	const { company, name, featured, sort, select, page, limit } = req.query;

	const queryObj = {};

	if (company) {
		queryObj.company = { $regex: company, $options: 'i' };
	}

	if (name) {
		queryObj.name = { $regex: name, $options: 'i' };
	}

	if (featured) {
		queryObj.featured = { $regex: featured, $options: 'i' };
	}

	let apiData = MyModel.find(queryObj);

	if (sort) {
		let sortQ = sort.split(',').join(' ');
		apiData = apiData.sort(sortQ);
	}

	if (select) {
		let selectQ = select.split(',').join(' ');
		apiData = apiData.select(selectQ);
	}

	let pageNum = Number(page) || 1;
	let limitVal = Number(limit) || 3;

	let skip = (pageNum - 1) * limitVal;

	apiData = apiData.skip(skip).limit(limitVal);

	const myData = await apiData;
	res.status(200).json({ myData, len: myData.length });
};

const getAllProductsTest = async (req, res) => {
	const myData = await MyModel.find(req.query);
	res.status(200).json({ myData });
};

const saveProducts = async (req, res) => {
	try {
		if (req.user.isAdmin) {
			const createPayload = req.body;
			await singleProdModel.create(createPayload);

			// I want to save the product data in the all products db.

			const {id, name, company, price, colors, category, shipping, featured, rating, image} = createPayload;

			const productPayload = {id, name, company, price, colors, category, shipping, featured, rating, image};

			await MyModel.create(productPayload);
			console.log('Product saved');
			res.status(200).send('Product saved');
		} else{
            throw new Error({msg:"Access denied", status: 403})
        }
	} catch (e) {
		console.log(e);
		const message = 'Internal Server Error';
		const details = e.msg;
        const status = e.status | 411;
		next({ status, message, details });
	}
};

module.exports = { getAllProducts, getAllProductsTest, saveProducts };
