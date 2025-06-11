"use server";
import db from "@/lib/database/db";
import { encryptPassword } from "../password/encryptPassword";
import { SignupFormSchema } from "@/lib/definitions";

export async function createAccount(formData) {
  const validatedField = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedField.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

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

    await connection.commit();
    return true;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}
