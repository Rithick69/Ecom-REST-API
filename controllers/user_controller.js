
const UserModel = require("../models/userSchema");

const loginUser = (req, res) => {

    res.send("This is login page");

};

const registerUser = async(req, res) => {
    try{
        const createPayload = req.body;
        console.log(req.body);
        const { email } = createPayload;

        const userExist = await UserModel.findOne({ email });

        if (userExist) {
            return res.status(400).json({msg: "User already exists"});
        }

        const userMsg = await UserModel.create(createPayload);
        console.log("User saved", userMsg);
        res.status(200).json({msg: "User saved", userMsg});

    } catch (e) {
        console.log(e)
        res.status(411).json({
            msg: `Something went wrong ${e}`,
        })
    }
};

module.exports = {loginUser, registerUser};