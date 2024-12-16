import React from "react";
import { cn } from "@/lib/utils";

export function SkeletonLoaderInbox({ count = 5 }: { count?: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className={cn(
                        "animate-pulse h-20 w-full rounded-lg bg-muted p-4 border border-dashed"
                    )}
                >
                    {/* Adjust inner elements for responsiveness */}
                    <div className="h-4 w-1/3 sm:w-1/4 bg-muted-foreground rounded mb-2"></div>
                    <div className="h-3 w-2/3 sm:w-3/4 bg-muted-foreground rounded mb-1"></div>
                    <div className="h-3 w-1/2 bg-muted-foreground rounded"></div>
                </div>
            ))}
        </div>
    );
}
