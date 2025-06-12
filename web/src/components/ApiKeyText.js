"use client";
import { InputAdornment, TextField, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function SecretText({ secretText, label }) {
  const [showKey, setShowKey] = useState(false);

  return (
    <TextField
      label={label}
      value={showKey ? secretText : "********"}
      type={showKey ? "text" : "password"}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowKey(!showKey)} edge="end">
              {showKey ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
}
