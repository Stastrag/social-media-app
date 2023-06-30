import express from "express";
import { getCommentsByPostId } from "../controllers/commentController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", 
// verifyToken,
 getCommentsByPostId);

export default router;