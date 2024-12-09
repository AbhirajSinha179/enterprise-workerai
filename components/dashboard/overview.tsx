"use client";

import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DataItem {
  date: string | null;
  opens: number | null;
  total_emails: number | null;
  // total_unique_emails: number | null;
}

interface OverviewProps {
  data: DataItem[];
}

export function Overview({ data }: OverviewProps) {
  if (!data || data.length === 0) {
    return <div className="mx-10 font-medium text-center min-h-[150px]">Sorry, no data found</div>;
  }
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart width={730} height={300} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#435BD5" stopOpacity={1.0} />
            <stop offset="95%" stopColor="#435BD5" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 8)} />
        <YAxis
          axisLine={false}
          tickFormatter={(value) => (value === 0 ? '' : value)}
        />
        <Tooltip formatter={(value, name) => {
          const customNames: { [key: string]: string } = {
            total_emails: "Total Emails",
            opens: "Opens",
          };
          return [value, customNames[name] || name];
        }} />
        <Area type="monotone" dataKey="total_emails" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="opens" label="Opens" stroke="#435BD5" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
