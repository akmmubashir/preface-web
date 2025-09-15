import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { ProtectedRoute } from "@/contexts/AuthContext";

// Dynamically import with no SSR

function DashboardPage() {
  redirect("/dashboard/posts");
  return null;
}

export default function Page() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
}
