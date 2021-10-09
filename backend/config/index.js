import dotenv from "dotenv";
dotenv.config();

export const {
  PORT,
  HASH_SECRET,
  SMS_SID,
  SMS_AUTH_TOKEN,
  SMS_FROM_NUMBER,
  DB_URL,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  BASE_URL,
} = process.env;
