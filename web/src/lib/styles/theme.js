"use client";

import { ThemeOptions, createTheme } from "@mui/material/styles";

const themeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#81D4DC",
      dark: "#004045",
    },
    secondary: {
      main: "#94CDF7",
    },
    error: {
      main: "#FFB4AB",
    },
  },
};

const theme = createTheme(themeOptions);
export default theme;
