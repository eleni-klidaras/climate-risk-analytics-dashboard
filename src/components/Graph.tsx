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
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOut";
import { type Theme } from "@mui/material/styles";

type GraphProps = {
  chartData: Record<string, number>[];
};
const getPathwaysWithColors = (theme: Theme) => [
  { key: "Fragmented World", color: theme.palette.error.dark, severity: 6 },
  { key: "Current Policies", color: theme.palette.error.light, severity: 5 },
  { key: "NDCs", color: theme.palette.warning.main, severity: 4 },
  { key: "Below 2C", color: theme.palette.primary.light, severity: 3 },
  { key: "Net Zero 2050", color: "#1cd6ee", severity: 2 },
  { key: "Low Demand", color: "#00D08E", severity: 1 },
];

export default function Graph({ chartData }: GraphProps) {
  const theme = useTheme();
  const [zoomed, setZoomed] = useState(false);

  const data = useMemo(() => getPathwaysWithColors(theme), [theme]);

  if (!chartData.length) return <p className="px-6 py-4">No data available.</p>;

  return (
    <div
      style={{
        width: "100%",
        height: "70vh",
        padding: "20px",
      }}
    >
      <div className="flex justify-end">
        <IconTooltip title={zoomed ? "Zoom Out" : "Zoom In"}>
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
            content={({ active, payload, label }) => {
              if (!active || !payload) return null;
              const ordered = data
                .filter((p) => payload.some((entry) => entry.dataKey === p.key))
                .map((p) => ({
                  ...p,
                  value: payload.find((entry) => entry.dataKey === p.key)
                    ?.value,
                }));
              return (
                <div
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    padding: "8px 12px",
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>
                  {ordered.map((item) => (
                    <p
                      key={item.key}
                      style={{
                        margin: "4px 0",
                        color: item.color,
                        fontSize: 13,
                      }}
                    >
                      {item.key}: {Number(item.value).toFixed(2)}
                    </p>
                  ))}
                </div>
              );
            }}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="top"
            wrapperStyle={{ marginTop: 10, marginRight: -20 }}
            content={() => (
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {data.map((pathway) => (
                  <li
                    key={pathway.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        width: 14,
                        height: 3,
                        backgroundColor: pathway.color,
                        display: "inline-block",
                        marginRight: 8,
                      }}
                    />
                    <span style={{ fontSize: 14 }}>{pathway.key}</span>
                  </li>
                ))}
              </ul>
            )}
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
          <Brush
            dataKey="year"
            height={20}
            stroke={"#00D08E"}
            startIndex={1}
            travellerWidth={10}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
