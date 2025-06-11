"use client";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField, Box, Typography, Link } from "@mui/material";
import { useActionState, useState } from "react";
import { createAccount } from "@/server/auth/account/createAccount";

export default function CreateAccountCard({
  subtitle = "Start building your custom APIs in minutes. It's fast, easy, and secure.",
  loginLink = "/login",
}) {
  const [success, setSuccess] = useState(null);

  const [state, action, pending] = useActionState();

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDafult();
    const formData = event.currentTarget;
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const success = await createAccount(username, email, password);

    if (success) {
      setSuccess(true);
    }
  };
  return (
    <Paper sx={{ width: "30%", overflow: "auto", p: 3, maxHeight: 700, mt: 2 }}>
      <Box
        component="form"
        action={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" component="h2" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="teritary" gutterBottom>
            {subtitle}
          </Typography>
          <TextField
            name="username"
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            required
          />
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <Link href={loginLink} underline="hover" color="primary">
              Already have an account? Log in
            </Link>
          </Typography>
          <Button type="submit" variant="contained" fullWidth>
            Create Account
          </Button>
          {success && <Typography>{success}</Typography>}
        </Stack>
      </Box>
    </Paper>
  );
}
