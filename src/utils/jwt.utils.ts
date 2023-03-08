require('dotenv').config()
import jwt from "jsonwebtoken";

// sign jwt
const accessTokenKey = <string>process.env.ACCESS_TOKEN_SECRET
export function signJWT(payload: object, expiresIn: string | number) {
  return jwt.sign(payload, accessTokenKey, {  expiresIn });
}

// verify jwt
export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, accessTokenKey);
    return { payload: decoded, expired: false };
  } catch (error: any) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
}
