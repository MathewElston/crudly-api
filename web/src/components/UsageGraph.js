"use client";
import theme from "@/lib/styles/theme.js";
import { Typography, Stack, Box } from "@mui/material";
import CircleProgress from "@/components/CircleProgress";
import SimpleLineChart from "@/components/SimpleLineChart";
export default function UsageGraph({ data: chartData, currentProgress, maxProgress }) {
  return (
    <Stack spacing={2} padding={2} alignItems={"center"}>
      <Typography variant={"h3"} component={"h2"}>
        API Usage
      </Typography>
      <Box>
        <CircleProgress value={currentProgress} max={maxProgress} />
      </Box>
      <Box sx={{ width: 600, height: 300 }}>
        <SimpleLineChart data={chartData} strokeColor={theme.palette.primary.dark} />
      </Box>
    </Stack>
  );
}
