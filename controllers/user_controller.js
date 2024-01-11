

const loginUser = (req, res) => {

    res.send("This is login page");

};

const registerUser = (req, res) => {
    res.send("This is reg page");

};

module.exports = {loginUser, registerUser};