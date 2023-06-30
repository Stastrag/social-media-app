import UserDAO from'../daos/userDAO.js';
import UserDTO from '../dtos/userDTO.js';

class UserService {
  constructor() {
    this.userDAO = new UserDAO();
  }

  async createUser(userData) {
    const user = await this.userDAO.createUser(userData);
    return new UserDTO(user);
  }

  async getUserById(userId) {
    try {
      const user = await this.userDAO.getUserById(userId);
      return new UserDTO(user);  
    } catch (err) {
      throw err;
    }
  }

  async updateUser(userId, userData) {
    const updatedUser = await this.userDAO.updateUser(userId, userData);
    return new UserDTO(updatedUser);
  }

  async deleteUser(userId) {
    const deletedUser = await this.userDAO.deleteUser(userId);
    return new UserDTO(deletedUser);
  }
}

export default UserService;