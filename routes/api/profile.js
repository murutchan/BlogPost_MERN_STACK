const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middleware/auth");
const ProfileController = require("../../controllers/profileController");

//@route GET api/profile/me
//@desc Test route
//@access Private

router.get("/me", auth, ProfileController.getProfile);

//@ route POST api/profile
//@desc create or update profile
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  ProfileController.postProfile
);
//@ route get/profile
//@ desc Get all profiles
//@access Public
router.get("/", ProfileController.getAllProfiles);

//@route Get api/profile/user/:user._id
//@desc Get profile by user ID
//@access Public

router.get("/user/:user_id", ProfileController.getUserProfile);

module.exports = router;
