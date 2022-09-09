const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  getPost,
  getPosts,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} = require("../controllers/posts");

router.get("/search", getPostsBySearch);
router.get("/:id", getPost);
router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

module.exports = router;
