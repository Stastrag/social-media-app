import LikeService from '../services/LikeService' ;

class LikeController {
  static async createLike(req, res) {
    try {
      const likeData = req.body;
      const like = await LikeService.createLike(likeData);
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteLike(req, res) {
    try {
      const likeId = req.params.id;
      const like = await LikeService.deleteLike(likeId);
      res.json(like);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getLikesByPostId(req, res) {
    try {
      const postId = req.params.postId;
      const likes = await LikeService.getLikesByPostId(postId);
      res.json(likes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default LikeController;