"use client";
import FileUpload from "@/components/FileUpload";
import HoverCard from "@/components/HoverCard";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useState } from "react";

export default function CreateApiPage() {
  const cardConfig = {
    width: "50%",
    height: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const [apiSelect, setApiSelect] = useState(null);
  return (
    <Stack sx={{ backgroundColor: "#121212", minHeight: "100vh", p: 4 }}>
      <Typography sx={{ p: 4 }}>Select a Database type</Typography>
      <Stack sx={{ width: "50%" }} spacing={4} direction={"row"}>
        <HoverCard
          name="Premade Card"
          onClick={() => setApiSelect(1)}
          sx={{
            ...cardConfig,
          }}
        >
          <Typography sx={{}}>Premade</Typography>
        </HoverCard>
        <HoverCard
          name="Custom Card"
          sx={{
            ...cardConfig,
          }}
          onClick={() => setApiSelect(2)}
        >
          <Typography sx={{}}>Custom</Typography>
        </HoverCard>
      </Stack>
      <Stack
        spacing={4}
        sx={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {apiSelect === 1 && <p>Generate Premade section</p>}
        {apiSelect === 2 && <FileUpload></FileUpload>}
        {apiSelect && <Button variant="contained">Create API </Button>}
      </Stack>
    </Stack>
  );
}
