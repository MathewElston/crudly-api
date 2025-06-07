import { Paper } from "@mui/material";

export default function HoverCard({ cardWidth = "40%", children }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        width: { cardWidth },
        cursor: "pointer",
        transition: "border 0.2s ease",
        border: "1px solid transparent",
        "&:hover": {
          border: "1px solid",
          borderColor: "tertiary.main", // or any custom color
        },
      }}
    >
      {children}
    </Paper>
  );
}
