import SecretText from "@/components/ApiKeyText";
import UsageGraph from "@/components/UsageGraph";
import { getUser } from "@/server/data-access-layer/getUser";
import { Typography, Stack } from "@mui/material";

export default async function UsagePage() {
  const user = await getUser();
  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 200 },
    { name: "Apr", value: 278 },
    { name: "May", value: 189 },
  ];
  return (
    <Stack spacing={2} padding={2} alignItems={"center"}>
      <Stack direction={"row"} spacing={10}>
        <Typography variant="h1">Hi, {user.username}</Typography>
        <SecretText label={"API Key"} secretText={"ABC123"} />
      </Stack>
      <UsageGraph data={data} currentProgress={40} maxProgress={1000} />
    </Stack>
  );
}
