import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "../lib/styles/swagger-custom-theme.css";
import { Box, ThemeProvider } from "@mui/material";
import theme from "@/lib/styles/theme.js";

export default function ApiDoc({ spec }) {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <SwaggerUI spec={spec} />
      </Box>
    </ThemeProvider>
  );
}
