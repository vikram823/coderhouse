import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../config";
import Token from "../model/tokenModel";

const TokenService = {
  genrateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "1y",
    });

    return { accessToken, refreshToken };
  },

  async storerRefToken(token, userId) {
    try {
      await Token.create({ token, userId });
    } catch (err) {
      console.log(err.message);
    }
  },

  async verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, JWT_ACCESS_SECRET);
  },

  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, JWT_REFRESH_SECRET);
  },

  async findRefreshToken(userId, refreshToken) {
    return await Token.findOne({ userId, token: refreshToken });
  },

  async updateRefreshToken(userId, refreshToken) {
    return await Token.updateOne({ userId }, { token: refreshToken });
  },

  async removeToken(refreshToken) {
    return await Token.deleteOne({ token: refreshToken });
  },
};

export default TokenService;
