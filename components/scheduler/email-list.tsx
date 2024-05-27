import { formatDistanceToNow } from "date-fns";
import { Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

async function getData( ) {
  // const res = await fetch("https://...", { cache: "no-store" });

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  const res = {
    json: async () => [
      { id: 1, subject: "Hello", body: "Hello, world!", date: "2024-01-01", scheduled: false },
      { id: 2, subject: "Hi", body: "Hi, world!", date: "2024-01-02", scheduled: true},
    ],
  };

  return res.json();
}

export default async function EmailList() {
  const data = await getData();
  if (!data) return null;
  
  return (
    <main>
      <ul className="my-4 space-y-4">
        {data.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex w-full flex-col items-start gap-2 rounded-lg border p-4 text-left transition-all"
            )}
            // onClick={() =>
            //   // setConfig((prevConfig) => ({
            //   //   ...prevConfig,
            //   //   selected: item.id,
            //   // }))
            //   console.log(item.id)
            // }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="text-2xl font-semibold">{item.id}</div>
                <div className={cn("ml-auto")}>
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-md font-medium">{item.subject}</div>
            </div>
            <div className="text-xs text-muted-foreground">{item.body}</div>
            <div className="flex w-full items-center justify-between">
              <Link href="#" className="size-8 rounded-full p-2 hover:bg-muted">
                <Trash size={6} className="size-4 " />
              </Link>
              <div className="space-x-4">
                <Button asChild className="h-8 min-w-fit">
                  <span>Edit</span>
                </Button>
                <Button asChild className="h-8 min-w-fit">
                  <span>Smart Schedule</span>
                </Button>
              </div>
            </div>
          </button>
        ))}
      </ul>
    </main>
  )
}