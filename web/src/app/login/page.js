"use client";
import LoginCard from "@/components/LoginCard.js";
import { Box } from "@mui/material/";

export default function LoginPage() {
  const onLogin = (data) => {
    console.log(data);
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginCard onLogin={onLogin} />
    </Box>
  );
}
