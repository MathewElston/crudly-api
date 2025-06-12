"use client";
import { Paper,Link } from "@mui/material";
import { DataGrid  } from "@mui/x-data-grid";

export default function ProjectList({ projectData, ...props }) {
  const fullColumns = projectData.columns.map((col) => {
    if (col.field === "view") {
      return {
        ...col,
        renderCell: (params) => {
          return (
            <Link
              color="primary"
              underline="none"
              href={`/dashboard/projects/${params.row.projectName}`}
            >
              View
            </Link>
          );
        },
      };
    }
    return col;
  });
  const fullRows = projectData.rows.map((row) => ({
    ...row,
    view: "",
  }));

  return (
    <Paper>
      <DataGrid
        loading={false}
        columns={fullColumns}
        rows={fullRows}
        sx={{ border: 1 }}
        {...props}
      />
    </Paper>
  );
}
