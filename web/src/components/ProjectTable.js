"use client";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";

export default function ProjectTable({
  projectTitle,
  projectData,
  tableList,
  defaultTable,
  checkboxSelection = false,
  sx = {},
  ...props
}) {
  const [currentTable, setCurrentTable] = useState(defaultTable);
  return (
    <Paper sx={{ ...sx }}>
      {projectTitle && (
        <Typography variant="h5" component="h1" gutterBottom>
          {projectTitle}
        </Typography>
      )}
      <Tabs
        value={currentTable}
        onChange={(event, newValue) => setCurrentTable(newValue)}
      >
        {tableList.map((table) => (
          <Tab key={table} label={table} value={table} />
        ))}
      </Tabs>
      <DataGrid
        loading={false}
        rows={projectData[currentTable].rows}
        columns={projectData[currentTable].columns}
        sx={{ border: 1 }}
        checkboxSelection={checkboxSelection}
        {...props}
      />
    </Paper>
  );
}
