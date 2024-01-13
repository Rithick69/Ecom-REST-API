const express = require("express");

const router = express.Router();

const { loginUser, registerUser, refreshTokenFunc, logoutUser  } = require("../controllers/user_controller");

router.route("/login").post(loginUser);
router.route("/logout").delete(logoutUser);
router.route("/refreshToken").post(refreshTokenFunc);
router.route("/register").post(registerUser);

module.exports = router;

