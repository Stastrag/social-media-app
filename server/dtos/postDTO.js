class PostDTO {
    constructor(data) {
      this._id = data._id;
      this.userId = data.userId;
      this.title = data.title;
      this.description = data.description;
      this.likes = data.likes;
      this.comments = data.comments;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
    }
  }
  
  
  export default PostDTO;