import LikeDAO from '../daos/likeDAO'
import LikeDTO from '../dtos/LikeDTO';

class LikeService {
  static async createLike(likeData) {
    try {
      const like = await LikeDAO.createLike(likeData);
      const likeDTO = new LikeDTO(like);
      return likeDTO;
    } catch (error) {
      throw error;
    }
  }

  static async deleteLike(likeId) {
    try {
      const like = await LikeDAO.deleteLike(likeId);
      const likeDTO = new LikeDTO(like);
      return likeDTO;
    } catch (error) {
      throw error;
    }
  }

  static async getLikesByPostId(postId) {
    try {
      const likes = await LikeDAO.getLikesByPostId(postId);
      const likeDTOs = likes.map((like) => new LikeDTO(like));
      return likeDTOs;
    } catch (error) {
      throw error;
    }
  }
}

export default LikeService;
