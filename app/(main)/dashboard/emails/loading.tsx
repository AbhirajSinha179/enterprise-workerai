import { ContentLayout } from "@/components/layout/content-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <ContentLayout title="Scheduler">
      <div className="space-y-4">
        <main className="flex w-full flex-col items-center">
          <div className="mt-6 flex w-full items-center justify-between px-4">
            <h1 className="text-2xl font-bold">Scheduled Emails</h1>
          </div>
        </main>
         <ul className="my-6 w-full space-y-12 px-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-start gap-3 rounded-lg border bg-card p-5 text-left shadow-sm transition-all"
            >
              <div className="flex w-full flex-col gap-2">
                <div className="flex flex-row justify-between">
                  <Skeleton className="h-5 w-40" />
                  <div className="flex">
                    <Skeleton className="h-4 w-20 mx-3" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" /> 
                </div>
              </div>
              <Skeleton className="h-3 w-full" /> 
              <Skeleton className="h-3 w-3/4" /> 
            </div>
          ))}
        </ul>
      </div>
    </ContentLayout>
  )
}
