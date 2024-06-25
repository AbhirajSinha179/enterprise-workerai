import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const recentSalesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
  },
];

export function RecentSales() {
  return (
    <div className="space-y-8">
      {recentSalesData.map((sale) => (
        <div key={sale.name} className="flex items-center">
          <Avatar className="size-9">
            {/* <AvatarFallback>{sale.avatarInitials}</AvatarFallback> */}
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none text-foreground">{sale.name}</p>
            <p className="text-sm text-foreground">{sale.email}</p>
          </div>

        </div>
      ))}
    </div>
  );
}
