import Post from "../models/Posts.js";
import User from "../models/User.js";
import Like from "../models/Like.js"

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, title, description } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      title,
      description,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ 
      message: err.message,
      body: req.body
    });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ 
        message: 'Post not found',
        variableToCheck: postId,
        });
    }

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
      await Like.deleteOne({ postId: postId, userId });
    } else {
      post.likes.set(userId, true);
      const like = new Like({ postId: postId, userId });
      await like.save();
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
