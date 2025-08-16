"use server";
import bcrypt from "bcrypt";

export async function verifyPassword(password, passwordHash) {
  return await bcrypt.compare(password, passwordHash);
}
