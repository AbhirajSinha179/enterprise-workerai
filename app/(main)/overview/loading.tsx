import LoadingSign from "@/components/global/loading"
import { ContentLayout } from "@/components/layout/content-layout"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        // <main className=" space-y-4   ">
        //     <div className="hidden h-full flex-1 flex-col space-y-4 md:flex  bg-red-900">

        //         <div>
        //             <div className="my-4 flex gap-x-4">
        //                 {Array.from({ length: 5 }).map((_, index) => (
        //                     <Card className="w-full overflow-x-auto" key={index}>
        //                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        //                             <Skeleton className="h-5 w-20" />
        //                             <Skeleton className="h-6 w-6" />
        //                         </CardHeader>
        //                         <CardContent>
        //                             <Skeleton className="h-10 w-24" />
        //                         </CardContent>
        //                     </Card>
        //                 ))}
        //             </div>

        //             <div className="w-full space-y-5">
        //                 <Card>
        //                     <CardHeader>
        //                         <Skeleton className="h-6 w-28" />
        //                     </CardHeader>
        //                     <CardContent className="pl-4">
        //                         <Skeleton className="h-48 w-full" />
        //                     </CardContent>
        //                 </Card>

        //                 <Card className="overflow-y-auto">
        //                     <CardHeader>
        //                         <Skeleton className="h-6 w-32" /> {/* Placeholder for Recent Response Title */}
        //                         <Skeleton className="mt-1 h-5 w-16" /> {/* Placeholder for Recent Response Subtitle */}
        //                     </CardHeader>
        //                     <CardContent>
        //                         {Array.from({ length: 4 }).map((_, index) => (
        //                             <div key={index} className="flex items-center space-x-4 py-2">
        //                                 <Skeleton className="h-10 w-10 rounded-full" /> {/* Placeholder for Profile Icon */}
        //                                 <Skeleton className="h-4 w-3/4" /> {/* Placeholder for Recent Response Item */}
        //                             </div>
        //                         ))}
        //                     </CardContent>
        //                 </Card>
        //             </div>
        //         </div>
        //     </div>
        // </main>
        <LoadingSign />
    )
}
