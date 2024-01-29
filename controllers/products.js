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

			const {
				id,
				name,
				company,
				price,
				colors,
				category,
				shipping,
				featured,
				rating,
				image,
			} = createPayload;

			const mainImg = image.filter((curr) => curr.main);

			const productPayload = {
				id,
				name,
				company,
				price,
				colors,
				category,
				shipping,
				featured,
				rating,
				mainImg,
			};

			await MyModel.create(productPayload);
			console.log('Product saved');
			res.status(200).send('Product saved');
		} else {
			throw new Error({ msg: 'Access denied', status: 403 });
		}
	} catch (e) {
		console.log(e);
		const message = 'Internal Server Error';
		const details = e.msg;
		const status = e.status | 411;
		next({ status, message, details });
	}
};

const deleteProduct = async (req, res) => {
	try {
		if (req.user.isAdmin) {
			const { id } = req.query;

			await singleProdModel.deleteOne({ id: id });

			await MyModel.deleteOne({ id: id });

			console.log('Product Deleted Successfully');
			res.status(200).send('Product Deleted Successfully');
		} else {
			throw new Error({ msg: 'Access denied', status: 403 });
		}
	} catch (e) {
		console.log(e);
		const message = 'Internal Server Error';
		const details = e.msg;
		const status = e.status | 411;
		next({ status, message, details });
	}
};

const updateProduct = async (req, res) => {
	try {
		if (req.user.isAdmin) {
			const createPayload = req.body;

			const {
				id,
				featured,
				image,
				price,
				color,
				shipping,
				reviews,
				stars,
				stock,
			} = createPayload;

			const ogProd = await singleProdModel.findOne({ id: id });

			if (featured) {
				ogProd.featured = featured;
			}

			if (price) {
				ogProd.price = price;
			}

			if (color) {
				ogProd.colors = [...ogProd.colors, color];
			}

			if (shipping) {
				ogProd.shipping = shipping;
			}

			if (reviews) {
				ogProd.reviews = reviews;
			}

			if (stars) {
				ogProd.stars = stars;
			}

			if (stock) {
				ogProd.stock = stock;
			}

			if (featured) {
				ogProd.featured = featured;
			}

			if (image) {
				const updatedArr = ogProd.image.map((curr) => {
					if (curr.Main) {
						curr.Main = false;
					}
				});

				ogProd.image = [...updatedArr, image];
			}

			await MyModel.findByIdAndUpdate(id, ogProd, function (err, docs) {
				if (err) {
					console.log(err);
					throw new Error({ msg: 'Error occured while updating' });
				} else {
					console.log('Updated User : ', docs);
				}
			});

			console.log('Product Updated Successfully');
			res.status(200).send('Product Updated Successfully');
		} else {
			throw new Error({ msg: 'Access denied', status: 403 });
		}
	} catch (e) {
		console.log(e);
		const message = 'Internal Server Error';
		const details = e.msg;
		const status = e.status | 411;
		next({ status, message, details });
	}
};

module.exports = {
	getAllProducts,
	getAllProductsTest,
	saveProducts,
	deleteProduct,
};
