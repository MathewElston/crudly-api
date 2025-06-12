"use client";
import SecretText from "@/components/SecretText";
import { Typography, Stack, Button } from "@mui/material";
import { resetApiKey } from "@/server/api/apiServerActions";
import { useState } from "react";

export default function ApiManager({ userId, userKey }) {
  const [keyState, setKeyState] = useState(userKey);
  async function handleClick() {
    const { success, apiKey } = await resetApiKey(userId);
    if (success) {
      setKeyState(apiKey);
    }
  }
  return (
    <Stack spacing={2}>
      <SecretText label={"API Key"} secretText={keyState} />
      <Button
        onClick={handleClick}
        color="tertiary"
        sx={{ width: "50%" }}
        variant={"contained"}
      >
        Reset Key
      </Button>
    </Stack>
  );
}
