import { Box, CircularProgress, Typography } from "@mui/material";

export default function CircleProgress({ value, max }) {
  const percentage = (value / max) * 100;

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={percentage}
        size={175}
        thickness={5}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" component="div" color="white">
          {`${value}/${max}`}
        </Typography>
      </Box>
    </Box>
  );
}
