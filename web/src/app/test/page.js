import ProjectDropdown from "@/components/ProjectDropdown";

import { Box } from "@mui/material";

import { getUser } from "@/server/data-access-layer/getUser";
import { createApiKey } from "@/server/api/apiServerActions";

export default async function TestPage() {
  const projects = [
    { name: "Project 1", id: 1 },
    { name: "Project 2", id: 2 },
    { name: "Project 3", id: 3 },
  ];
  const user = await getUser();

  return (
    <Box sx={{ m: 5, width: 200, height: 200 }}>
      <ProjectDropdown projects={projects}></ProjectDropdown>
    </Box>
  );
}
