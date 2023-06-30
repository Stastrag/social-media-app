import Comment from "../models/Comment.js";
import CommentDTO from "../dtos/commentDTO.js"
import CommentDAO from "../daos/commentDAO.js"
import Post from "../models/Posts.js";


// export const createComment = async(req, res) => {
//   try {
//     // const commentData = req.body;
//     // const comment = await CommentService.createComment(commentData);
//     res.status(201).json(comment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

export const getCommentsByPostId = async(req, res) => {
  try {
    const postId = req.params.id;
    const comments = await CommentDAO.getCommentsByPostId(postId);

    return res.status(200).json(comments);
  } catch (error) {
    throw error;
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

