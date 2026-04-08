"use client";
import ForgotCard from "@/components/ForgotCard";
import { Typography } from "@mui/material";
import verifySecurityCode from "@/server-actions/auth/actions/verifySecurityCode";
import { useRouter } from "next/navigation";
import { useState, startTransition } from "react";
export default function PasswordCodePage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const cardConfig = {
    title: "Enter Recovery Code",
    fields: [{ name: "code", label: "Code", type: "text", required: true }],
    buttonLabel: "Submit",
    onSubmit: async (formData) => {
      if (!(await verifySecurityCode(formData))) {
        setError("Invalid Code");
      } 
    },
  };

  return (
    <>
      <ForgotCard
        title={cardConfig.title}
        fields={cardConfig.fields}
        buttonLabel={cardConfig.buttonLabel}
        onSubmit={cardConfig.onSubmit}
      >
        <Typography color="error">{error}</Typography>
      </ForgotCard>
    </>
  );
}
