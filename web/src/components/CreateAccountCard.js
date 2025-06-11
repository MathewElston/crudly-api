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
  const [state, action, pending] = useActionState(createAccount, undefined);

  return (
    <Paper sx={{ width: "30%", overflow: "auto", p: 3, maxHeight: 800, mt: 2 }}>
      <Box
        component="form"
        action={action}
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
          {state?.errors?.username && (
            <Typography color="error">{state.errors.username}</Typography>
          )}
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
          />
          {state?.errors?.email && (
            <Typography color="error">{state.errors.email}</Typography>
          )}
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
          />
          {state?.errors?.password && (
            <Box>
              <Typography color="error">Passwords must:</Typography>
              {state.errors.password.map((error) => (
                <Typography color="error" key={error}>
                  {error}
                </Typography>
              ))}
            </Box>
          )}
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            required
          />
          {state?.errors?.confirmPassword && (
            <Typography color="error">
              {state.errors.confirmPassword}
            </Typography>
          )}
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <Link href={loginLink} underline="hover" color="primary">
              Already have an account? Log in
            </Link>
          </Typography>
          <Button
            type="submit"
            variant="contained"
            disabled={pending}
            fullWidth
          >
            Create Account
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
