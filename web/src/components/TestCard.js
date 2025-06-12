"use client";
import { createApiKey } from "@/server/api/apiServerActions";
import { Card, Typography, Stack, Button } from "@mui/material";
import { useState } from "react";

export default function TestCard({ name, userId }) {
  const [apiKey, setApiKey] = useState(null);

  async function handleClick() {
    const { id, apiKey, resultuserId } = await createApiKey(userId);

    setApiKey(apiKey);
  }
  return (
    <Card sx={{ width: "40%" }}>
      <Typography>
        username: {name} id: {userId}
      </Typography>
      <Typography>id: {userId}</Typography>
      <Button onClick={handleClick} variant="contained">
        Create API Key
      </Button>
      {apiKey && <Typography>api key: {apiKey} </Typography>}
    </Card>
  );
}
