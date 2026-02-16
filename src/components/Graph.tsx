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
import { COLORS, PATHWAY_SEVERITY } from "../constants/constants";
import ChartTooltip from "./ChartTooltip";
import ChartLegend from "./ChartLegend";

type GraphProps = {
  chartData: Record<string, number>[];
};

const getPathwayColor = (key: string, theme: Theme): string => {
  const colorMap: Record<string, string> = {
    "Fragmented World": theme.palette.error.dark,
    "Current Policies": theme.palette.error.light,
    "Delayed Transition": theme.palette.warning.main,
    "NDCs": theme.palette.secondary.main,
    "Below 2C": theme.palette.primary.light,
    "Net Zero 2050": COLORS.CYAN,
    "Low Demand": COLORS.VIBRANT_GREEN,
  };
  return colorMap[key] ?? COLORS.FALLBACK;
};

export default function Graph({ chartData }: GraphProps) {
  const theme = useTheme();
  const [zoomed, setZoomed] = useState(false);

  const pathways = useMemo(() => {
    const keys = new Set(chartData.flatMap((d) => Object.keys(d).filter((k) => k !== "year")));
    return [...keys]
      .map((key) => ({
        key,
        color: getPathwayColor(key, theme),
        severity: PATHWAY_SEVERITY[key] ?? 0,
      }))
      .sort((a, b) => b.severity - a.severity);
  }, [chartData, theme]);

  return (
    <div
      role="img"
      aria-label="Line chart showing financial impact across climate pathways"
      className="w-full h-[50vh] sm:h-[70vh] p-3 sm:p-5 flex flex-col"
    >
      <div className="flex justify-end shrink-0">
        <IconTooltip
          title={zoomed ? "Zoom Out" : "Zoom In"}
          aria-label={zoomed ? "Reset zoom" : "Zoom in"}
        >
          <IconButton onClick={() => setZoomed((prev) => !prev)}>
            {zoomed ? <ZoomOutMapIcon /> : <ZoomInIcon />}
          </IconButton>
        </IconTooltip>
      </div>

      <ResponsiveContainer width="100%" height="100%" minHeight={0}>
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
                pathways={pathways}
              />
            )}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="top"
            wrapperStyle={{ marginTop: 10, marginRight: -20 }}
            content={() => <ChartLegend pathways={pathways} />}
          />
          {pathways.map((pathway) => (
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
