const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator");

const AuthController = require("../../controllers/authController");

//@route GET api/auth
//@desc Test route
//@access Public

router.get("/", auth, AuthController.getAuth);

//@route POST api/auth
//@desc Authenticate user
//@access Public

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  AuthController.postAuth
);

module.exports = router;
