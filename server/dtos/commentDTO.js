class CommentDTO {
    constructor(comment) {
      this.id = comment._id;
      this.postId = comment.postId;
      this.userId = comment.userId;
      this.content = comment.content;
      this.createdAt = comment.createdAt;
    }
  }
  
 export default CommentDTO;