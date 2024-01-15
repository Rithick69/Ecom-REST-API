const express = require("express");

const router = express.Router();

const validate = require("../middleware/schema-validator");
const signupSchema = require("../validators/verifyUserSchema");

const { loginUser, registerUser, refreshTokenFunc, logoutUser  } = require("../controllers/user_controller");

router.route("/login").post(loginUser);
router.route("/logout").delete(logoutUser);
router.route("/refreshToken").post(refreshTokenFunc);
router
    .route("/register")
    .post(validate(signupSchema), registerUser);

module.exports = router;

