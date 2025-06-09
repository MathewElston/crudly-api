import DashboardLayout from "@/components/DashboardNavBar";
import { Toolbar, Link } from "@mui/material";

export default function Layout({ children }) {
  return (
    <>
      <DashboardLayout />
      <main>{children}</main>
    </>
  );
}
