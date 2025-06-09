"use client";
import ForgotCard from "@/components/ForgotCard";
import { useRouter } from "next/navigation";
export default function PasswordCodePage() {
  const router = useRouter();
  const cardConfig = {
    title: "Enter Recovery Code",
    fields: [{ name: "code", label: "Code", type: "text", required: true }],
    buttonLabel: "Submit",
    onSubmit: () => {
      console.log("Submitted");
      router.push("/forgot/reset");
    },
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
