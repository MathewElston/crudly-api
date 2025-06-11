"use server";
import jwt from "jsonwebtoken";
export async function createUserToken(payload) {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
}
