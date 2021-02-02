const { validationResult } = require("express-validator");
const request = require("request");
const config = require("config");

const Profile = require("../models/profile");
const User = require("../models/User");
const Post = require("../models/Post");

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({
        msg: "There is no profile user",
      });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//POST REQUEST api/profile
//@desc Create or update user profile

exports.postProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  //Build profile objects
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills)
    profileFields.skills = skills.split(",").map((skill) => skill.trim());

  //Build social object

  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    //create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "name",
      "avatar",
      "email",
    ]);
    res.status(200).json({
      status: "success",
      numbers: profiles.length,
      data: {
        profiles,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server Error");
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar", "email"]);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(200).json({
      status: "success",
      data: {
        profile,
      },
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("server Error");
  }
};

//delete PROFILE AND USER
//@desc delete profile user and posts
//@access private
exports.deleteProfileAndUser = async (req, res) => {
  try {
    // remove user posts
    await Post.deleteMany({ user: req.user.id });

    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//@route PUT api/profile/experience
//@desc Add profile experience
//@access Private

exports.addExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { title, company, location, from, to, current, description } = req.body;
  const newExp = { title, company, location, from, to, current, description };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();
    res.json({ profile });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//@route delete api/profile/experience/:exp_id
//@desc delete profile experience
//@access Private

exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//@route PUT api/profile/education
//@desc Add profile education
//@access Private

exports.addEducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;
  const newEd = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEd);
    await profile.save();
    res.json({ profile });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//@route delete api/profile/education/:exp_id
//@desc delete profile education
//@access Private

exports.deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.ed_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//@ route Get api/profile/github/:username
//@desc Get user repos from Github
//@access public

exports.getGithubRepo = (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?perpage=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No github profile found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server Error");
  }
};
