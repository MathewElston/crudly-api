import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField, Box, Typography, Link } from "@mui/material";

export default function LoginCard() {
  return (
    <Paper sx={{ height: 400, width: "20%" }}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 4,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            Crudly-API
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Create, manage, and monitor your custom APIs all in one place
          </Typography>
          <TextField
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <Link href="/forgot" underline="hover" color="primary">
              Forgot username or password?
            </Link>
          </Typography>
          <Button variant="contained" fullWidth>
            Login
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
