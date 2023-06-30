// import CommentDAO from '../dao/CommentDAO';
// import CommentDTO from '../dto/CommentDTO';

// export const createComment = async (req, res) => {
//   try {
//     const {commentData} = req.params; // commentData
    // const comment = await CommentDAO.createComment(commentData);
    // const commentDTO = new CommentDTO(comment);
//     return commentDTO;
//   } catch (error) {
//     throw error;
//   }
// }

export const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    // const comments = await CommentDAO.getCommentsByPostId(postId);
    // const commentDTOs = comments.map((comment) => new CommentDTO(comment));
    // return commentDTOs;
    return 1;
  } catch (error) {
    throw error;
  }
}

