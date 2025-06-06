"use client";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
];

const rows = [
  { id: 1, col1: "data1", col2: "data2" },
  { id: 2, col1: "data4", col2: "data5" },
  { id: 3, col1: "data1", col2: "data2" },
  { id: 4, col1: "data4", col2: "data5" },
  { id: 5, col1: "data1", col2: "data2" },
  { id: 6, col1: "data4", col2: "data5" },
  { id: 7, col1: "data1", col2: "data2" },
  { id: 8, col1: "data4", col2: "data5" },
  { id: 9, col1: "data4", col2: "data5" },
  { id: 10, col1: "data4", col2: "data5" },
];

export default function ProjectPage() {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection={false}
        sx={{ border: 1 }}
      />
    </Paper>
  );
}
