"use server";
import { deleteSession } from "../token/session";
import { redirect } from "next/navigation";

export async function logout() {
  await deleteSession();

  redirect("/login");
}
