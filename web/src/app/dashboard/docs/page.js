import ApiDocContent from "@/components/ApiDocContent";

import LoadingSpinner from "@/components/LoadingSpinner";

import { Suspense } from "react";

export default function ApiDocsPage({ searchParams }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ApiDocContent searchParams={searchParams} />
    </Suspense>
  );
}
