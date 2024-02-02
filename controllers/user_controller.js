const UserModel = require('../models/userSchema');
const {
	generateAccessToken,
	generateRefreshToken,
} = require('../util/tokenizer');
const { cacheFunc, deleteToken, searchToken } = require('../util/cacher');
const { REFRESH_TOKEN } = require('../config');

const refreshTokenFunc = async (req, res, next) => {
	try {
		const { token } = req.body;

		if (!searchToken(token)) {
			return res.status(400).send('Refresh Token Invalid');
		}

		await deleteToken(token);

		const userData = jwt.verify(token, REFRESH_TOKEN, (err, data) => {
			if (err) {
				const error = new Error('Token invalid');
				error.status = 403;
				throw error;
				// return res.status(403).send("Token invalid")
			} else {
				return data;
			}
		});

		const accessToken = await generateAccessToken(userData);
		const refreshToken = await generateRefreshToken(userData);

		cacheFunc(refreshToken);

		return res.json({ accessToken: accessToken, refreshToken: refreshToken });
	} catch (e) {
		console.log(e);
		const message = 'Failed to Refresh Session';
		const details = e.message;
		const status = e.status;
		next({ status, message, details });
	}
};

const updateUserDetails = async (req, res, next) => {
	try {
		const userData = req.body;

		const query = { email: userData.email };

		await UserModel.updateOne(query, userData.payload);

		res.status(200).json({ msg: 'User Details updated' });
	} catch (e) {
		console.log(e);
	}
};

const logoutUser = async (req, res, next) => {
	if (req.body.token) {
		await deleteToken(req.body.token);

		res.status(204).send("Logged out!");
	} else {
		const message = 'Internal Server Error';
        const details = 'Refresh Token not recieved'
		next({ message, details });
	}
};

const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email });

		if (!user) {
			res.status(400).send('User does not exist');
		}

		if (await user.comparePassword(password)) {
			const accessToken = await generateAccessToken(user);
			const refreshToken = await generateRefreshToken(user);

			cacheFunc(refreshToken);

			return res.status(200).json({
				msg: 'Login Successful',
				accessToken: accessToken,
				refreshToken: refreshToken,
				userId: user._id.toString(),
			});
		}

		return res.status(401).send('Invalid Email or Password!');
	} catch (e) {
		console.log(e);
		const message = 'Internal Server Error';
		const details = e;
		next({ message, details });
	}
};

const registerUser = async (req, res, next) => {
	try {
		const { email } = req.body;

		const userExist = await UserModel.findOne({ email });

		if (userExist) {
			return res.status(400).json({ msg: 'User already exists' });
		}

		const payload = { ...req.body };

		const userCreated = await UserModel.create(payload);
		const refreshToken = await generateRefreshToken(userCreated);

		cacheFunc(refreshToken);

		res.status(200).json({
			msg: 'User saved',
			accessToken: await generateAccessToken(userCreated),
			refreshToken: refreshToken,
			userId: userCreated._id.toString(),
		});
	} catch (e) {
		console.log(e);
		const message = 'Internal Server Error, Failed to Register User';
		const details = e;
		next({ status: 411, message, details });
	}
};

module.exports = {
	loginUser,
	registerUser,
	refreshTokenFunc,
	logoutUser,
	updateUserDetails,
};
