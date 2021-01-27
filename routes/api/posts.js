const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middleware/auth");
const postController = require("../../controllers/postController");

//@route add api/posts
//@desc add new post
//@access Private

router.post(
  "/",
  [auth, [check("text", "text is required").not().isEmpty()]],
  postController.addPost
);
//@route add api/posts/:id
//@desc add new post
//@access Private

router.get("/", auth, postController.getPosts);
router.get("/:id", auth, postController.getSinglePost);
router.delete("/:id", auth, postController.deletePost);
module.exports = router;
