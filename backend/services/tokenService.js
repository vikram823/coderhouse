import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../config";
import Token from "../model/tokenModel";

const TokenService = {
  genrateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: "1h",
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
};

export default TokenService;
