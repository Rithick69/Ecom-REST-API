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
    }
};

module.exports = { generateAccessToken, generateRefreshToken }