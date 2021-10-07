import User from "../model/userModel";

const UserService = {
  async findUser(filter) {
    const user = await User.findOne(filter);

    return user;
  },
  async createUser(data) {
    const user = await User.create(data);

    return user;
  },
};

export default UserService;
