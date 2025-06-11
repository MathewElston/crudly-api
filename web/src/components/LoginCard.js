"use client";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField, Box, Typography, Link } from "@mui/material";
import { login } from "@/server/auth/actions/login";
import { useActionState } from "react";
import { errors } from "jose";

export default function LoginCard({
  loading = false,
  error = "",
  disabled = false,
  usernameLabel = "Username",
  passwordLabel = "Password",
  forgotLink = "/forgot",
  title = "Login",
  subtitle = "Create, manage, and monitor your custom APIs all in one place.",
}) {
  const [state, action, pending] = useActionState(login, undefined);

  // const handleChange = (event) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [event.target.name]: event.target.value,
  //   }));
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const token = await createUserToken(formData);
  //   setTokenText(token);
  // };

  return (
    <Paper sx={{ width: "30%", overflow: "auto", p: 3, maxHeight: 500, mt: 2 }}>
      <Box
        component="form"
        action={action}
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
            disabled={pending}
          />
          <TextField
            name="password"
            label={passwordLabel}
            type="password"
            variant="outlined"
            fullWidth
            disabled={pending}
          />
          {state?.errors && (
            <Stack spacing={1}>
              {Object.entries(state.errors).map(([key, message]) => (
                <Typography
                  key={key}
                  color="error"
                  variant="body2"
                  align="center"
                >
                  {message}
                </Typography>
              ))}
            </Stack>
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
            disabled={pending}
          >
            {" "}
            Login
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
