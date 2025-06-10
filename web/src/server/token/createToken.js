import jwt from "jsonwebtoken";
import { dotenv } from "dotenv";
("use server");
export function createToken(payload) {
  accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
}
