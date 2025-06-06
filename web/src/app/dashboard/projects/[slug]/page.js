"use client";

import ProjectTable from "@/components/ProjectTable.js";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const projectTables = {
  Orders: {
    columns: [
      { field: "id", headerName: "ID", width: 90 },
      { field: "product", headerName: "Product", width: 150 },
      { field: "amount", headerName: "Amount", width: 110 },
    ],
    rows: [
      { id: 1, product: "Pizza", amount: 2 },
      { id: 2, product: "Soda", amount: 5 },
    ],
  },
  Users: {
    columns: [
      { field: "id", headerName: "ID", width: 90 },
      { field: "username", headerName: "Username", width: 150 },
    ],
    rows: [
      { id: 1, username: "alice" },
      { id: 2, username: "bob" },
    ],
  },
};

export default function ProjectPage({ params }) {
  const { slug } = params;
  const titleSlug = slug.charAt(0).toUpperCase() + slug.slice(1);
  const tableList = ["Orders", "Users"];
  const [currentTable, setCurrentTable] = useState("Orders");
  return (
    <div>
      <ProjectTable
        projectTitle={`Project: ${titleSlug}`}
        tableTitle={"My Table"}
        columns={projectTables[currentTable].columns}
        rows={projectTables[currentTable].rows}
        sx={{ height: 400, width: "50%" }}
      >
        {" "}
        <Tabs
          value={currentTable}
          onChange={(event, newValue) => {
            setCurrentTable(newValue);
          }}
        >
          {tableList.map((table) => (
            <Tab key={table} label={table} value={table} />
          ))}
        </Tabs>
      </ProjectTable>
    </div>
  );
}
