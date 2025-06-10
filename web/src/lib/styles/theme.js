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

const MakoShrinaTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: "#00B89A", // Vibrant Mako green
      light: "#33C9B0",
      dark: "#007F6A",
      contrastText: "#1A1A1A",
    },
    secondary: {
      main: "#66B2FF", // Cool electric blue accent
      light: "#99CCFF",
      dark: "#336FCC",
      contrastText: "#FFFFFF",
    },
    tertiary: {
      // Optional tertiary color to expand palette
      main: "#F4A261", // Warm amber/orange, complementing green and blue
      light: "#FFB97A",
      dark: "#B27348",
      contrastText: "#1A1A1A",
    },
    background: {
      default: "#121212", // Deep dark gray
      paper: "#1A1A1A", // Almost black for surfaces
    },
    error: {
      main: "#FF3C38", // Strong red for errors
      light: "#FF6B68",
      dark: "#B0211F",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#FFFFFF", // Clean white for main text
      secondary: "#A6E3E9", // Soft cyan for secondary text
      disabled: "#5A5A5A", // Gray for disabled text
    },
  },
};

const theme = createTheme(MakoShrinaTheme);
export default theme;
