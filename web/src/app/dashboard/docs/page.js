import ApiDoc from "@/components/ApiDoc";
import { getApiSpec } from "@/server/api/getApiSpec";
import { getProjects } from "@/server/data-access-layer/getProject";
import { getUser } from "@/server/data-access-layer/getUser";

export default async function ApiDocsPage() {
  const { id } = (await getUser()) ?? {};
  const projects = (await getProjects()) ?? {};

  // need to create a selector component to select the choices of projects and then display
  // the API spec depending on the project name
  const spec = await getApiSpec(id, "123");
  return <ApiDoc spec={spec} />;
}
