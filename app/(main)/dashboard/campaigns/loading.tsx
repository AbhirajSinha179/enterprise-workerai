import { ContentLayout } from "@/components/layout/content-layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <ContentLayout title="Campaign">
      <div className="space-y-4">
        <main className="flex w-full flex-col items-center">
          <div className="mt-6 flex w-full items-center justify-between px-4">
            <h1 className="text-2xl font-bold">Loading Campaigns...</h1>
          </div>
        </main>
        <ul className="my-6 w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-start gap-3 rounded-lg border bg-card p-5 text-left shadow-sm"
            >
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          ))}
        </ul>
      </div>
    </ContentLayout>
  );
}
