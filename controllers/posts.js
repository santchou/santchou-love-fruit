const { default: mongoose, isValidObjectId } = require("mongoose");
const postMessage = require("../models/postMessages");
const cloudinary = require("../utils/cloudinary");

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  const { page } = req.query;

  // console.log(page);

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await postMessage.count({});
    const posts = await postMessage.find({}).limit(LIMIT).skip(startIndex);
    //console.log(posts);
    res.status(200).json({
      posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  const title = new RegExp(searchQuery, "i");

  try {
    const posts = await postMessage.find({ title: title });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const createPost = (req, res) => {
  /* const post = req.body;
  const newPost = new postMessage({
    ...post,
    creator: req.userId,
    createAt: new Date().toString(),
  });
  newPost.save((error, newPost) => {
    if (!error) {
      return res.status(200).json(newPost);
    } else {
      return res.status(404).json({ message: error.message });
    }
  }); */
  const post = req.body;
  cloudinary.uploader.upload(
    post.selectedFile,
    {
      upload_preset: process.env.CLOUDINARY_PRESET_NAME,
    },
    function (error, result) {
      //console.log(result);
      if (error || !result) {
        console.log(error);
      } else {
        const newPost = new postMessage({
          ...post,
          selectedFile: result.public_id,
          creator: req.userId,
          createAt: new Date().toString(),
        });
        newPost.save((error, newPost) => {
          if (!error) {
            return res.status(200).json(newPost);
          } else {
            return res.status(404).json({ message: error.message });
          }
        });
      }
    }
  );
};

const updatePost = (req, res) => {
  const { id: _id } = req.params;

  const post = req.body;

  postMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true },
    (error, updatedPost) => {
      if (!error) {
        return res.status(200).json(updatedPost);
      } else {
        return res
          .status(404)
          .json({ message: `No post with this id: ${_id}` });
      }
    }
  );
};

const deletePost = (req, res) => {
  const { id } = req.params;
  postMessage.findByIdAndRemove(id, (error, removedPost) => {
    if (!error) {
      return res.status(200).json(removedPost);
    } else {
      return res.status(401).json({ message: "Error when removed post" });
    }
  });
};

const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.status(404).json({ message: "Unauthenticated" });

  if (!isValidObjectId(id))
    return res.status(404).json({ message: `No post with that id: ${id}` });

  const post = await postMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await postMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  return res.status(200).json(updatedPost);
};

module.exports = {
  getPost,
  getPosts,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
