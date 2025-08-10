import ProjectDropdown from "@/components/ProjectDropdown";
import { getProjects } from "@/server/data-access-layer/getProject";
import { getUser } from "@/server/data-access-layer/getUser";
import { Typography, Stack, Box } from "@mui/material";
import ApiSpecLoader from "./ApiSpecLoader";
import LoadingSpinner from "./LoadingSpinner";
import { Suspense } from "react";

export default async function ApiDocContent({ searchParams }) {
  const { id } = (await getUser()) ?? {};
  const projects = await getProjects(id);

  const projectName = await searchParams.projectName;

  return (
    <>
      <Stack>
        <Box sx={{ m: 2, textAlign: "center" }}>
          <Typography color="primary" variant="h3">
            API Documentation
          </Typography>
        </Box>
        <Box width={"50%"} sx={{ display: "flex", justifyContent: "center" }}>
          <ProjectDropdown userId={id} projects={projects} />
        </Box>
        <Suspense fallback={<LoadingSpinner />}>
          <ApiSpecLoader
            userId={id}
            projectName={projectName}
          />
        </Suspense>
      </Stack>
    </>
  );
}
