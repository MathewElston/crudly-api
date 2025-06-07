"use client";
import { Paper } from "@mui/material";

export default function HoverCard({
  cardWidth = "40%",
  onClick,
  children,
  sx = {},
  ...props
}) {
  return (
    <Paper
      elevation={2}
      sx={{
        width: cardWidth,
        p: 2,
        cursor: "pointer",
        transition: "border 0.2s ease",
        border: "1px solid transparent",
        "&:hover": {
          border: "1px solid",
          borderColor: "tertiary.main",
        },
        ...sx,
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Paper>
  );
}
