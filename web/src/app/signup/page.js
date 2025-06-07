"use client";
import CreateAccountCard from "@/components/CreateAccountCard.js";
import { Box } from "@mui/material/";

export default function CreateAccountPage() {
  const onCreate = (data) => {
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
      <CreateAccountCard handleCreate={onCreate} />;
    </Box>
  );
}
