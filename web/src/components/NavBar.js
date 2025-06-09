"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Stack, Link, Box } from "@mui/material";

export default function Navbar({ title = "MyApp", motto = "Your motto here" }) {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left */}
        <Stack>
          <Typography color="primary" variant="h6">
            {title}
          </Typography>
          <Stack direction={"row"} spacing={4}>
            <Typography variant="subtitle2" color="tertiary">
              {motto}
            </Typography>

            <Link href="/" color="textPrimary" underline="none">
              Home
            </Link>
            <Link href="/dashboard" underline="none" color="textPrimary">
              Dashboard
            </Link>
            <Link href="/login" underline="none" color="textPrimary">
              Login
            </Link>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
