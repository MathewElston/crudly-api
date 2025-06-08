"use client";

import { CircularProgress, Stack, Typography } from "@mui/material";

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh" }}
    >
      <CircularProgress />
      <Typography>{message}</Typography>
    </Stack>
  );
}
