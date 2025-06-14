import ApiSelector from "@/components/ApiSelector";

import { getUser } from "@/server/data-access-layer/getUser";


export default function CreateApiPage() {
  const { id } = getUser();

  return <ApiSelector />;
}
