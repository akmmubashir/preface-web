"use client";

import { useQuery } from "@tanstack/react-query";

export default function TestReactQuery() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { message: "React Query is working!" };
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-2">
        React Query Test
      </h3>
      <p className="text-green-700">{data?.message}</p>
    </div>
  );
}
