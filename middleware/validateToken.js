const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN } = require('../config');
const {
	generateAccessToken,
	generateRefreshToken,
} = require('../util/tokenizer');
const { cacheFunc } = require('../util/cacher');

const validateToken = async (req, res, next) => {
	//get token from request header
	const authHeader = req.headers['authorization'];
	const token = authHeader.split(' ')[1];

	if (token == null) {
		console.log('Token invalid');
		res.status(401).send('Token not present');
	}

	try {
		jwt.verify(token, ACCESS_TOKEN, (err, user) => {
			if (err) {
				const refreshToken = req.headers['x-refresh-token']; // Assuming refresh token is passed in a custom header

				if (!refreshToken) {
					return res.status(401).json({
						message: 'Access token expired, no refresh token provided',
					});
				}

				jwt.verify(refreshToken, SECRET_KEY, (err, decodedRefreshToken) => {
					if (err) {
						// Refresh token verification failed (e.g., expired or invalid)
						return res
							.status(401)
							.json({ message: 'Refresh token expired or invalid' });
					}

					// If refresh token is valid, issue a new access token
					const newAccessToken = generateAccessToken(
						decodedRefreshToken.email,
						decodedRefreshToken.isAdmin
					);

					const newRefreshToken = generateRefreshToken(
						decodedRefreshToken.email,
						decodedRefreshToken.isAdmin
					);

					// Attach the new access token to the response headers (optional)
					res.setHeader('Authorization', `Bearer ${newAccessToken}`);
					res.setHeader('x-refresh-token', newRefreshToken);

					cacheFunc(newRefreshToken);

					// Continue to the next middleware or route handler
					next();
				});
			} else {
				req.user = user;
				next(); //proceed to the next action in the calling function
			}
		});
	} catch (e) {
		console.log(e);
		next(e);
	}
};

module.exports = validateToken;
