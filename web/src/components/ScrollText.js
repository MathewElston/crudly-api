import { Box, Typography } from "@mui/material";

export default function ScrollText({ text }) {
  return (
    <Box
      sx={{
        p: 2,
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
