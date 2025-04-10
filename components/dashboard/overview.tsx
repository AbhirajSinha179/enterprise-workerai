"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
interface DataItem {
  date: string | null;
  opens: number | null;
  total_emails: number | null;
}

interface OverviewProps {
  data: DataItem[];
  isLoading?: boolean;
}

const chartConfig = {
  total_emails: {
    label: "Total Emails",
    color: "#8884d8",
  },
  opens: {
    label: "Opens",
    color: "#435BD5",
  },
} satisfies ChartConfig;

export function Overview({ data, isLoading }: OverviewProps) {
  if (isLoading) {
    return (
      <div className="w-full h-[200px] sm:h-[300px] md:h-[350px]">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="mx-10 font-medium text-center min-h-[150px]">
        Sorry, no data found
      </div>
    );
  }

  const sanitizedData = data.map((item) => ({
    ...item,
    total_emails: Math.max(0, item.total_emails || 0),
    opens: Math.max(0, item.opens || 0),
  }));

  return (
    <div className="max-h-[350px] overflow-hidden w-full flex justify-center">
      <ChartContainer config={chartConfig} className="max-h-[350px] w-full">
        <AreaChart
          accessibilityLayer
          data={sanitizedData}
          height={350}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 8)}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => value}
            width={40}
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey="total_emails"
            type="monotone"
            fill="#8884d8"
            fillOpacity={0.4}
            stroke="#8884d8"
          />
          <Area
            dataKey="opens"
            type="monotone"
            fill="#435BD5"
            fillOpacity={0.4}
            stroke="#435BD5"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}