import { useMemo, useState } from "react";
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
import { useTheme, type Theme } from "@mui/material/styles";
import { IconButton, Tooltip as IconTooltip } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOut";
import { COLORS } from "../constants/constants";
import ChartTooltip from "./ChartTooltip";
import ChartLegend from "./ChartLegend";

export type PathwayConfig = {
  key: string;
  color: string;
  severity: number;
};

type GraphProps = {
  chartData: Record<string, number>[];
};
const getPathwaysWithColors = (theme: Theme) => [
  { key: "Fragmented World", color: theme.palette.error.dark, severity: 6 },
  { key: "Current Policies", color: theme.palette.error.light, severity: 5 },
  { key: "NDCs", color: theme.palette.warning.main, severity: 4 },
  { key: "Below 2C", color: theme.palette.primary.light, severity: 3 },
  { key: "Net Zero 2050", color: COLORS.CYAN, severity: 2 },
  { key: "Low Demand", color: COLORS.VIBRANT_GREEN, severity: 1 },
];

export default function Graph({ chartData }: GraphProps) {
  const theme = useTheme();
  const [zoomed, setZoomed] = useState(false);

  const data = useMemo(() => getPathwaysWithColors(theme), [theme]);

  return (
    <div
      role="img"
      aria-label="Line chart showing financial impact across climate pathways"
      className="w-full h-[50vh] sm:h-[70vh] p-3 sm:p-5"
    >
      <div className="flex justify-end">
        <IconTooltip
          title={zoomed ? "Zoom Out" : "Zoom In"}
          aria-label={zoomed ? "Reset zoom" : "Zoom in"}
        >
          <IconButton onClick={() => setZoomed((prev) => !prev)}>
            {zoomed ? <ZoomOutMapIcon /> : <ZoomInIcon />}
          </IconButton>
        </IconTooltip>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis
            label={{
              value: "Financial Impact (Shock)",
              angle: -90,
              position: "insideLeft",
              dx: -30,
            }}
            domain={zoomed ? ["dataMin", "dataMax"] : [0, "auto"]}
            tickFormatter={(value) => value.toFixed(0)}
          />
          <XAxis
            dataKey="year"
            label={{ value: "Timescale", dy: 20 }}
            height={80}
          />
          <Tooltip
            content={({ active, payload, label }) => (
              <ChartTooltip
                active={active}
                payload={payload}
                label={String(label)}
                pathways={data}
              />
            )}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="top"
            wrapperStyle={{ marginTop: 10, marginRight: -20 }}
            content={() => <ChartLegend pathways={data} />}
          />
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
          <Brush dataKey="year" height={20} stroke={COLORS.VIBRANT_GREEN} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
