import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      min: 5,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      unique: true
    },
    picturePath: {
      type: String,
      required: false,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    }
  },
  { timestamps: true }
);

  

const User = mongoose.model("User", UserSchema);

export default User;