import ProjectDropdown from "@/components/ProjectDropdown";
import { getProjects } from "@/server-actions/data-access-layer/getProject";
import { getUser } from "@/server-actions/data-access-layer/getUser";
import { getApiSpec } from "@/server-actions/api/getApiSpec";
import { Typography, Stack, Box } from "@mui/material";
import ApiDoc from "./ApiDoc";
import LoadingSpinner from "./LoadingSpinner";
import { Suspense } from "react";

export default async function ApiDocContent({ searchParams }) {
  const { id } = (await getUser()) ?? {};
  const projects = await getProjects(id);
  const projectName = await searchParams.projectName;
  const spec = projectName ? await getApiSpec(id, projectName) : false;

  return (
    <>
      <Stack>
        <Box sx={{ m: 2, textAlign: "center" }}>
          <Typography color="primary" variant="h3">
            API Documentation
          </Typography>
        </Box>
        <Box width={"50%"} sx={{ display: "flex", justifyContent: "center" }}>
          <Suspense fallback={<LoadingSpinner message="Getting projects..." />}>
            <ProjectDropdown userId={id} projects={projects} />
          </Suspense>
        </Box>
        <ApiDoc spec={spec} />
      </Stack>
    </>
  );
}
