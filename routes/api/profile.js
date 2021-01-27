const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middleware/auth");
const ProfileController = require("../../controllers/profileController");

router.get("/me", auth, ProfileController.getProfile);
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

router.get("/", ProfileController.getAllProfiles);
router.get("/user/:user_id", ProfileController.getUserProfile);
router.delete("/", auth, ProfileController.deleteProfileAndUser);
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  ProfileController.addExperience
);
router.delete("/experience/:exp_id", auth, ProfileController.deleteExperience);

router.put(
  "/education",
  [
    auth,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "degree is required").not().isEmpty(),
      check("fieldofstudy", "field of study is required").not().isEmpty(),
      check("from", "date for from is required").not().isEmpty(),
    ],
  ],
  ProfileController.addEducation
);

router.delete("/education/:ed_id", auth, ProfileController.deleteEducation);
router.get("/github/:username", ProfileController.getGithubRepo);

module.exports = router;
