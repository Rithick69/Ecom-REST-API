const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN, ACCESS_TOKEN } = require("../config");


// jwt token generation

async function generateAccessToken (data) {
    try {
        const { email } = data;

        return jwt.sign({
            email: email,
        },
        ACCESS_TOKEN,
        {
            expiresIn: "30m"
        })


    } catch (error){
        console.log(error);
        const message = "Failed to generate Access Token";
        const details = error;
        next({message, details});
    }
};

async function generateRefreshToken (data) {
    try {
        const { email } = data;

        return jwt.sign({
            email: email,
        },
        REFRESH_TOKEN,
        {
            expiresIn: "35m"
        })

    } catch (error){
        console.log(error);
        const message = "Failed to generate Refresh Token";
        const details = error;
        next({message, details});
    }
};

module.exports = { generateAccessToken, generateRefreshToken }