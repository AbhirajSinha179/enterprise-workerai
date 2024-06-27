import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface DataItem {
  name: string;
  email: string;
}

interface RecentSalesProp {
  data: DataItem[];
}

export function RecentSales({ data }: RecentSalesProp) {
  return (
    <div className="space-y-8">
      {data.map((sale) => (
        <div key={sale.name} className="flex items-center">
          <Avatar className="size-9">
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
