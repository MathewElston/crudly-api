import { Box, Typography } from "@mui/material";

export default function ScrollText({ text }) {
  return (
    <Box
      sx={{
        width: "80%",
        maxWidth: "600px",
        borderRadius: 2,
        overflowY: "auto",
        maxHeight: 250,
        fontSize: "1rem",
        lineHeight: 1.6,
      }}
    >
      <Typography sx={{ whiteSpace: "pre-wrap" }}>{text}</Typography>
    </Box>
  );
}
