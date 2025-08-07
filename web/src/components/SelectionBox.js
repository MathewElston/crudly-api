"use client";
import { Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function SelectionBox({ inputLabel, menuItems}) {
  return (
    <FormControl fullWidth>
      <InputLabel>{inputLabel}</InputLabel>
      <Select>
        {menuItems.map((item) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
