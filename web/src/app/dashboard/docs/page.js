import ApiDoc from "@/components/ApiDoc";
import { getApiSpec } from "@/server/api/getApiSpec";
import { getUser } from "@/server/data-access-layer/getUser";

export default async function ApiDocsPage() {
  const { id } = await getUser();

  // this is hard coded for for the user id = 12 and the project name 123.
  const spec = await getApiSpec(id, "123");
  console.log(spec);

  return <ApiDoc spec={spec} />;
}
