import UserDAO from "../daos/userDAO.js";
import User from "../models/User.js";
import UserService from '../services/userService.js';

/* READ */
export const getAllUsers = async(req, res) => {
  try {
    const users = await UserDAO.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    // const user = await UserService.getUserById(id);
    const user = await UserDAO.getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);

    const friends = await Promise.all(
      user.friends.map((id) => UserService.getUserById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, area, picturePath }) => {
        return { _id, firstName, lastname, area, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await UserService.getUserById(id);
    const friend = await UserService.getUserById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => UserService.getUserById(id))
    );
    const formattedFriends = friends.map(
        ({ _id, firstName, lastName, picturePath }) => {
            return { _id, firstName, lastname,  picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};
