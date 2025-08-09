import ApiDoc from "@/components/ApiDoc";
import ProjectDropdown from "@/components/ProjectDropdown";
import { getApiSpec } from "@/server/api/getApiSpec";
import { getProjects } from "@/server/data-access-layer/getProject";
import { getUser } from "@/server/data-access-layer/getUser";

export default async function ApiDocsPage({ searchParams }) {
  const { id } = (await getUser()) ?? {};
  const projects = await getProjects(id);

  console.log("PROJECTS", projects);

  const projectName = searchParams.projectName;
  console.log("PROJECTS PARAM", projectName);

  // need to create a selector component to select the choices of projects and then display
  // the API spec depending on the project name

  const spec = projectName ? await getApiSpec(projectName) : projectName;
  return (
    <>
      <ProjectDropdown userId={id} projects={projects} />
      {spec && <ApiDoc spec={spec} />}
    </>
  );
}
