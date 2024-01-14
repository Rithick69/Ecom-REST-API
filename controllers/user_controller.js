
const UserModel = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("../util/tokenizer")

let refreshTokens = [];

const refreshTokenFunc = async (req,res) => {

    try{
        const { email, token } = req.body;

        if (!refreshTokens.includes(token)){
            return res.status(400).send("Refresh Token Invalid");
        }

        refreshTokens = refreshTokens.filter((c) => c !== token);

        const accessToken = await generateAccessToken({email});
        const refreshToken = await generateRefreshToken({email});

        refreshTokens.push(refreshToken);

        return res.json ({ accessToken: accessToken, refreshToken: refreshToken });

    } catch (e){
        console.log(e);
    }

};

const logoutUser = async(req, res) => {
    try{

        refreshTokens = refreshTokens.filter( (c) => c != req.body.token)
        res.status(204).send("Logged out!")

    } catch (e){
        console.log(e);
    }

};



const loginUser = async(req, res) => {

    try{

        const { email } = req.body;

        const user = await UserModel.findOne({email});

        if(user == null){
            res.status(404).send("User does not exist");
        }

        if(await bcrypt.compare(req.body.password, user.password)){
            const accessToken = await generateAccessToken(user);
            const refreshToken = await generateRefreshToken(user);

            refreshTokens.push(refreshToken);

            return res.status(200).json ({ accessToken: accessToken, refreshToken: refreshToken })
        }

        return res.status(401).send("Password Incorrect!")

    } catch (e){
        console.log(e);
    }
};

const registerUser = async(req, res) => {
    try{
        const { email } = req.body;

        const userExist = await UserModel.findOne({ email });

        if (userExist) {
            return res.status(400).json({msg: "User already exists"});
        }

        const payload = {...req.body};

        const userCreated = await UserModel.create(payload);
        const refreshToken = await generateRefreshToken();

        refreshTokens.push(refreshToken);

        res.status(200).json({
            msg: "User saved",
            accessToken: await generateAccessToken(),
            refreshToken: refreshToken,
            userId: userCreated._id.toString()
        });

    } catch (e) {
        console.log(e)
        res.status(411).json({
            msg: `Something went wrong ${e}`,
        })
    }
};

module.exports = {loginUser, registerUser, refreshTokenFunc, logoutUser};