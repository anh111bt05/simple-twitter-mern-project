const Post = require("../models/Post");

// Get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    // populate: noi chua thong tin author (hinh anh, ten ...), -_id loai bo field id
    //select author, name va content
    const posts = await Post.find({}).populate("author","name").select('content createdAt -_id');
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {posts}
    });
  } catch (error) {
    next(error)
  }
};

//Create one post
exports.createOnePost = async (req, res, next) => {
  try {
    const {userID} = req.user;
    
    const post = await Post.create({...req.body, author:userID})
    console.log(post, 'run here 2')
    res.status(200).json({
      status: "success",
      data: {post}
    });
  } catch (error) {
    next(error)
  }
};

// Update one post
exports.updateOnePost = async (req, res, next) => {
  try {
    const {postId} = req.params;

    // phan hoi lai
    const post = await Post.findByIdAndUpdate(postId, {...req.body}, {new: true, runValidator: true});
    
    res.status(200).json({
      status: "success",
      data: {post}
    });
  } catch (error) {
    next(error)
  }
};

// Delete one post
exports.deleteOnePost = async (req, res, next) => {
  try {
    const {postId} = req.params;

    // phan hoi lai
    const post = await Post.findByIdAndDelete(postId);
    res.status(200).json({
      status: "success",
      message: "Post has been deleted"
    });
  } catch (error) {
    next(error)
  }
};
