"use server";
import db from "@/lib/database/db";
import { encryptPassword } from "../password/encryptPassword";
import { SignupFormSchema } from "@/lib/definitions";
import { createApiKey } from "@/server/api/apiServerActions";

export async function createAccount(state, formData) {
  if (!formData) return { errors: {} };

  const validatedField = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = validatedField.data;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();
    const [results] = await connection.execute(
      `INSERT INTO Users (username, email) VALUES (?, ?)`,
      [username, email]
    );
    const userId = results.insertId;

    const encryptedPassword = await encryptPassword(password);

    await connection.execute(
      `INSERT INTO Users_Credentials (user_id, password_hash) VALUES (?, ?)`,
      [userId, encryptedPassword]
    );

    await createApiKey(userId, connection);

    await connection.commit();
    return true;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}
