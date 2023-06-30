import express from "express";

import {
  getAllUsers,
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/userController.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get('/', verifyToken, getAllUsers);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);


export default router;
