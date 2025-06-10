import { Toolbar, Link, Stack } from "@mui/material";

export default function DashboardNavBar() {
  return (
    <Toolbar sx={{ justifyContent: "center" }}>
      <Stack direction="row" spacing={2}>
        <Link href="/dashboard" color="textPrimary" underline="none">
          Usage
        </Link>
        <Link href="/dashboard/create-api" color="textPrimary" underline="none">
          Create API
        </Link>
        <Link href="/dashboard/docs" color="textPrimary" underline="none">
          Documentation
        </Link>
      </Stack>
    </Toolbar>
  );
}
