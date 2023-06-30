import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: { type: String, ref: 'Post', required: true },
  userId: { type: String, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
