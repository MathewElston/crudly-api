import CreateAccountCard from "@/components/CreateAccountCard.js";
import { Box } from "@mui/material/";

export default function CreateAccountPage() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CreateAccountCard  />
    </Box>
  );
}
