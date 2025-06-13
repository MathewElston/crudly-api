import SecretText from "@/components/SecretText";
import UsageGraph from "@/components/UsageGraph";
import { getUser } from "@/server/data-access-layer/getUser";
import { Typography, Stack } from "@mui/material";
import { getApiKey } from "@/server/api/apiServerActions";
import ApiManager from "@/components/ApiManager";

export default async function UsagePage() {
  try {
    const {id, username} = await getUser();
    const { apiKey } = await getApiKey(id);

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
          <Typography variant="h1">Hi, {username}</Typography>
          <ApiManager userId={id} userKey={apiKey} />
        </Stack>
        <UsageGraph data={data} currentProgress={40} maxProgress={1000} />
      </Stack>
    );
  } catch (error) {
    console.error("Page error:", error);
    return <div>Error loading page: {error.message}</div>;
  }
}
