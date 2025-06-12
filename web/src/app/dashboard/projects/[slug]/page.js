import ProjectTable from "@/components/ProjectTable.js";

const projectData = {
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

export default async function ProjectPage({ params }) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const titleSlug = decodedSlug.charAt(0).toUpperCase() + decodedSlug.slice(1);
  const tableList = ["Orders", "Users"];
  return (
    <div>
      <ProjectTable
        projectTitle={`Project: ${titleSlug}`}
        projectData={projectData}
        tableList={tableList}
        defaultTable={"Orders"}
        sx={{ height: 400, width: "50%" }}
      ></ProjectTable>
    </div>
  );
}
