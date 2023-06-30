const Post = require('../models/post');

class PostDAO {
  async create(postData) {
    const post = new Post(postData);
    return await post.save();
  }

  async findById(postId) {
    return await Post.findById(postId).exec();
  }

  async findAll() {
    return await Post.find().exec();
  }

  async update(postId, updatedData) {
    return await Post.findByIdAndUpdate(postId, updatedData, { new: true }).exec();
  }

  async delete(postId) {
    return await Post.findByIdAndDelete(postId).exec();
  }
}

export default PostDAO;
