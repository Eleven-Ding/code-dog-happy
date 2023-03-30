const jwt = require("jsonwebtoken");
import { User } from "../types/model";
import globalEnvConfig from "../config";
const {
  jwt: { tokenSecret, expireTime },
} = globalEnvConfig;

export function generateToken(userInfo: User) {
  const token = jwt.sign(userInfo, tokenSecret, {
    // algorithm: "RS256", //这个算法好像很慢，先不用了
    expiresIn: expireTime,
  });
  return token;
}

export function verifyToken(token: string) {
  var decoded = jwt.verify(token, tokenSecret);
  console.log(decoded);
}
