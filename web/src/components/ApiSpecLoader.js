import ApiDocContent from "./ApiDocContent";
import { getApiSpec } from "@/server/api/getApiSpec";
import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ApiDoc from "./ApiDoc";

export default async function ApiSpecLoader({
  userId,
  projectName,
}) {
  const spec = projectName ? await getApiSpec(userId, projectName) : false;

  return <ApiDoc spec={spec} />;
}
