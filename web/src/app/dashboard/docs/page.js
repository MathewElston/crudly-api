import ApiDoc from "@/components/ApiDoc";
import { getApiSpec } from "@/server/api/getApiSpec";
import { getProject } from "@/server/data-access-layer/getProject";
import { getUser } from "@/server/data-access-layer/getUser";

export default async function ApiDocsPage() {
  const { id } = await getUser();
  console.log(id);
  const { projectId, projectName } = (await getProject()) ?? {};
  console.log(projectId, projectName);

  // this is hard coded for for the user id = 12 and the project name 123.
  const spec = await getApiSpec(id, "123");
  return <ApiDoc spec={spec} />;
}
