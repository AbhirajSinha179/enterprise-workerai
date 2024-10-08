import { toast } from "sonner";
import LoadingSign from "@/components/global/loading";
import { Inbox } from "@/components/inbox/mail";
import { ContentLayout } from "@/components/layout/content-layout";
import { threadsSchema, Thread } from "@/types/interface";
import { dummyThreads } from "@/lib/dummy";
export default function InboxPage() {
  try {
    const threadData = dummyThreads;

    return (
      <ContentLayout title="Inbox">
        {threadData.length > 0 ? (
          <Inbox threads={threadData} />
        ) : (
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="flex items-center justify-center font-bold">
              No threads available.
            </div>
          </div>
        )}
      </ContentLayout>
    );
  } catch (error) {
    toast("Error", {
      description: "Failed to load inbox",
    });
    return null;
  }
}
