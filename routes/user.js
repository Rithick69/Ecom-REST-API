const express = require("express");

const router = express.Router();

const { loginUser, registerUser  } = require("../controllers/user_controller");

router.route("/login").get(loginUser);
router.route("/register").get(registerUser);

module.exports = router;
