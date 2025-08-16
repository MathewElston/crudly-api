"use server";
import db from "@/lib/database/db";
import { encryptPassword } from "../password/encryptPassword";
import { verifyPassword } from "../password/verifyPassword";
import { createSession } from "../token/session";
export async function login(state, formData) {
  console.log(formData);
  const username = formData.get("username");
  const password = formData.get("password");
  const errors = {};

  if (!username || username.trim().length === 0) {
    errors.username = "Username is required";
  }

  if (!password || password.length === 0) {
    errors.password = "Password is required";
  }
  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  const [results] = await db.execute(
    `   SELECT Users_Credentials.user_id,Users_Credentials.password_hash
            FROM Users_Credentials
            INNER JOIN Users
            ON Users.id = Users_Credentials.user_id 
            WHERE Users.username = ? `,
    [username.trim()]
  );

  if (results.length === 0) {
    errors.failed = "Invalid username or password.";
    return { success: false, message: errors };
  }
  const { user_id, password_hash } = results[0];

  const isValid = await verifyPassword(password, password_hash);
  if (isValid) {
    await createSession(user_id);
    return { success: true };
  } else {
    return { success: false, message: "Invalid password" };
  }
}
