import { cookies } from "next/headers";
import { deleteSession } from "../token/session";
import { redirect } from "next/navigation";

export async function logout() {
  await deleteSession();

  redirect("/login");
}
