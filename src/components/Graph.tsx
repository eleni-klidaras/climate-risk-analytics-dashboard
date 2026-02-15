import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";

const PATHWAYS = [
  { key: "Current Policies", color: "#ef4444" },
  { key: "NDCs", color: "#f97316" },
  { key: "Below 2C", color: "#eab308" },
  { key: "Delayed Transition", color: "#22c55e" },
  { key: "Net Zero 2050", color: "#3b82f6" },
  { key: "Fragmented World", color: "#8b5cf6" },
  { key: "Low Demand", color: "#ec4899" },
];

type GraphProps = {
  chartData: Record<string, number>[];
  yDomain?: [number, number];
};

export default function Graph({ chartData, yDomain }: GraphProps) {
  if (!chartData.length) return <p className="px-6 py-4">No data available.</p>;

  return (
    <div className="px-6 py-4">
      <ResponsiveContainer width="100%" height={450}>
        <LineChart data={chartData} margin={{ bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: "Year", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            domain={yDomain}
            label={{ value: "Shock Value", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Brush dataKey="year" height={30} stroke="#8884d8" startIndex={1} />
          {PATHWAYS.map((pathway) => (
            <Line
              key={pathway.key}
              type="monotone"
              dataKey={pathway.key}
              stroke={pathway.color}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
