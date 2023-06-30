import Like from '../models/Like';

class LikeDAO {
  static async createLike(likeData) {
    try {
      const like = new Like(likeData);
      await like.save();
      return like;
    } catch (error) {
      throw error;
    }
  }

  static async deleteLike(likeId) {
    try {
      const like = await Like.findByIdAndDelete(likeId);
      return like;
    } catch (error) {
      throw error;
    }
  }

  static async getLikesByPostId(postId) {
    try {
      const likes = await Like.find({ postId });
      return likes;
    } catch (error) {
      throw error;
    }
  }

}

export default LikeDAO;