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
import { useTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { IconButton, Tooltip as IconTooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

type GraphProps = {
  chartData: Record<string, number>[];
};
const getPathwaysWithColors = (theme) => [
  { key: "Fragmented World", color: theme.palette.error.dark, severity: 6 },
  { key: "Current Policies", color: theme.palette.error.light, severity: 5 },
  { key: "NDCs", color: theme.palette.warning.main, severity: 4 },
  { key: "Below 2C", color: theme.palette.success.light, severity: 3 },
  { key: "Net Zero 2050", color: theme.palette.primary.main, severity: 2 },
  { key: "Low Demand", color: theme.palette.secondary.main, severity: 1 },
];

export default function Graph({ chartData }: GraphProps) {
  const theme = useTheme();
  const [zoomed, setZoomed] = useState(false);

  const data = useMemo(() => getPathwaysWithColors(theme), [theme]);

  if (!chartData.length) return <p className="px-6 py-4">No data available.</p>;

  return (
    <div className="p-10 bg-gray-100">
      <ResponsiveContainer width="100%" height={400}>
        <IconTooltip title={zoomed ? "Reset Zoom" : "Zoom to Data"}>
          <IconButton onClick={() => setZoomed((prev) => !prev)}>
            {zoomed ? <ZoomOutMapIcon /> : <SearchIcon />}
          </IconButton>
        </IconTooltip>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="year" label={{ value: "Year", dy: 20 }} />

          <YAxis
            label={{
              value: "Shock Value",
              angle: -90,
              position: "insideLeft",
              dx: -20,
              style: { textAnchor: "middle" },
            }}
            domain={zoomed ? ["dataMin", "dataMax"] : [0, "auto"]}
            tickFormatter={(value) => value.toFixed(0)}
          />

          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" />

          {data.map((pathway) => (
            <Line
              key={pathway.key}
              type="monotone"
              dataKey={pathway.key}
              stroke={pathway.color}
              dot={false}
              strokeWidth={1}
            />
          ))}

          <Brush dataKey="year" height={30} stroke="#8884d8" startIndex={1} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
