"use client";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField, Box, Typography, Link } from "@mui/material";
import { useState } from "react";

export default function CreateAccountCard({
  handleCreate,
  motto = "Build your vision, we'll handle the rest.",
  title = "Crudly-API",
  subtitle = "Start building your custom APIs in minutes. It's fast, easy, and secure.",
  loginLink = "/login",
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreate(formData);
  };
  return (
    <Paper sx={{ width: "30%", overflow: "auto", p: 3, maxHeight: 500, mt: 2 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="tertiary" fontStyle="italic">
            {motto}
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {subtitle}
          </Typography>
          <TextField
            name="username"
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            value={formData.username}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            value={formData.email}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            value={formData.password}
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            value={formData.confirmPassword}
          />
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <Link href={loginLink} underline="hover" color="primary">
              Already have an account? Log in
            </Link>
          </Typography>
          <Button type="submit" variant="contained" fullWidth>
            Create Account
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
