"use client";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField, Box, Typography, Link } from "@mui/material";
import { useState } from "react";

export default function LoginCard({
  onLogin,
  loading = false,
  error = "",
  disabled = false,
  usernameLabel = "Username",
  passwordLabel = "Password",
  forgotLink = "/forgot",
  title = "Login",
  subtitle = "Create, manage, and monitor your custom APIs all in one place.",
}) {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    event.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(), onLogin(formData);
  };
  return (
    <Paper sx={{ width: "30%", overflow: "auto", p: 3, maxHeight: 500, mt: 2 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          px: 4,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="tertiary" gutterBottom>
            {subtitle}
          </Typography>
          <TextField
            name="username"
            label={usernameLabel}
            type="text"
            variant="outlined"
            fullWidth
            disabled={disabled}
            autoComplete="username"
            onChange={handleChange}
            value={formData.username}
          />
          <TextField
            name="password"
            label={passwordLabel}
            type="password"
            variant="outlined"
            fullWidth
            disabled={disabled}
            onChange={handleChange}
            value={formData.password}
          />
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <Link href={forgotLink} underline="hover" color="primary">
              Forgot username or password?
            </Link>
          </Typography>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={disabled || loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
