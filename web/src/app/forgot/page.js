"use client";
import ForgotCard from "@/components/ForgotCard";
import HoverCard from "@/components/HoverCard";

export default function ForgotPage() {
  return (
    <>
    <HoverCard>
        
    </HoverCard>
      <ForgotCard
        title={"Username Recovery"}
        fields={[
          { name: "email", label: "Email", type: "email", required: true },
        ]}
        buttonLabel={"Email Username"}
        onSubmit={() => console.log("clicked")}
      />

      <ForgotCard
        title={"Password Recovery"}
        fields={[
          { name: "username", label: "Username", type: "text", required: true },
        ]}
        buttonLabel={"Email Recovery Code"}
        onSubmit={() => console.log("clicked")}
      />
    </>
  );
}
