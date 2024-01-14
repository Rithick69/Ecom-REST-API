
const UserModel = require("../models/userSchema");
const { generateAccessToken, generateRefreshToken } = require("../util/tokenizer");
const { cacheFunc, deleteToken, searchToken } = require("../util/cacher");

const refreshTokenFunc = async (req,res) => {

    try{
        const { email, token } = req.body;

        if (!searchToken(token)){
            return res.status(400).send("Refresh Token Invalid");
        }

        deleteToken(token);

        const accessToken = await generateAccessToken({email});
        const refreshToken = await generateRefreshToken({email});

        cacheFunc(refreshToken);

        return res.json ({ accessToken: accessToken, refreshToken: refreshToken });

    } catch (e){
        console.log(e);
    }

};

const logoutUser = async(req, res) => {
    try{

        deleteToken(req.body.token);

        res.status(204).send("Logged out!")

    } catch (e){
        console.log(e);
    }

};



const loginUser = async(req, res) => {

    try{

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if ( !user ) {
            res.status(400).send("User does not exist");
        }

        if ( await user.comparePassword(password) ) {
            const accessToken = await generateAccessToken(user);
            const refreshToken = await generateRefreshToken(user);

            cacheFunc(refreshToken);

            return res.status(200).json ({
                msg: "Login Successful",
                accessToken: accessToken,
                refreshToken: refreshToken,
                userId: user._id.toString()
            });
        }

        return res.status(401).send("Invalid Email or Password!")

    } catch (e){
        console.log(e);
        return res.status(500).send("Internal Server Error");
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

        cacheFunc(refreshToken);

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

module.exports = { loginUser, registerUser, refreshTokenFunc, logoutUser };