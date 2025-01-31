"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Ensure Skeleton is imported from ShadCN

export default function Loading() {
  return (
    <div className="space-y-4  m-10">
      <div className="my-8 m-10">
        <Skeleton className="h-8 w-1/3 mb-4" /> {/* Simulating a header */}
        <Skeleton className="h-6 w-1/4" /> {/* Simulating a sub-header */}
      </div>
      <div className="rounded-md border bg-card my-10">
        {/* Simulating 5 rows with 4 columns */}
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex items-center space-x-4 px-4 py-10  border-b"
          >
            {Array.from({ length: 4 }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4 w-1/4" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
