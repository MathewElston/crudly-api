import ApiDoc from "@/components/ApiDoc";
import { getApiSpec } from "@/server/api/getApiSpec";
export default async function ApiDocsPage() {
  const spec = await getApiSpec(1, "Ordering");
  console.log(spec);

  return <ApiDoc spec={spec} />;
}
