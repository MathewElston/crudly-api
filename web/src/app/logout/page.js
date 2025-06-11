import { logout } from "@/server/auth/actions/logout";

export default async function LogoutPage() {
  await logout();
}
