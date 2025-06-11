import LoginCard from "@/components/LoginCard.js";
import { Box } from "@mui/material/";

export default function LoginPage() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <LoginCard />
    </Box>
  );
}
