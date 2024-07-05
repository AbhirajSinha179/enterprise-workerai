"use client";

import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DataItem {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

interface OverviewProps {
  data: DataItem[];
}

export function Overview({ data }: OverviewProps) {
  if (!data || data.length === 0) {
    return <div className="mx-10 font-medium text-center">Sorry no data found</div>;
  }
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#808080" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#808080" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#808080" stopOpacity={1.0} />
            <stop offset="95%" stopColor="#808080" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#808080"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
