import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { TextField, Box, Typography, Link } from "@mui/material";

export default function CreateAccountCard() {
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
          <Typography variant="h6" component="h2" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Build your vision, we'll handle the REST.
          </Typography>
          <TextField
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
          />
          <TextField label="Email" type="text" variant="outlined" fullWidth />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <Link href="/forgot" underline="hover" color="primary">
              Already have an account?
            </Link>
          </Typography>
          <Button variant="contained" fullWidth>
            Create
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
