"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DataItem {
  date: string | null;
  opens: number | null;
  total_emails: number | null;
}

interface OverviewProps {
  data: DataItem[];
  isLoading?: boolean;
}

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

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorTotalEmails" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorOpens" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#435BD5" stopOpacity={1.0} />
            <stop offset="95%" stopColor="#435BD5" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={Math.ceil(data.length / 6)}
          tickFormatter={(value) => value.slice(0, 8)}
        />
        <YAxis
          axisLine={false}
          tickFormatter={(value) => (value === 0 ? "" : value)}
        />
        <Tooltip
          formatter={(value, name, props) => {
            const customNames: { [key: string]: string } = {
              total_emails: "Total Emails",
              opens: "Opens",
            };
            return [value, customNames[name] || name];
          }}
          labelFormatter={(label) => `Date: ${label}`}
          content={({ label, payload }) => (
            <div className="p-2 bg-white shadow rounded text-black">
              <p className="font-bold">Date: {label}</p>
              {payload?.map((entry, index) => (
                <p key={index} style={{ color: entry.color }}>
                  {entry.name}: {entry.value}
                </p>
              ))}
            </div>
          )}
        />
        <Area
          type="monotone"
          dataKey="total_emails"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorTotalEmails)"
        />
        <Area
          type="monotone"
          dataKey="opens"
          stroke="#435BD5"
          fillOpacity={1}
          fill="url(#colorOpens)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
