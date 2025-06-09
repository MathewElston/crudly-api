"use client";
import CircleProgress from "@/components/CircleProgress";
import SimpleLineChart from "@/components/SimpleLineChart";
import theme from "@/lib/styles/theme.js";
import { Typography, Stack, Box } from "@mui/material";

export default function UsagePage() {
  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 200 },
    { name: "Apr", value: 278 },
    { name: "May", value: 189 },
  ];
  return (
    <Stack spacing={2} padding={2} alignItems={"center"}>
      <Typography variant={"h3"} component={"h2"}>
        API Usage
      </Typography>
      <Box>
        <CircleProgress value={75} max={100} />
      </Box>
      <Box sx={{ width: 600, height: 300 }}>
        <SimpleLineChart data={data} strokeColor={theme.palette.primary.dark} />
      </Box>
    </Stack>
  );
}
