import crypto from "crypto";
import { SMS_SID, SMS_AUTH_TOKEN, SMS_FROM_NUMBER } from "../config";
import twilio from "twilio";
import { hashService } from "./index";

const tw = twilio(SMS_SID, SMS_AUTH_TOKEN, {
  lazyLoading: true,
});

const OtpService = {
  async genrateOtp() {
    return crypto.randomInt(1000, 9999);
  },

  async sendBySms(phone, otp) {
    return await tw.messages.create({
      to: phone,
      from: SMS_FROM_NUMBER,
      body: ` Your coderhouse otp is ${otp}. Please dont share it with others.`,
    });
  },

  verifyHashedOtp(hashedOtp, data) {
    return (hashedOtp === hashService.hashOtp(data));
  },
};

export default OtpService;
