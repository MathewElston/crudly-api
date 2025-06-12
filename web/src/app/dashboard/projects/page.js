import ProjectList from "@/components/ProjectList";

export default function ProjectsPage() {
  const placeHolder = {
    columns: [
      { field: "id", headerName: "ID" },
      { field: "projectName", headerName: "Project Name" },
      { field: "view", headerName: "View Tables" },
    ],
    rows: [
      { id: 1, projectName: "Ordering" },
      { id: 2, projectName: "Galactic Space Findings" },
    ],
  };
  return <ProjectList projectData={placeHolder} />;
}
