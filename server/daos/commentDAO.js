import Comment from "../models/Comment.js"

class CommentDAO {
  static async createComment(commentData) {
    try {
      const comment = new Comment(commentData);
      await comment.save();
      return comment;
    } catch (error) {
      throw error;
    }
  }

  static async getCommentsByPostId(postId) {
    try {
      console.log(postId);
      const comments = await Comment.find({postId: postId});
      
      return comments;
    } catch (error) {
      throw error;
    }
  }

}

export default CommentDAO;