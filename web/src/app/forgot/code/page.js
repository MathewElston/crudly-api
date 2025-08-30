"use client";
import ForgotCard from "@/components/ForgotCard";
import verifySecurityCode from "@/server-actions/auth/actions/verifySecurityCode";
import { useRouter } from "next/navigation";
import { useState, startTransition } from "react";
export default function PasswordCodePage() {
  const router = useRouter();
  const cardConfig = {
    title: "Enter Recovery Code",
    fields: [{ name: "code", label: "Code", type: "text", required: true }],
    buttonLabel: "Submit",
    onSubmit: startTransition(async (formData) => {
    }),
  };

  const handleSubmit = (formData) => {
  };
  return (
    <ForgotCard
      title={cardConfig.title}
      fields={cardConfig.fields}
      buttonLabel={cardConfig.buttonLabel}
      onSubmit={cardConfig.onSubmit}
    />
  );
}
