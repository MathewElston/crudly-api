"use client";
import FormCard from "@/components/FormCard";
import { resetPassword } from "@/server/password/resetPassword";
import { Button, TextField, Stack, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdatePasswordCard() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password === "") {
      setValid(false);
      setError("Please enter a password.");
      return;
    }
    if (formData.confirmPassword === "") {
      setValid(false);
      setError("Please confirm your password.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setValid(false);
      setError("Passwords do not match");
      return;
    }
    const response = await resetPassword(formData);
    if (response) {
      setError(null);
      setValid(true);
      router.push("/login");
    }
  };
  return (
    <FormCard
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      title="Password Reset"
      actions={
        <Stack direction="row" justifyContent="center">
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </Stack>
      }
    >
      <Stack spacing={2}>
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
        {valid && <Typography color="success">Success</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Stack>
    </FormCard>
  );
}
