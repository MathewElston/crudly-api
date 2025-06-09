"use client";

import {
  Paper,
  Box,
  Stack,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function ForgotCard({ title, fields, onSubmit, buttonLabel }) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (event) => {
    event.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <>
      <Paper
        sx={{ width: "30%", overflow: "auto", p: 3, maxHeight: 500, mt: 2 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: 4,
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h4" component={"h1"}>
              {title}
            </Typography>
            {fields.map((field) => (
              <TextField
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type || "text"}
                required={field.required}
                value={formData[field.name]}
                onChange={handleChange}
                fullWidth
              ></TextField>
            ))}
            <Stack direction={"row"} justifyContent={"space-around"}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "40%", alignItems: "center" }}
                onClick={handleSubmit}
              >
                {buttonLabel}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </>
  );
}
