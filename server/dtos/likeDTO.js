class LikeDTO {
    constructor(like) {
      this.id = like._id;
      this.postId = like.postId;
      this.userId = like.userId;
      this.createdAt = like.createdAt;
    }
  }
  
  export default LikeDTO;