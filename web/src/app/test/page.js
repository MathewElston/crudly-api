import SelectionBox from "@/components/SelectionBox";

import { Box } from "@mui/material";

import { getUser } from "@/server/data-access-layer/getUser";
import { createApiKey } from "@/server/api/apiServerActions";

export default async function TestPage() {
  const menuItems = ["hi", "mom", "ilove you"];
  const user = await getUser();

  return (
    <Box sx={{ mt: 5, width: 200, height: 200 }}>
      <SelectionBox inputLabel={"Project"} menuItems={menuItems}></SelectionBox>
    </Box>
  );
}
