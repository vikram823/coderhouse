class UserDtos {
  _id;
  phone;
  activated;
  createdAt;

  constructor(user) {
    this._id = user._id;
    this.phone = user.phone;
    this.activated = user.activated;
    this.createdAt = user.createdAt;
  }
}

export default UserDtos;
