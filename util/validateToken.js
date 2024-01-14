const jwt = require("jsonwebtoken");
const {ACCESS_TOKEN} = require("../config");

function validateToken (req, res, next){

    //get token from request header
    const authHeader = req.headers["authorization"]
    const token = authHeader.split(" ")[1]

    if (token == null){
        res.sendStatus(400).send("Token not present");
    }

    jwt.verify(token, ACCESS_TOKEN, (err, user) => {
        if (err) {
            res.status(403).send("Token invalid")
        } else {
            req.user = user
            next() //proceed to the next action in the calling function
        }
    });

}

module.exports = validateToken;