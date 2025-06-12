import TestCard from "@/components/TestCard";

import { getUser } from "@/server/data-access-layer/getUser";

import { createApiKey } from "@/server/api/apiServerActions";

export default async function TestPage() {
  const user = await getUser();

  return <TestCard name={user.username} userId={user.id} />;
}
