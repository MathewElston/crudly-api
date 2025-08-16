import { logout } from "@/server-actions/auth/actions/logout";

export default async function LogoutPage() {
  await logout();
}
