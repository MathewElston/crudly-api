"use server";
import bcrypt from "bcrypt";
export async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function hashSecurityCode(code) {
  const saltRounds = 1;
  return await bcrypt.hash(code, saltRounds);
}

export async function verifyHash(input, hash) {
  return await bcrypt.compare(input, hash);
}
