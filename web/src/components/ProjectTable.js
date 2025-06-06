"use client";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default function ProjectTable({
  projectTitle,
  checkboxSelection = false,
  sx = {},
  rows,
  columns,
  children,
  ...props
}) {
  return (
    <Paper sx={{ ...sx }}>
      {projectTitle && (
        <Typography variant="h5" component="h1" gutterBottom>
          {projectTitle}
        </Typography>
      )}
      {children}
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ border: 1 }}
        checkboxSelection={checkboxSelection}
        {...props}
      />
    </Paper>
  );
}
