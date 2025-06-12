"use client";
import SecretText from "@/components/SecretText";
import { Typography, Stack, Button } from "@mui/material";
import { resetApiKey } from "@/server/api/apiServerActions";

export default async function ApiManager({ userId, apiKey }) {
  async function handleClick() {
    const { success, apiKey } = await resetApiKey(userId);
  }
  return (
    <Stack direction={"row"} spacing={10}>
      <SecretText label={"API Key"} secretText={apiKey} />
      <Button variant={"contained"}>Reset Key</Button>
    </Stack>
  );
}
