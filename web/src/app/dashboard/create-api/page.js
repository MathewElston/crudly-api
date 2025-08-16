import ApiSelector from "@/components/ApiSelector";

import { getUser } from "@/server-actions/data-access-layer/getUser";

export default async function CreateApiPage() {
  const { id } = await getUser();

  return <ApiSelector userId={id} />;
}
