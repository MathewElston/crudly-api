"use client";
import ForgotCard from "@/components/ForgotCard";
import HoverCard from "@/components/HoverCard";
import { Stack } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPage() {
  const cardConfig = {
    width: "50%",
    height: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const router = useRouter();
  const [resetSelect, setResetSelect] = useState(null);
  return (
    <Stack spacing={10}>
      <Stack sx={{ width: "50%" }} spacing={4} direction={"row"}>
        <HoverCard
          onClick={() => setResetSelect(1)}
          sx={{
            ...cardConfig,
            border: resetSelect === 1 ? `2px solid` : "none",
            cursor: "pointer",
          }}
        >
          Recover Username
        </HoverCard>
        <HoverCard
          onClick={() => setResetSelect(2)}
          sx={{
            ...cardConfig,
            border: resetSelect === 2 ? `2px solid` : "none",
            cursor: "pointer",
          }}
        >
          Recover Password
        </HoverCard>
      </Stack>
      {resetSelect === 1 && (
        <ForgotCard
          title={"Username Recovery"}
          fields={[
            { name: "email", label: "Email", type: "email", required: true },
          ]}
          buttonLabel={"Email Username"}
          onSubmit={() => router.push("/login")}
        />
      )}
      {resetSelect === 2 && (
        <ForgotCard
          title={"Password Recovery"}
          fields={[
            {
              name: "username",
              label: "Username",
              type: "text",
              required: true,
            },
          ]}
          buttonLabel={"Email Recovery Code"}
          onSubmit={() => router.push("/forgot/code")}
        />
      )}
    </Stack>
  );
}
